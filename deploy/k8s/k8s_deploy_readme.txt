Вот финальный вариант инструкции k8s_deploy_readme.txt, где каждое предложение и команда вынесены на новую строку для максимальной читаемости.🚀 Инструкция по развертыванию S5 (K8s Deployment Guide) 📋 Шаг 1: Установка инструментов (Runtime) Администратор должен установить базовое ПО на сервере, где запущен GitLab Runner (executor: shell).Docker Engine (необходим для сборки образов): Bashsudo apt-get update && sudo apt-get install docker.io -y
sudo systemctl enable --now docker
Kubectl и Kustomize (инструменты управления манифестами): Bash# Установка Kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Установка Kustomize
curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash [cite: 25]
sudo mv kustomize /usr/local/bin/ [cite: 25]
⚙️ Шаг 2: Настройка переменных GitLab (CI/CD) Внесите переменные в Settings -> CI/CD -> Variables.
Данные автоматически запишутся в .env.
Список переменных: DB_USER: 
S5Master_user (Имя пользователя БД).
DB_PASSWORD: YourSecurePassword123 
(Пароль, используйте Masked).
DB_NAME: S5_DB_local (Имя базы данных).
KESTREL_CERT_PATH: /app/aspnetapp.pfx (ПУТЬ В КОНТЕЙНЕРЕ строго этот).
KESTREL_CERT_PASSWORD: devpass (Пароль от вашего .pfx файла).


Важно: Пайплайн продублирует их для оператора БД и создаст секрет s5-https-cert.🌐 Шаг 3: Подготовка пространств имен (Namespaces) Создайте изоляцию для окружений перед первым деплоем.Bash# Для LOCAL
kubectl create namespace s5-local --dry-run=client -o yaml | kubectl apply -f - 

# Для DEV
kubectl create namespace s5-dev --dry-run=client -o yaml | kubectl apply -f - [cite: 28]

# Для PROD
kubectl create namespace s5-prod --dry-run=client -o yaml | kubectl apply -f - 
🐘 Шаг 4: Установка Оператора БД Манифесты kind: Cluster требуют наличия оператора CloudNativePG.Bash# Установка оператора
kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/main/releases/cnpg-1.22.1.yaml

# Проверка (дождитесь статуса Running)
kubectl get pods -n cnpg-system 
💻 Шаг 5: Команды для локального деплоя (WSL/Local) Выполняйте команды из корня проекта.1. Сборка образов: Bashdocker build -t s5-server:local . 
docker build -f ./deploy/database/Dockerfile.kuber -t s5-db:local . 
2. Полный сброс (Reset): Bashkubectl delete cluster s5-db-cluster -n s5-local 
kubectl delete pvc -l "cnpg.io/cluster=s5-db-cluster" -n s5-local 
kubectl delete secret s5-db-credentials s5-https-cert -n s5-local --ignore-not-found 
3. Применение манифестов: Bashkustomize build deploy/k8s/overlays/local --load-restrictor LoadRestrictionsNone | kubectl apply -f - 
🔍 Шаг 6: Диагностика Проверка секретов:
kubectl get secret s5-https-cert -n s5-local -o yaml

Проверка базы:kubectl get cluster s5-db-cluster -n s5-local


Логи импорта:kubectl logs -l job-name=s5-db-init-job -n s5-local

Перезапуск приложения (если сервер запустился раньше базы):
kubectl rollout restart deployment s5-server-deployment -n s5-local

Додайте в Шаг 6 (Диагностика): 

Логи миграции: kubectl logs -l app=s5-server -n s5-local -c db-migration.

Примітка: Оскільки міграція — це окремий контейнер всередині пода, 
прапор -c db-migration обов'язковий, інакше ви побачите логи основного сервера.