#!/bin/bash
# Пересборка образа базы данных
# БЕЗ ЗАПУСКА

# Перейти в директорию скрипта
cd "$(dirname "$0")"

echo "--- [STEP 1/3] Stopping and Removing Database Container ---"
docker-compose -f docker-compose.local.yml stop db
docker-compose -f docker-compose.local.yml rm -f db

echo "--- [STEP 2/3] Hard Resetting Database Volume ---"
# Мы используем определение сервиса 'db' из yaml, чтобы очистить его собственные волюмы.
# Это надежнее, чем 'docker volume rm', так как гарантирует удаление данных точно из того места,
# куда их пишет Postgres, не требуя знания системного префикса (например s5app_pg_local_data).
docker-compose -f docker-compose.local.yml run --rm --entrypoint "sh -c 'rm -rf /var/lib/postgresql/data/pgdata/*'" db

echo "--- [STEP 3/3] Rebuilding Database Image (No-Cache) ---"
docker-compose -f docker-compose.local.yml build --no-cache db

echo "--- [REBUILD DB COMPLETE] ---"
echo "You can now run the database using: ./_s5run.sh db"
