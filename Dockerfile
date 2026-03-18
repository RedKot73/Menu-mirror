# 1. Сборка
FROM mcr.microsoft.com/dotnet/sdk:latest AS build
WORKDIR /src

# Вставляем установку Node.js здесь, чтобы она была доступна для компиляции
RUN apt-get update && apt-get install -y nodejs


# Забираем файл проекта из папки S5Server и кладем в корень папки /src внутри контейнера
COPY ["S5Server/S5Server.csproj", "./"]
RUN dotnet restore "S5Server.csproj"


# Теперь копируем всё остальное содержимое папки S5Server
COPY ["S5Server/", "./"]

# ГЕНЕРАЦИЯ СЕРТИФИКАТА (Решение проблемы HTTPS)
# Создаем самоподписанный сертификат прямо в процессе сборки
RUN mkdir -p /app && dotnet dev-certs https -ep /app/aspnetapp.pfx -p devpass
#RUN dotnet dev-certs https -ep /app/aspnetapp.pfx -p devpass

# Собираем проект
RUN dotnet build "S5Server.csproj" -c Release -o /app/build

# 2. Публикация
FROM build AS publish
RUN dotnet publish "S5Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

# 3. Финальный образ
FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Настройки для корректной работы в Alpine
COPY --from=build /app/aspnetapp.pfx .

# === ДОБАВЬТЕ ВОТ ЭТИ ДВЕ СТРОКИ ===
RUN apk add --no-cache icu-libs
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
# ===================================

# Настройка порта Указываем Kestrel использовать наш файл и пароль
ENV ASPNETCORE_URLS="https://+:8081;http://+:8080"
ENV ASPNETCORE_Kestrel__Certificates__Default__Password="devpass"
ENV ASPNETCORE_Kestrel__Certificates__Default__Path="/app/aspnetapp.pfx"

# Открываем порты для внешнего доступа 
EXPOSE 8080
EXPOSE 8081
# ВАЖНО: Запускаем через .dll
ENTRYPOINT ["dotnet", "S5Server.dll"]