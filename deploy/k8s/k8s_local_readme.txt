Вот обновленная лаконичная инструкция для запуска локального окружения с поддержкой HTTPS и Secrets.1. Подготовка .envДобавьте переменные для сертификата в корень проекта. Эти данные попадут в секрет s5-https-cert.Ini, TOMLDB_USER=S5Master_user
DB_PASSWORD=YourSecurePassword123
DB_NAME=S5_DB_local
ASPNETCORE_ENVIRONMENT=Development
DB_HOST=s5-db-cluster-rw

# Настройки HTTPS
KESTREL_CERT_PATH=/app/aspnetapp.pfx
KESTREL_CERT_PASSWORD=devpass
2. Сборка и запускВыполняйте команды из корня проекта.Шаг 1: Сборка образов Соберите сервер (с генерацией сертификата внутри) и базу.PowerShelldocker build -t s5-server:local .
docker build -f ./deploy/database/Dockerfile.kuber -t s5-db:local .
Шаг 2: Полная очистка (Reset) Удалите старые ресурсы и диски, чтобы применить новые настройки из .env.PowerShellkubectl delete cluster s5-db-cluster -n s5-local
kubectl delete pvc -l "cnpg.io/cluster=s5-db-cluster" -n s5-local
kubectl delete secret s5-db-credentials s5-https-cert -n s5-local --ignore-not-found
kubectl delete job s5-db-init-job -n s5-local --ignore-not-found
Шаг 3: Деплой Соберите манифесты и примените их в кластер.PowerShellkustomize build deploy/k8s/overlays/local --load-restrictor LoadRestrictionsNone | kubectl apply -f -
3. Мониторинг и проверкаДождитесь перехода всех подов в статус Running или Completed.Статус подов: kubectl get pods -n s5-local -w.Проверка сертификата: Убедитесь, что секрет создан: kubectl get secret s5-https-cert -n s5-local.Логи сервера: Проверьте запуск Kestrel на порту 8081: kubectl logs -l app=s5-server -n s5-local --tail=50.Важно: Если сервер запустился раньше завершения импорта базы, выполните перезапуск:kubectl rollout restart deployment s5-server-deployment -n s5-local.