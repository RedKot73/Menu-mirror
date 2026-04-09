# Структура файлов проекта

Страница `/welcome` в коде находится по следующему пути:
**`S5Server/Front/src/app/pages/welcome/welcome.component.ts`** (а также связанные с ней файлы шаблона `.html` и стилей `.scss`).

Ниже представлено общее дерево файлов и папок проекта с кратким описанием:

```text
/ (Корень проекта)
├── .ai-context.md                # Главный файл контекста и архитектуры для ИИ-агентов
├── .gitlab-ci.yml                # Конфигурация CI/CD для GitLab
├── docker-compose.local.yml      # Локальная конфигурация Docker Compose
├── Dockerfile                    # Сборочный образ для основного приложения
├── Dockerfile.db                 # Сборочный образ для базы данных
├── Menu.sln                      # Главный файл решения (Solution) Visual Studio
├── package.json                  # Зависимости Node.js (преимущественно для фронтенда и скриптов)
├── readme.md                     # Основная документация проекта
├── TESTING_GUIDE.md              # Руководство по тестированию проекта
│
├── AI/                           # Скрипты для работы ИИ-агентов (запуск, остановка, сборка приложения)
│   ├── _run.s5app.sh / .ps1      # Скрипты запуска приложения для разных платформ
│   ├── _stop.s5app.sh / .ps1     # Скрипты остановки приложения
│   └── _rebuild_frontend.sh      # Скрипт пересборки фронтенда (Angular)
│
├── config/                       # Конфигурационные файлы, схемы и профили
│
├── deploy/                       # Файлы для развертывания
│   ├── cicd/                     # CI/CD пайплайны
│   ├── database/                 # Скрипты развертывания БД
│   └── k8s/                      # Манифесты Kubernetes
│
├── docker.db/                    # Данные для инициализации локальной базы данных
│   └── init-dump.sql.gz          # Дамп базы данных для инициализации
│
├── Docs/                         # Документация проекта по доменам
│   ├── 2fa_reference.md          # Документация по 2FA авторизации
│   ├── db-migration-protocol.md  # Инструкции по миграциям БД EF Core
│   └── user-entity.md            # Описание сущности пользователя
│
└── S5Server/                     # Основная директория исходного кода (Монолит .NET + Angular)
    ├── Program.cs                # Точка входа в backend-приложение .NET
    ├── appsettings.json          # Настройки backend-приложения
    ├── S5Server.csproj           # Файл проекта .NET
    │
    ├── Controllers/              # Контроллеры REST API (в основном legacy)
    ├── GraphQL/                  # Резолверы, мутации и запросы GraphQL
    ├── Migrations/               # Миграции Entity Framework Core (PostgreSQL)
    ├── Models/                   # C# модели базы данных (Domain Entities)
    ├── Services/                 # Бизнес-логика backend-приложения
    │
    └── Front/                    # Исходный код Frontend (Angular SPA)
        └── src/
            ├── app/
            │   ├── pages/
            │   │   └── welcome/  # <-- Здесь находится страница /welcome
            │   │       ├── welcome.component.ts
            │   │       ├── welcome.component.html
            │   │       └── welcome.component.scss
            │   └── auth/         # Логика авторизации, Guards и Interceptors
            └── Login/            # Компоненты страницы логина
```

Этот отчет описывает структуру без внесения каких-либо изменений в исходный код.