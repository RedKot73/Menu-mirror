#!/bin/bash
# Переходим в корень проекта
cd "$(dirname "$0")/.."

# 1. Загружаем переменные из .env
if [ -f .env ]; then
    echo "--- Loading environment from .env ---"
    set -a
    source .env
    set +a
else
    echo "--- [WARNING] .env file not found! ---"
fi

# 2. Настройки портов и путей
APP_PORT=${APP_PORT:-5000}
echo $APP_PORT > /tmp/app_active_port

export ASPNETCORE_URLS="http://0.0.0.0:$APP_PORT"
export DOTNET_USE_POLLING_FILE_WATCHER=1
export HOME=/tmp
export DOTNET_CLI_HOME=/tmp/.dotnet
export NUGET_PACKAGES="$(pwd)/S5Server/packages"

# 3. Режимы работы (один параметр)
COMMAND=$1

case "$COMMAND" in
    "watch")
        echo "--- [WATCH MODE] Starting dotnet watch ---"
        cd S5Server
        dotnet watch run --no-restore --non-interactive --no-launch-profile
        ;;
    "run")
        echo "--- [RUN MODE] Standard startup ---"
        cd S5Server
        dotnet run --no-restore --no-launch-profile
        ;;
    *)
        echo "Usage: $0 {run|watch}"
        exit 1
        ;;
esac
