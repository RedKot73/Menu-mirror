# 1. Сборка
FROM mcr.microsoft.com/dotnet/sdk:latest AS build
WORKDIR /src

# Установка Node.js и необходимых инструментов сборки
RUN apt-get update && apt-get install -y nodejs

COPY ["S5Server/S5Server.csproj", "./"]
RUN dotnet restore "S5Server.csproj"

COPY ["S5Server/", "./"]

RUN rm -rf Properties/launchSettings.json || true

# ГЕНЕРАЦИЯ СЕРТИФИКАТА
RUN mkdir -p /app && dotnet dev-certs https -ep /app/aspnetapp.pfx -p devpass

RUN dotnet build "S5Server.csproj" -c Release -o /app/build

# 2. Публикация
FROM build AS publish
RUN dotnet publish "S5Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

# 3. Финальный образ (Alpine)
FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=build /app/aspnetapp.pfx .



# Установка необходимых системных библиотек для работы .NET и Npgsql на Alpine
RUN apk add --no-cache \
    icu-libs \
    krb5-libs \
    libintl \
    gcompat \
    libstdc++ \
    libgcc

# Исправление: безопасное создание ссылки на библиотеку GSSAPI для Kerberos/SSL
RUN [ -f /usr/lib/libgssapi_krb5.so.2 ] || ln -sf /usr/lib/libgssapi_krb5.so /usr/lib/libgssapi_krb5.so.2

ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

# Настройки портов и сертификата
ENV ASPNETCORE_URLS="https://+:8081;http://+:8080"
ENV ASPNETCORE_Kestrel__Certificates__Default__Password="devpass"
ENV ASPNETCORE_Kestrel__Certificates__Default__Path="/app/aspnetapp.pfx"

EXPOSE 8080
EXPOSE 8081

ENTRYPOINT ["dotnet", "S5Server.dll"]