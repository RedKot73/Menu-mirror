using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

using Npgsql;

namespace S5Server.Utils
{
    public static class ControllerFunctions
    {
        /// <summary>
        /// Id для записи БД представляющую отсутствующее значение
        /// </summary>
        public static readonly Guid NullGuid = new("00000000-0000-0000-0000-000000000001");
        //public static readonly string NullGuid = "00000000-0000-0000-0000-000000000001";

        /// <summary>
        /// Перевіряє чи Guid є null, Empty
        /// </summary>
        public static bool IsNullOrEmptyGuid(this Guid? guid) =>
            !guid.HasValue || guid.Value == Guid.Empty;// || guid.Value == NullGuid;
        /// <summary>
        /// Перевіряє чи Guid має значення (не null, не Empty)
        /// </summary>
        public static bool HasValueGuid(this Guid? guid) => !guid.IsNullOrEmptyGuid();
            //guid.HasValue && guid.Value != Guid.Empty;

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
        /*
        public static bool UpdModelState(ModelStateDictionary modelState, Exception ex, string value)
        {
            string errMsg = ex.InnerException?.Message ?? ex.Message;
            if (errMsg.Contains(PostgresErrorCodes.UniqueViolation))
            {
                modelState.AddModelError("Value", $"Значення \"{value}\" вже існує в довіднику");
                return true;
            }
            return false;
        }
        */

        public static void AddErrors(ModelStateDictionary AModelState, IdentityResult AResult, string? AKey = null)
        {
            var vKey = AKey ?? string.Empty;
            foreach (var vErr in AResult.Errors)
            {
                AModelState.AddModelError(vKey, vErr.Description);
            }
        }

        public static string CutControllerName(string value)
        {
            const string controller = "Controller";
            return value.IndexOf(controller) > 0 ? value[..^controller.Length] : value;
        }

        public static string GetDefControllerName<T>() where T : Controller
        {
            var s = typeof(T).Name;
            var res = CutControllerName(s);
            return res;
        }

        public static string GetDefControllerName(this Controller/*ControllerBase*/ AController)
        {
            var s = AController.GetType().Name;
            var res = CutControllerName(s);
            return res;
        }

        public const string cnstDupKey = "The duplicate key value is (";
        public static string GetDupValueFromErrStr(string AErrMsg)
        {
            var vLeft = AErrMsg.LastIndexOf(cnstDupKey) + cnstDupKey.Length;
            var vRight = AErrMsg.LastIndexOf(").");
            var vVal = AErrMsg[vLeft..vRight];
            return vVal;
        }

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

        public static bool IsUniqueViolation(DbUpdateException ex)
            => ex.InnerException is PostgresException pgEx &&
               pgEx.SqlState == "23505";

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