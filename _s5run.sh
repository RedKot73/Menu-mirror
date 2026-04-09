#!/bin/bash
# Скрипт запуска инфраструктуры S5 через Docker Compose
# Использование: ./_s5run.sh [db|app|all] [-v]

COMPOSE_FILE="docker-compose.local.yml"
SERVICES=""
FLAGS="-d"

# Обработка аргументов
case "$1" in
    db)
        echo "--- [STARTING DATABASE] ---"
        docker-compose -f "$COMPOSE_FILE" up -d db
        echo "--- [RUNNING MIGRATIONS] ---"
        docker-compose -f "$COMPOSE_FILE" up migration
        ;;
    app)
        echo "--- [STARTING APPLICATION] ---"
        docker-compose -f "$COMPOSE_FILE" up -d app
        ;;
    all|"")
        echo "--- [STARTING ALL SERVICES] ---"
        docker-compose -f "$COMPOSE_FILE" up -d db
        echo "--- [RUNNING MIGRATIONS] ---"
        docker-compose -f "$COMPOSE_FILE" up migration
        echo "--- [STARTING APP] ---"
        docker-compose -f "$COMPOSE_FILE" up -d app
        ;;
    *)
        # Если аргумент не предопределен, пробуем использовать его как имя сервиса
        # Но исключаем флаги
        if [[ ! "$1" =~ ^- ]]; then
            echo "--- [STARTING SERVICE: $1] ---"
            docker-compose -f "$COMPOSE_FILE" up -d "$1"
        fi
        ;;
esac