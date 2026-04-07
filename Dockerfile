# ==========================================
# STAGE 1: Frontend Build (Angular)
# ==========================================
FROM node:20-alpine AS frontend-build
WORKDIR /src/S5Server/Front

# Copy package files and install dependencies inside the frontend project
# Ensure we use the correct package files from S5Server/Front
COPY S5Server/Front/package.json S5Server/Front/package-lock.json ./
RUN npm install

# Copy the rest of the frontend source and build
COPY S5Server/Front/ ./
RUN npm run build -- --configuration development

# ==========================================
# STAGE 2: Backend Build & Publish (.NET)
# ==========================================
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend-build
WORKDIR /src

# Dependency on nodejs for Microsoft.TypeScript.MSBuild
RUN apt-get update && apt-get install -y nodejs

# Copy csproj and restore dependencies
COPY S5Server/S5Server.csproj ./S5Server/
RUN dotnet restore S5Server/S5Server.csproj

# Copy the rest of the backend source
COPY S5Server/ ./S5Server/

# Copy built frontend from Stage 1 back into the structure expected by S5Server.csproj
# The .csproj file Target 'PublishAngular' looks for files in Front/dist/Menu/browser
COPY --from=frontend-build /src/S5Server/Front/dist /src/S5Server/Front/dist

# Publish the application. 
# This will execute the 'PublishAngular' target in S5Server.csproj
WORKDIR /src/S5Server
RUN dotnet publish S5Server.csproj -c Release -o /app/publish /p:UseAppHost=false

# Generate development certificate
RUN mkdir -p /app/publish && dotnet dev-certs https -ep /app/publish/aspnetapp.pfx -p devpass

# ==========================================
# STAGE 3: Final Runtime Image (Alpine)
# ==========================================
FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final
WORKDIR /app

# Copy published artifacts
COPY --from=backend-build /app/publish .

# Install system libraries for .NET and Npgsql on Alpine
RUN apk add --no-cache \
    icu-libs \
    krb5-libs \
    libintl \
    gcompat \
    libstdc++ \
    libgcc

# Fix GSSAPI symbolic link
RUN [ -f /usr/lib/libgssapi_krb5.so.2 ] || ln -sf /usr/lib/libgssapi_krb5.so /usr/lib/libgssapi_krb5.so.2

ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

# Environment variables for ports and certificate
ENV ASPNETCORE_URLS="https://+:8081;http://+:8080"
ENV ASPNETCORE_Kestrel__Certificates__Default__Password="devpass"
ENV ASPNETCORE_Kestrel__Certificates__Default__Path="/app/aspnetapp.pfx"

# Аргументы, которые придут из GitLab CI
ARG APP_VERSION=unknown
ARG IMAGE_NAME=unknown

# Превращаем их в переменные окружения для приложения
ENV APP_VERSION=$APP_VERSION
ENV IMAGE_NAME=$IMAGE_NAME
ENV BUILD_AT=$BUILD_AT
# ----------------------

EXPOSE 8080
EXPOSE 8081

ENTRYPOINT ["dotnet", "S5Server.dll"]