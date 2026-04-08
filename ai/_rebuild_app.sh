#!/bin/bash
# Переходим в корень проекта
cd "$(dirname "$0")/.." || exit 1

MODE=${1:-"all"}

# --- ПУНКТ №3: Определение команды dotnet ---
# Проверяем, запущена ли оболочка в WSL (Windows Subsystem for Linux)
if grep -qi "microsoft" /proc/version 2>/dev/null; then
    DOTNET_CMD="dotnet.exe"
    echo "ℹ️ [Detected WSL] Using dotnet.exe for Windows interoperability."
else
    DOTNET_CMD="dotnet"
fi

if [ "$MODE" == "all" ]; then
    echo "--- [STEP 1/2] Rebuilding Frontend (Angular) ---"
    # Вызываем скрипт пересборки фронтенда
    # Используем bash явно и подавляем возможные ошибки \r через sed, если они появятся
    bash ./ai/_rebuild_frontend.sh
fi

if [ "$MODE" == "all" ] || [ "$MODE" == "app" ]; then
    echo "--- [STEP 2/2] Rebuilding Backend (.NET) without Cache ---"
    # Гарантируем возврат в корень
    cd "$(dirname "$0")/.." || exit 1
    
    # Используем переменную DOTNET_CMD (с .exe или без)
    "$DOTNET_CMD" build S5Server/S5Server.csproj --no-incremental --force
else
    echo "Unknown mode: $MODE. Use 'all' or 'app'."
    exit 1
fi

echo "--- REBUILD ($MODE) COMPLETE ---"