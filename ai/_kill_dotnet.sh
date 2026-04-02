#!/bin/bash


# Читаем значение из файла
if [ -f ./.app_active_port ]; then
    SAVED_PORT=$(cat ./.app_active_port)
    echo "Приложение запущено на порту: $SAVED_PORT"
    # Теперь можем что-то сделать, например:
    curl http://localhost:$SAVED_PORT/health
else
    echo "Файл с портом не найден. Приложение запущено?"
fi

# Порт по умолчанию (можно передать аргументом: ./_kill_by_port.sh 5001)
PORT=${1:-${SAVED_PORT:-5000}}


echo "🔍 Ищем, кто занял порт $PORT..."

# Находим PID процесса, слушающего указанный порт (TCP)
PID=$(lsof -t -i:$PORT)

if [ -z "$PID" ]; then
    echo "✅ Порт $PORT свободен. Убивать некого."
else
    echo "⚠️ Порт $PORT занят процессом(ами): $PID"
    
    # Пытаемся убить мягко
    kill $PID 2>/dev/null
    sleep 1

    # Проверяем, жив ли еще процесс
    REMAINING_PID=$(lsof -t -i:$PORT)
    if [ ! -z "$REMAINING_PID" ]; then
        echo "💀 Процесс $REMAINING_PID не уходит. Добиваем (SIGKILL)..."
        kill -9 $REMAINING_PID 2>/dev/null
    fi
    echo "🚀 Порт $PORT успешно освобожден."
fi

# Твоя стандартная зачистка инфраструктуры (на всякий случай)
echo "🧹 Очистка общей инфраструктуры dotnet..."
pkill -i -9 "Microsoft.CodeAnalysis" 2>/dev/null