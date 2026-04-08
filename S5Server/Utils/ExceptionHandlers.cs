using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace S5Server.Utils;

/// <summary>
/// Обробляє OperationCanceledException — клієнт закрив з'єднання.
/// Повертає 499 Client Closed Request (nginx-конвенція).
/// </summary>
public sealed class ClientCanceledExceptionHandler : IExceptionHandler
{
    /// <summary>
    /// Attempts to handle an exception by returning a client-canceled response if the exception is an
    /// OperationCanceledException.
    /// </summary>
    /// <remarks>If the exception is an OperationCanceledException, the response status code is set to 499 to
    /// indicate that the request was canceled by the client. Otherwise, the method does not modify the
    /// response.</remarks>
    /// <param name="httpContext">The HTTP context for the current request. Used to set the response status code and body if the exception is
    /// handled.</param>
    /// <param name="exception">The exception to evaluate and potentially handle. If it is an OperationCanceledException, a client-canceled
    /// response is returned.</param>
    /// <param name="cancellationToken">A token that can be used to cancel the asynchronous operation.</param>
    /// <returns>A task that represents the asynchronous operation. The task result is <see langword="true"/> if the exception
    /// was handled and a response was written; otherwise, <see langword="false"/>.</returns>
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
    /// <summary>
    /// Attempts to handle an unhandled exception by logging the error and returning a standardized internal server
    /// error response to the client.
    /// </summary>
    /// <remarks>The response is set to HTTP 500 Internal Server Error with a JSON body containing problem
    /// details. The exception is logged for diagnostic purposes.</remarks>
    /// <param name="httpContext">The HTTP context for the current request. Provides access to the request and response objects.</param>
    /// <param name="exception">The exception that occurred during request processing.</param>
    /// <param name="cancellationToken">A cancellation token that can be used to cancel the asynchronous operation.</param>
    /// <returns>A task that represents the asynchronous operation. The task result is <see langword="true"/> to indicate that
    /// the exception was handled.</returns>
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
