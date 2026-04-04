#!/bin/bash
# Скрипт остановки инфраструктуры S5 через Docker Compose
# Использование: ./_s5down.sh [db|app|all] [-v]

COMPOSE_FILE="docker-compose.local.yml"
SERVICES=""
FLAGS=""
USE_DOWN=false

# Обработка аргументов
for arg in "$@"; do
    case $arg in
        db)
            SERVICES="db"
            ;;
        app)
            SERVICES="app migration"
            ;;
        all)
            USE_DOWN=true
            ;;
        -v)
            FLAGS="$FLAGS -v"
            ;;
    esac
done

# Если аргумент не указан, или указано 'all', используем 'down'
if [ -z "$1" ] || [ "$USE_DOWN" = true ]; then
    echo "--- [STOPPING AND REMOVING ALL SERVICES] ---"
    docker-compose -f "$COMPOSE_FILE" down $FLAGS
else
    # Если указаны конкретные сервисы, останавливаем и удаляем их
    echo "--- [STOPPING SERVICES: $SERVICES] ---"
    # rm -f -s принудительно останавливает и удаляет контейнеры сервисов, $FLAGS добавит -v
    docker-compose -f "$COMPOSE_FILE" rm -f -s $FLAGS $SERVICES
fi
