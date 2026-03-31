#!/bin/bash

# Цвета для вывода в терминал
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # Без цвета

COMPOSE_FILE="docker-compose.local.yml"

echo -e "${CYAN}--- S5 FULL CYCLE START (BASH) ---${NC}"

# ЭТАП 1: Запуск базы данных
echo -e "${YELLOW}[1/4] Starting database (db)...${NC}"
docker-compose -f $COMPOSE_FILE up -d db
if [ $? -ne 0 ]; then
    echo -e "${RED}Error starting DB!${NC}"
    exit 1
fi

# ЭТАП 2 и 3: Компиляция и запуск миграций
# Флаг --build инициирует dotnet build/publish внутри Dockerfile
echo -e "${YELLOW}[2-3/4] Building app and running migrations...${NC}"
docker-compose -f $COMPOSE_FILE up --build migration
if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Migrations failed!${NC}"
    exit 1
fi

# ЭТАП 4: Запуск основного сервера
echo -e "${YELLOW}[4/4] Starting server (app)...${NC}"
docker-compose -f $COMPOSE_FILE up -d app
if [ $? -ne 0 ]; then
    echo -e "${RED}Error starting App!${NC}"
    exit 1
fi

echo -e "${GREEN}SUCCESS! All stages completed.${NC}"
echo -e "App is running at http://localhost:8080 and https://localhost:8081"