#!/bin/bash

# Переход в корень проекта
cd "$(dirname "$0")/.." || exit

# 1. Формируем аргументы командной строки из .env (гарантирует высший приоритет в .NET)
# DOTNET_ARGS=""
# if [ -f .env ]; then
#     echo "--- [INIT] Parsing .env to command line arguments ---"
    
#     while IFS='=' read -r key value || [ -n "$key" ]; do
#         # Пропускаем комментарии и пустые строки
#         if [[ ! "$key" =~ ^# && -n "$key" ]]; then
#             # Очищаем ключ и значение
#             clean_key=$(echo "$key" | tr -d '\r' | sed 's/^\xEF\xBB\xBF//' | xargs)
#             clean_value=$(echo "$value" | tr -d '\r' | xargs)
            
#             # Также экспортируем в Bash (на случай использования другими инструментами)
#             # export "$clean_key=$clean_value"
            
#             # Добавляем в строку аргументов: --KEY="VALUE"
#             DOTNET_ARGS="$DOTNET_ARGS --$clean_key=\"$clean_value\""
            
#             if [[ "$clean_key" == "TWO_FACTOR_MODE" || "$clean_key" == "REQUIRE_MANDATORY_2FA" ]]; then
#                 echo "  -> Bound: $clean_key=$clean_value"
#             fi
#         fi
#     done < .env
#     echo "  ✅ Loaded variables from .env as application arguments."
# else
#     echo "--- [WARNING] .env file not found at $(pwd)/.env! Defaults will be used. ---"
# fi

# 2. Определение команды dotnet (Интероперабельность с WSL)
DOTNET_CMD="dotnet"
if grep -qi "microsoft" /proc/version 2>/dev/null; then
    DOTNET_CMD="dotnet.exe"
    echo "ℹ️ [Detected WSL] Using dotnet.exe for execution"
fi

# 3. Настройки портов и путей
APP_PORT=${APP_PORT:-5000}
echo "APP_PORT: $APP_PORT"
echo $APP_PORT > /tmp/app_active_port

export ASPNETCORE_URLS="http://0.0.0.0:$APP_PORT"
export DOTNET_USE_POLLING_FILE_WATCHER=1
export HOME=/tmp
export DOTNET_CLI_HOME=/tmp/.dotnet
# Убедитесь, что путь к пакетам существует
mkdir -p "$(pwd)/S5Server/packages"
export NUGET_PACKAGES="$(pwd)/S5Server/packages"

# 4. Режимы работы
COMMAND=$1

case "$COMMAND" in
    "watch")
        echo "--- [WATCH MODE] Starting dotnet watch ---"
        eval "$DOTNET_CMD watch run --project S5Server/S5Server.csproj --urls=\"http://0.0.0.0:$APP_PORT\" --no-restore --non-interactive"
        ;;
    "run")
        echo "--- [RUN MODE] Standard startup ---"
        eval "$DOTNET_CMD run --project S5Server/S5Server.csproj --urls=\"http://0.0.0.0:$APP_PORT\" --no-restore"
        ;;
    *)
        echo "Usage: $0 {run|watch}"
        exit 1
        ;;
esac
