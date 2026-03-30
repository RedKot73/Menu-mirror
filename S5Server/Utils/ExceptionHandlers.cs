using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace S5Server.Utils;

/// <summary>
/// Обробляє OperationCanceledException — клієнт закрив з'єднання.
/// Повертає 499 Client Closed Request (nginx-конвенція).
/// </summary>
public sealed class ClientCanceledExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        if (exception is not OperationCanceledException)
            return false;

        httpContext.Response.StatusCode = 499;
        await httpContext.Response.WriteAsJsonAsync(new ProblemDetails
        {
            Status = 499,
            Title = "Скасовано кліентом"
        }, cancellationToken);

        return true;
    }
}

/// <summary>
/// Загальний обробник необроблених виключень.
/// Логує помилку та повертає 500.
/// </summary>
public sealed class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        logger.LogError(exception,
            "Необроблена помилка: {Method} {Path}",
            httpContext.Request.Method,
            httpContext.Request.Path);

        httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
        await httpContext.Response.WriteAsJsonAsync(new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Title = "Внутрішня помилка сервера"
        }, cancellationToken);

        return true;
    }
}
