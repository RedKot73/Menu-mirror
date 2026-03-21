using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

using Npgsql;

namespace S5Server.Utils
{
    /// <summary>
    /// Provides a set of static utility functions for controller-related operations, including GUID handling, model
    /// state error extraction, controller name manipulation, and database error processing.
    /// </summary>
    /// <remarks>This class is intended to simplify common tasks encountered in ASP.NET Core controllers, such
    /// as working with GUID values, extracting validation errors from model state, and handling database uniqueness
    /// violations. All members are static and can be used without instantiating the class. Thread safety is ensured as
    /// no shared state is maintained.</remarks>
    public static class ControllerFunctions
    {
        /// <summary>
        /// Id для записи БД представляющую отсутствующее значение
        /// </summary>
        public static readonly Guid NullGuid = new("00000000-0000-0000-0000-000000000001");
        /// <summary>
        /// Represents a sentinel value indicating that a GUID has not been set.
        /// </summary>
        /// <remarks>This value can be used to distinguish between an unset GUID and other default or
        /// empty GUID values in application logic.</remarks>
        public static readonly Guid NotSetGuid = new("00000000-0000-0000-0000-000000000002");

        /// <summary>
        /// Перевіряє чи Guid є null, Empty
        /// </summary>
        public static bool IsNullOrEmptyGuid(this Guid? guid) =>
            !guid.HasValue || guid.Value == Guid.Empty;
        /// <summary>
        /// Перевіряє чи Guid має значення (не null, не Empty)
        /// </summary>
        public static bool HasValueGuid(this Guid? guid) => !guid.IsNullOrEmptyGuid();
        /// <summary>
        /// Extracts error messages from the specified model state dictionary and returns them as a dictionary mapping
        /// field names to their corresponding error messages.
        /// </summary>
        /// <remarks>Only the first error message for each field is included in the result. This method is
        /// useful for displaying validation errors in user interfaces or logging.</remarks>
        /// <param name="modelState">The model state dictionary containing validation errors. Cannot be null.</param>
        /// <returns>A dictionary where each key is a field name and each value is the first error message associated with that
        /// field. The dictionary will be empty if there are no errors.</returns>
        public static Dictionary<string, string> GetErrorsFromModelState(ModelStateDictionary modelState)
        {
            var errors = new Dictionary<string, string>();
            foreach (var state in modelState)
            {
                if (state.Value != null && state.Value.Errors.Any())
                {
                    var key = state.Key;
                    var errorMessage = state.Value.Errors.First().ErrorMessage;
                    errors.Add(key, errorMessage);
                }
            }
            return errors;
        }
        /// <summary>
        /// Adds error messages from an IdentityResult to the specified ModelStateDictionary, optionally associating
        /// them with a given key.
        /// </summary>
        /// <remarks>Use this method to transfer validation errors from identity operations into ASP.NET
        /// Core model state, enabling display of error messages in views. If no key is provided, errors are added as
        /// global model errors.</remarks>
        /// <param name="AModelState">The ModelStateDictionary to which error messages will be added.</param>
        /// <param name="AResult">The IdentityResult containing errors to add to the model state.</param>
        /// <param name="AKey">The key to associate with each error message. If null, errors are added with an empty key.</param>
        public static void AddErrors(ModelStateDictionary AModelState, IdentityResult AResult, string? AKey = null)
        {
            var vKey = AKey ?? string.Empty;
            foreach (var vErr in AResult.Errors)
            {
                AModelState.AddModelError(vKey, vErr.Description);
            }
        }
        /// <summary>
        /// Removes the "Controller" suffix from the specified string if it appears after the first character.
        /// </summary>
        /// <remarks>This method is commonly used to extract the base name from ASP.NET controller class
        /// names. If the input does not end with "Controller" or the suffix is at the start, the original value is
        /// returned.</remarks>
        /// <param name="value">The string to process. If it ends with "Controller" and the suffix is not at the start, it will be removed.</param>
        /// <returns>A string with the "Controller" suffix removed if present; otherwise, the original string.</returns>
        public static string CutControllerName(string value)
        {
            const string controller = "Controller";
            return value.IndexOf(controller) > 0 ? value[..^controller.Length] : value;
        }
        /// <summary>
        /// Gets the default controller name for the specified controller type.
        /// </summary>
        /// <typeparam name="T">The type of controller for which to retrieve the default name. Must inherit from <see cref="Controller"/>.</typeparam>
        /// <returns>A string containing the default name of the controller type <typeparamref name="T"/>.</returns>
        public static string GetDefControllerName<T>() where T : Controller
        {
            var s = typeof(T).Name;
            var res = CutControllerName(s);
            return res;
        }
        /// <summary>
        /// Retrieves the default controller name for the specified controller instance.
        /// </summary>
        /// <remarks>This method extracts the controller name by removing the 'Controller' suffix from the
        /// type name, if present. Use this method to obtain a conventional controller name for routing or display
        /// purposes.</remarks>
        /// <param name="AController">The controller instance from which to obtain the default controller name. Cannot be null.</param>
        /// <returns>A string containing the default controller name derived from the type of the specified controller.</returns>
        public static string GetDefControllerName(this Controller AController)
        {
            var s = AController.GetType().Name;
            var res = CutControllerName(s);
            return res;
        }
        /// <summary>
        /// Represents the message prefix used to indicate a duplicate key value in error reporting.
        /// </summary>
        /// <remarks>This constant can be used when constructing error messages related to duplicate key
        /// violations, typically in database or collection operations.</remarks>
        public const string cnstDupKey = "The duplicate key value is (";
        /// <summary>
        /// Extracts the duplicate key value from a database error message string.
        /// </summary>
        /// <remarks>This method is typically used to parse error messages returned by a database when a
        /// unique constraint violation occurs. The format of the error message must match the expected pattern for
        /// correct extraction.</remarks>
        /// <param name="AErrMsg">The error message string containing information about a duplicate key violation. Must include the duplicate
        /// key indicator and value.</param>
        /// <returns>A string representing the duplicate key value extracted from the error message.</returns>
        public static string GetDupValueFromErrStr(string AErrMsg)
        {
            var vLeft = AErrMsg.LastIndexOf(cnstDupKey) + cnstDupKey.Length;
            var vRight = AErrMsg.LastIndexOf(").");
            var vVal = AErrMsg[vLeft..vRight];
            return vVal;
        }
        /// <summary>
        /// Determines whether the specified error message contains a duplicate key value and extracts the value if
        /// present.
        /// </summary>
        /// <remarks>Use this method to parse error messages for duplicate key violations and retrieve the
        /// conflicting value. The method does not throw exceptions for missing or malformed values.</remarks>
        /// <param name="AErrMsg">The error message string to analyze for a duplicate key value.</param>
        /// <param name="AValue">When this method returns, contains the duplicate value extracted from the error message if found; otherwise,
        /// an empty string.</param>
        /// <returns>true if a duplicate key value is found and extracted; otherwise, false.</returns>
        public static bool GetDupValueFromErrStr(string AErrMsg, out string AValue)
        {
            if (AErrMsg.Contains(cnstDupKey))
            {
                AValue = GetDupValueFromErrStr(AErrMsg);
                return true;
            }
            AValue = string.Empty;
            return false;
        }
        /// <summary>
        /// Determines whether the specified database update exception was caused by a unique constraint violation in
        /// PostgreSQL.
        /// </summary>
        /// <remarks>This method checks whether the inner exception is a PostgreSQL exception with SQL
        /// state '23505', which indicates a unique constraint violation. Use this method to handle duplicate key errors
        /// when working with PostgreSQL and Entity Framework Core.</remarks>
        /// <param name="ex">The database update exception to inspect for a unique constraint violation. Cannot be null.</param>
        /// <returns>true if the exception represents a unique constraint violation; otherwise, false.</returns>
        public static bool IsUniqueViolation(DbUpdateException ex)
            => ex.InnerException is PostgresException pgEx &&
               pgEx.SqlState == "23505";
        /// <summary>
        /// Creates a ProblemDetails instance representing a unique constraint violation in the database.
        /// </summary>
        /// <remarks>The returned ProblemDetails includes additional information in the Extensions
        /// property, such as the constraint name, table name, column name, and the provided identifier. This method is
        /// intended for use in scenarios where a database operation fails due to a unique constraint conflict,
        /// typically in PostgreSQL.</remarks>
        /// <param name="ex">The DbUpdateException that contains information about the database update error. Must contain a
        /// PostgresException as its inner exception to provide constraint details.</param>
        /// <param name="id">An optional identifier associated with the conflicting record. May be null if not applicable.</param>
        /// <returns>A ProblemDetails object with status code 409, containing details about the unique constraint violation,
        /// including constraint, table, column, and record identifier information.</returns>
        public static ProblemDetails CreateUniqueViolationProblem(
            DbUpdateException ex,
            string? id = null)
        {
            var pgEx = ex.InnerException as PostgresException;

            return new ProblemDetails
            {
                Status = 409,
                Title = "Конфлікт унікальності",
                Detail = "Запис з такими даними вже існує",
                Extensions =
            {
                ["constraint"] = pgEx?.ConstraintName,
                ["table"] = pgEx?.TableName,
                ["column"] = pgEx?.ColumnName,
                ["id"] = id
            }
            };
        }
    }
}