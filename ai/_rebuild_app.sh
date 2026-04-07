#!/bin/bash
# Переходим в корень проекта
cd "$(dirname "$0")/.."

MODE=${1:-"all"}

if [ "$MODE" == "all" ]; then
    echo "--- [STEP 1/2] Rebuilding Frontend (Angular) ---"
    # Вызываем существующий скрипт пересборки фронтенда
    bash ./ai/_rebuild_frontend.sh
fi

if [ "$MODE" == "all" ] || [ "$MODE" == "app" ]; then
    echo "--- [STEP 2/2] Rebuilding Backend (.NET) without Cache ---"
    # Возвращаемся в корень (на случай, если внутри скриптов _rebuild_frontend.sh была смена директории)
    cd "$(dirname "$0")/.."
    # Полная пересборка с игнорированием всех инкрементальных кэшей
    dotnet build S5Server/S5Server.csproj --no-incremental --force
else
    echo "Unknown mode: $MODE. Use 'all' or 'app'."
    exit 1
fi

echo "--- REBUILD ($MODE) COMPLETE ---"
