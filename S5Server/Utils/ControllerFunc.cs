using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace S5Server.Utils
{
    public static class ControllerFunctions
    {
        //Id для записи БД представляющую отсутствующее значение
        public static readonly Guid NullGuid = new("00000000-0000-0000-0000-000000000001");

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


        public static async Task<string> RenderViewAsync<TModel>(this Controller controller,
            string viewName, TModel model, ICompositeViewEngine viewEngine,
            bool partial = false) where TModel : class
        {
            ArgumentNullException.ThrowIfNull(model);

            if (string.IsNullOrEmpty(viewName))
            {
                viewName = controller.ControllerContext.ActionDescriptor.ActionName;
            }
            /*
            ArgumentNullException.ThrowIfNull(context);
            ArgumentException.ThrowIfNullOrEmpty(viewName);
             */
            controller.ViewData.ModelState.Merge(controller.ModelState);
            controller.ViewData.Model = model;

            using var writer = new StringWriter();
            var viewResult = viewEngine.FindView(controller.ControllerContext, viewName, !partial);
            if (viewResult.View == null)
            {
                viewResult = viewEngine.GetView(null, viewName, !partial);
                if (viewResult.View == null)
                {
                    throw new ArgumentNullException($"{viewName} does not match any available view");
                }
            }

            var viewContext = new ViewContext(
                controller.ControllerContext,
                viewResult.View,
                controller.ViewData,
                controller.TempData,
                writer,
                new HtmlHelperOptions()
            );

            await viewResult.View.RenderAsync(viewContext);
            return writer.GetStringBuilder().ToString().Replace("\r", "").Replace("\n", "").Trim();
        }
    }
}