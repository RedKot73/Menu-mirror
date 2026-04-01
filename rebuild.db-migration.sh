#!/bin/bash

# Яркие цвета для лучшей читаемости на синем фоне
CYAN='\033[1;36m'   # Яркий циан
YELLOW='\033[1;33m' # Яркий желтый
GREEN='\033[1;32m'  # Ярко-зеленый
RED='\033[1;31m'    # Яркий красный
NC='\033[0m'        # Сброс цвета

COMPOSE_FILE="docker-compose.local.yml"

echo -e "${CYAN}--- S5 DATABASE & MIGRATION ONLY ---${NC}"

# ЭТАП 1: Запуск базы данных
echo -e "${YELLOW}[1/2] Starting database (db)...${NC}"
docker-compose -f $COMPOSE_FILE up -d db
if [ $? -ne 0 ]; then
    echo -e "${RED}Error starting DB!${NC}"
    exit 1
fi

# ЭТАП 2: Компиляция и запуск миграций
# Флаг --build гарантирует, что изменения в коде миграций будут учтены
echo -e "${YELLOW}[2/2] Building and running migrations...${NC}"
docker-compose -f $COMPOSE_FILE up --build migration
if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Migrations failed!${NC}"
    exit 1
fi

echo -e "${GREEN}SUCCESS! Database is up and migrations are applied.${NC}"
echo -e "Service 'app' was NOT started."#!/bin/bash

# Яркие цвета для лучшей читаемости на синем фоне
CYAN='\033[1;36m'   # Яркий циан
YELLOW='\033[1;33m' # Яркий желтый
GREEN='\033[1;32m'  # Ярко-зеленый
RED='\033[1;31m'    # Яркий красный
NC='\033[0m'        # Сброс цвета

COMPOSE_FILE="docker-compose.local.yml"

echo -e "${CYAN}--- S5 DATABASE & MIGRATION ONLY ---${NC}"

# ЭТАП 1: Запуск базы данных
echo -e "${YELLOW}[1/2] Starting database (db)...${NC}"
docker-compose -f $COMPOSE_FILE up -d db
if [ $? -ne 0 ]; then
    echo -e "${RED}Error starting DB!${NC}"
    exit 1
fi

# ЭТАП 2: Компиляция и запуск миграций
# Флаг --build гарантирует, что изменения в коде миграций будут учтены
echo -e "${YELLOW}[2/2] Building and running migrations...${NC}"
docker-compose -f $COMPOSE_FILE up --build migration
if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Migrations failed!${NC}"
    exit 1
fi

echo -e "${GREEN}SUCCESS! Database is up and migrations are applied.${NC}"
echo -e "Service 'app' was NOT started."