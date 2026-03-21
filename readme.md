1. Запуск всей системы
docker-compose -f docker-compose.local.yml up --build -d


2. Проверка логов (Самый важный этап)
docker logs -f s5-server-local
docker logs --tail 50 -f s5-server-local

3. Проверка базы данных и статуса базы
docker logs --tail 50 -f s5-server-local


docker exec -it s5-db-local psql -U S5Master_user -d S5_DB -c "\dn"
docker exec -it s5-db-local psql -U S5Master_user -d S5_DB -c "\dt *.*"
docker exec -it s5-db-local psql -U S5Master_user -d S5_DB -c "\dt *.*"

q - выход, enter, пагинация

4. перезапуск системы и выключение
docker-compose -f docker-compose.local.yml up -d
docker-compose -f docker-compose.local.yml down