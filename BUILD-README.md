# S5 Server - Build Scripts

## Скрипты сборки self-contained релиза

### build-release.ps1

Основной скрипт сборки self-contained пакета для развертывания у клиента.

#### Использование:

```powershell
# Сборка для Windows x64 (по умолчанию)
.\build-release.ps1

# Сборка для конкретной платформы
.\build-release.ps1 -Runtime win-x64      # Windows 64-bit
.\build-release.ps1 -Runtime win-x86      # Windows 32-bit
.\build-release.ps1 -Runtime linux-x64    # Linux 64-bit
.\build-release.ps1 -Runtime osx-x64      # macOS 64-bit

# Сборка в режиме Debug
.\build-release.ps1 -Configuration Debug

# Пропустить сборку Frontend (использовать существующий build)
.\build-release.ps1 -SkipFrontend
```

#### Что делает скрипт:

1. Проверяет наличие Node.js и .NET SDK
2. Собирает Angular Frontend (`npm run build`)
3. Собирает .NET Backend в режиме self-contained
4. Копирует базу данных SQLite
5. Создает конфигурационные файлы для продакшена
6. Создает скрипты запуска (start.bat / start.sh)
7. Создает README с инструкциями

#### Результат:

Готовый пакет в директории: `Release/{runtime}/`

- Содержит все необходимое для запуска у клиента
- Включает .NET Runtime (не требует установки .NET)
- Размер: ~150-200 MB

### build-all.ps1

Скрипт для сборки под все платформы одновременно.

#### Использование:

```powershell
# Сборка для всех платформ
.\build-all.ps1 -Platform all

# Сборка для одной платформы
.\build-all.ps1 -Platform win-x64
```

## Развертывание у клиента

### Подготовка:

1. Выполните сборку: `.\build-release.ps1 -Runtime win-x64`
2. Создайте ZIP архив директории: `Release\win-x64\`
3. Передайте архив клиенту

### У клиента (Windows):

1. Распаковать архив в любую директорию
2. Запустить `start.bat`
3. Открыть браузер: http://localhost:5000

### У клиента (Linux/Mac):

1. Распаковать архив
2. Выполнить: `chmod +x start.sh`
3. Запустить: `./start.sh`
4. Открыть браузер: http://localhost:5000

## Требования для сборки

### На машине разработчика:

- Node.js 18+ (для сборки Angular)
- .NET 10 SDK (для сборки Backend)
- PowerShell 5.1+ или PowerShell Core 7+

### У клиента:

- Ничего не требуется! (self-contained включает runtime)
- Только операционная система

## Структура выходного пакета

Release/win-x64/
├── S5Server.exe              # Главный исполняемый файл
├── start.bat                 # Скрипт запуска (Windows)
├── start.sh                  # Скрипт запуска (Linux/Mac)
├── README.txt                # Инструкции для клиента
├── appsettings.json          # Основная конфигурация
├── appsettings.Production.json  # Продакшн конфигурация
├── Data/
│   └── S5_DB.sqlite         # База данных
├── wwwroot/                  # Angular приложение
│   ├── index.html
│   ├── main-*.js
│   └── ...
├── logs/                     # Директория логов (создается автоматически)
└── [множество DLL файлов]    # .NET Runtime и зависимости

## Конфигурация

### Изменение порта

Отредактируйте `appsettings.Production.json`:

```json
{
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://0.0.0.0:НОВЫЙ_ПОРТ"
      }
    }
  }
}
```

### Строка подключения к БД

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=Data/S5_DB.sqlite"
  }
}
```

## Особенности Self-Contained сборки

### Преимущества:

- ✓ Не требует установки .NET Runtime у клиента
- ✓ Гарантированная версия runtime
- ✓ Полная изоляция от других .NET приложений
- ✓ Простое развертывание (копирование файлов)

### Недостатки:

- ✗ Больший размер (~150-200 MB vs ~10-20 MB)
- ✗ Нужна отдельная сборка для каждой платформы

## Troubleshooting

### Ошибка: "Node.js не найден"

Установите Node.js: https://nodejs.org/

### Ошибка: ".NET SDK не найден"

Установите .NET 10 SDK: https://dotnet.microsoft.com/download

### Ошибка при сборке Angular

```powershell
cd S5Server\Front
npm install
npm run build
```

### Очистка перед пересборкой

```powershell
# Очистка Frontend
Remove-Item S5Server\Front\dist -Recurse -Force
Remove-Item S5Server\Front\node_modules -Recurse -Force

# Очистка Backend
Remove-Item S5Server\bin -Recurse -Force
Remove-Item S5Server\obj -Recurse -Force

# Очистка Release
Remove-Item Release -Recurse -Force
```

## Автоматизация

### Создание ZIP архива (Windows)

```powershell
# После сборки
Compress-Archive -Path "Release\win-x64\*" -DestinationPath "S5Server-win-x64.zip"
```

### Создание tar.gz архива (Linux/Mac)

```bash
tar -czf S5Server-linux-x64.tar.gz -C Release/linux-x64 .
```

## Версионирование

Версия приложения задается в:

- `S5Server/S5Server.csproj` - версия Backend
- `S5Server/Front/package.json` - версия Frontend

## CI/CD Integration

Пример использования в Azure DevOps / GitHub Actions:

```yaml
- name: Build Self-Contained Release
  run: |
    pwsh -File build-release.ps1 -Runtime win-x64 -Configuration Release
    
- name: Archive Release
  run: |
    Compress-Archive -Path "Release/win-x64/*" -DestinationPath "S5Server.zip"
    
- name: Upload Artifact
  uses: actions/upload-artifact@v3
  with:
    name: S5Server-Release
    path: S5Server.zip
```

## Обновление у клиента

### Простое обновление (замена файлов):

1. Остановить приложение
2. Сделать backup базы данных (`Data/S5_DB.sqlite`)
3. Заменить все файлы кроме `Data/` и `appsettings.Production.json`
4. Запустить приложение

### Обновление с миграцией БД:

1. Остановить приложение
2. Backup всей директории
3. Заменить файлы
4. Запустить миграцию (если требуется)
5. Запустить приложение
