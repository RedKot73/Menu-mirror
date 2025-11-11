# S5 Server - Military Unit Management System

Система управления воинскими подразделениями с поддержкой иерархии, личного состава и документов.

## 🚀 Быстрый старт для разработки

### Требования
- Node.js 18+
- .NET 10 SDK
- Visual Studio 2022 или VS Code

### Запуск в режиме разработки

1. **Backend:**
```bash
cd S5Server
dotnet run
```

2. **Frontend (в отдельном терминале):**
```bash
cd S5Server/Front
npm install
npm start
```

Приложение будет доступно: http://localhost:4200  
API: http://localhost:5000

---

## 📦 Создание Self-Contained релиза для клиента

### Быстрая сборка (Windows x64)
```powershell
.\build-quick.ps1
```

Готовый пакет: `Release\win-x64\`

### Создание архива
```powershell
Compress-Archive -Path "Release\win-x64\*" -DestinationPath "S5Server.zip"
```

### Запуск у клиента
1. Распаковать архив
2. Запустить `start.bat`
3. Открыть http://localhost:5000

**Важно:** У клиента не требуется установка .NET - все включено в релиз!

### Подробная документация
- [QUICK-START.md](QUICK-START.md) - Быстрый старт
- [RELEASE-GUIDE.md](RELEASE-GUIDE.md) - Полная инструкция по релизу
- [BUILD-README.md](BUILD-README.md) - Техническая документация

---

## 🏗️ Технологический стек

### Backend
- .NET 10
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- Serilog

### Frontend
- Angular 20.3.9
- Angular Material
- Standalone Components
- Signals API
- TypeScript

### Особенности
- Self-contained deployment (не требует .NET Runtime)
- Single Page Application
- Responsive design
- Локализация (украинский язык)
- Встроенная база данных SQLite

---

## 📁 Структура проекта

```
Menu/
├── S5Server/                    # Backend (.NET)
│   ├── Controllers/             # API контроллеры
│   ├── Data/                    # База данных
│   │   └── S5_DB.sqlite        # SQLite БД
│   ├── Models/                  # Модели данных
│   ├── Front/                   # Frontend (Angular)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── Soldier/    # Управление бойцами
│   │   │   │   ├── Unit/       # Управление подразделениями
│   │   │   │   ├── test/       # Тестовая страница
│   │   │   │   └── ...
│   │   │   └── ...
│   │   └── ...
│   └── ...
├── build-quick.ps1              # Быстрая сборка
├── build-release.ps1            # Полная сборка релиза
├── build-all.ps1                # Сборка всех платформ
├── QUICK-START.md               # Быстрый старт
├── RELEASE-GUIDE.md             # Инструкция по релизу
└── BUILD-README.md              # Техническая документация
```

---

## 🔧 Скрипты сборки

| Скрипт | Описание |
|--------|----------|
| `build-quick.ps1` | Быстрая сборка для Windows x64 |
| `build-release.ps1` | Сборка с параметрами (платформа, конфигурация) |
| `build-all.ps1` | Сборка для всех поддерживаемых платформ |

### Примеры использования

```powershell
# Windows x64 (по умолчанию)
.\build-release.ps1

# Linux x64
.\build-release.ps1 -Runtime linux-x64

# Все платформы
.\build-all.ps1 -Platform all

# Без пересборки Frontend
.\build-release.ps1 -SkipFrontend
```

---

## 🎯 Основные функции

### Управление подразделениями
- Иерархическое дерево подразделений
- Типы подразделений (роты, взводы и т.д.)
- Придание подразделений
- Комментарии и метаданные

### Управление личным составом
- Учет бойцов
- Звания и должности
- Статусы (в строю, ранен, погиб и т.д.)
- Цветовая индикация критичности статусов
- Даты прибытия/убытия
- Автоматическая подсветка задержавшихся бойцов (>14 дней)

### Справочники
- Звания
- Должности
- Статусы бойцов
- Типы подразделений
- Виды войск

### Документы
- Создание документов на основе данных подразделений
- JSON редактор
- Экспорт данных

---

## 🔒 Безопасность

- SQLite база данных с возможностью шифрования
- Конфигурация через appsettings.json
- Логирование всех операций
- Рекомендации по backup в документации

---

## 📊 Размеры релизов

| Платформа | Размер |
|-----------|--------|
| win-x64   | ~150-180 MB |
| win-x86   | ~130-150 MB |
| linux-x64 | ~140-160 MB |
| osx-x64   | ~140-160 MB |

---

## 🚢 CI/CD

GitHub Actions workflow включен: `.github/workflows/build-release.yml`

Автоматически собирает релизы для:
- Windows x64
- Linux x64
- macOS x64

---

## 📝 Лицензия

Проприетарное ПО - все права защищены.

---

## 👥 Разработка

### Установка зависимостей

Backend:
```bash
cd S5Server
dotnet restore
```

Frontend:
```bash
cd S5Server/Front
npm install
```

### Миграции БД

```bash
cd S5Server
dotnet ef migrations add MigrationName
dotnet ef database update
```

### Линтинг Frontend

```bash
cd S5Server/Front
npm run lint
npm run lint:fix
```

---

## 📞 Поддержка

При возникновении вопросов см. документацию:
- [RELEASE-GUIDE.md](RELEASE-GUIDE.md) - Подробная инструкция
- [BUILD-README.md](BUILD-README.md) - Техническая информация

---

**Версия:** 1.0.0  
**Дата:** 2025-11-11  
**Framework:** .NET 10.0 + Angular 20.3.9
