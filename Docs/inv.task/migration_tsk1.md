# Investigation Task: Migration Sync (migration_tsk1)

## Опис проблеми
При запуску програми з прапорцем `--migrate` виникає критична помилка `PendingModelChangesWarning`. Entity Framework Core виявляє розбіжність між поточним кодом моделей C# та знімком бази даних (`MainDbContextModelSnapshot.cs`), що блокує застосування нових міграцій.

## Логи помилки (останній запуск)
```text
s5-migration-local  | [03:56:49 INF] ⏳ Ожидают применения: 5
s5-migration-local  | [03:56:49 INF]    [pending] 20260322190509_AddUnitTaskHistTable
s5-migration-local  | [03:56:49 INF]    [pending] 20260327065832_AddViewCityFullName
s5-migration-local  | [03:56:49 INF]    [pending] 20260327110610_InsDefValueToDictUnitTask
s5-migration-local  | [03:56:49 INF]    [pending] 20260327114020_AddAmountToUnitTask
s5-migration-local  | [03:56:49 INF]    [pending] 20260401163624_DecoupleUserAndSoldier
s5-migration-local  | [03:56:49 INF] Начинаем применение миграций...
s5-migration-local  | [03:56:49 FTL] ❌ Ошибка при применении миграций
s5-migration-local  | System.InvalidOperationException: An error was generated for warning 'Microsoft.EntityFrameworkCore.Migrations.PendingModelChangesWarning': The model for context 'MainDbContext' has pending changes. Add a new migration before updating the database.
```

## Результати аналізу
1. **Розсинхронізація після Decouple**: Міграція `DecoupleUserAndSoldier` видалила колонку `soldier_id` з таблиці `users`, але в коді `MainDbContext.cs` залишалася конфігурація Fluent API для обов'язкового зв'язку (Inner Join за замовчуванням).
2. **Обчислювальні властивості**: Властивості `FIO` в моделях `Soldier` та `SoldierHist` не мали атрибута `[NotMapped]`, через що EF намагався знайти відповідні колонки в БД.
3. **Заблоковане tooling**: Команда `dotnet ef` не працювала через відсутність пакета `Microsoft.EntityFrameworkCore.Design` у проекті та некоректну ініціалізацію інструмента у контейнері.

## План вирішення
### 1. Підготовка інструментів
- Додати пакет `Microsoft.EntityFrameworkCore.Design` до `S5Server.csproj`.
- Встановити `dotnet-ef` локально: `dotnet tool install --global dotnet-ef`.

### 2. Відновлення зв'язку (Optional Relationship)
Користувач бажає відновити зв'язок між `TVezhaUser` та `Soldier` за принципом `LEFT JOIN` (опціонально):
- Видалити `[NotMapped]` з `TVezhaUser.Soldier`.
- Додати `public Guid? SoldierId { get; set; }` до моделі `TVezhaUser`.
- Налаштувати зв'язок у `MainDbContext.cs`:
  ```csharp
  modelBuilder.Entity<TVezhaUser>()
      .HasOne(u => u.Soldier)
      .WithOne()
      .HasForeignKey<TVezhaUser>(u => u.SoldierId)
      .IsRequired(false);
  ```

### 3. Фіксація змін
- Згенерувати нову міграцію для синхронізації: `dotnet ef migrations add RestoreUserSoldierRelationOptional`.
- Видалити тимчасове придушення варнінгів у `Program.cs`.
- Запустити міграцію на базі.
