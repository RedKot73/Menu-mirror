#!/bin/bash
# Переходим в корень проекта
cd "$(dirname "$0")/.."

echo "--- [STEP 1/2] Rebuilding Frontend (Angular) ---"
# Вызываем существующий скрипт пересборки фронтенда
bash ./ai/_rebuild_frontend.sh

echo "--- [STEP 2/2] Rebuilding Backend (.NET) without Cache ---"
# Возвращаемся в корень (на случай, если внутри скриптов _rebuild_frontend.sh была смена директории)
cd "$(dirname "$0")/.."
# Полная пересборка с игнорированием всех инкрементальных кэшей
dotnet build S5Server/S5Server.csproj --no-incremental --force

echo "--- TOTAL REBUILD COMPLETE ---"
