# ==========================================
# STAGE 1: Frontend Build (Angular)
# ==========================================
FROM node:20-alpine AS frontend-build
WORKDIR /src/S5Server/Front

# Copy package files and install dependencies inside the frontend project
#  Мы копируем только package файлы сначала, чтобы Docker закешировал слой с node_modules
COPY S5Server/Front/package.json S5Server/Front/package-lock.json ./

# Устанавливаем зависимости. 
# Включаем @microsoft/fetch-event-source здесь (лучше добавить его в package.json на постоянной основе)
RUN npm ci && npm install @microsoft/fetch-event-source

# Copy the rest of the frontend source and build
#  Теперь копируем исходники. Если вы измените код, но не пакеты, npm install не запустится снова
COPY S5Server/Front/ ./
RUN npm run build -- --configuration development

# ==========================================
# STAGE 2: Backend Build & Publish (.NET)
# ==========================================
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend-build
WORKDIR /src

# Dependency on nodejs for Microsoft.TypeScript.MSBuild
#  Нужно для некоторых специфических задач компиляции TypeScript внутри .NET
RUN apt-get update && apt-get install -y nodejs

# Copy csproj and restore dependencies
#  Сначала restore — это экономит время при повторных сборках
COPY S5Server/S5Server.csproj ./S5Server/
RUN dotnet restore S5Server/S5Server.csproj

# Copy the rest of the backend source
COPY S5Server/ ./S5Server/

# Copy built frontend from Stage 1 back into the structure expected by S5Server.csproj
#  Важно: копируем именно в ту папку, где .csproj ожидает увидеть dist для включения в Publish
COPY --from=frontend-build /src/S5Server/Front/dist /src/S5Server/Front/dist

# Publish the application.
# [cite: 3] Выполняем финальную публикацию. Target 'PublishAngular' подхватит скопированный dist
WORKDIR /src/S5Server
RUN dotnet publish S5Server.csproj -c Release -o /app/publish /p:UseAppHost=false

# Generate development certificate
# [cite: 3] Создаем сертификат для работы по HTTPS внутри контейнера
RUN mkdir -p /app/publish && dotnet dev-certs https -ep /app/publish/aspnetapp.pfx -p devpass

# ==========================================
# STAGE 3: Final Runtime Image (Alpine)
# ==========================================
FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final
WORKDIR /app

# Copy published artifacts
# [cite: 4] Переносим только готовый результат из Stage 2 в чистый образ
COPY --from=backend-build /app/publish .

# Install system libraries for .NET and Npgsql on Alpine
# [cite: 4] Alpine требует эти библиотеки для корректной работы ICU (локализация) и Npgsql
RUN apk add --no-cache \
    icu-libs \
    krb5-libs \
    libintl \
    gcompat \
    libstdc++ \
    libgcc

# Fix GSSAPI symbolic link
# [cite: 4, 5] Необходимая правка для работы Kerberos/Npgsql на Alpine системах
RUN [ -f /usr/lib/libgssapi_krb5.so.2 ] || ln -sf /usr/lib/libgssapi_krb5.so /usr/lib/libgssapi_krb5.so.2

#  Отключаем инвариантный режим, чтобы ICU-libs работали (правильные даты и кодировки)
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

# Environment variables for ports and certificate
#  Стандартные порты и настройки Kestrel
ENV ASPNETCORE_URLS="https://+:8081;http://+:8080"
ENV ASPNETCORE_Kestrel__Certificates__Default__Password="devpass"
ENV ASPNETCORE_Kestrel__Certificates__Default__Path="/app/aspnetapp.pfx"

# Аргументы, которые придут из GitLab CI
ARG APP_VERSION=unknown
ARG IMAGE_NAME=unknown
ARG BUILD_AT=unknown

# Превращаем их в переменные окружения для приложения
ENV APP_VERSION=$APP_VERSION
ENV IMAGE_NAME=$IMAGE_NAME
ENV BUILD_AT=$BUILD_AT

ENV REQUIRE_MANDATORY_2FA=true

EXPOSE 8080
EXPOSE 8081

ENTRYPOINT ["dotnet", "S5Server.dll"]