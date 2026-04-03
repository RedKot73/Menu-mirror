import {
  AuthService
} from "./chunk-QAPGSYTZ.js";
import {
  ApolloLink,
  InMemoryCache,
  print,
  provideApollo
} from "./chunk-6HY5KKDU.js";
import {
  MAT_DATE_FORMATS,
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger,
  provideNativeDateAdapter
} from "./chunk-UIYIUELW.js";
import "./chunk-5OFTEHZD.js";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  provideRouter
} from "./chunk-3EEZP2Q7.js";
import "./chunk-2P3X7Y6Y.js";
import "./chunk-GOHAIDCM.js";
import {
  BidiModule,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DOCUMENT,
  Directive,
  EMPTY,
  ElementRef,
  HttpClient,
  HttpContext,
  HttpHeaders,
  Injectable,
  Input,
  LOCALE_ID,
  MatButton,
  MatButtonModule,
  NgModule,
  Observable,
  Platform,
  ViewEncapsulation,
  __spreadProps,
  __spreadValues,
  bootstrapApplication,
  catchError,
  firstValueFrom,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideHttpClient,
  provideZoneChangeDetection,
  registerLocaleData,
  setClassMetadata,
  signal,
  throwError,
  withInterceptors,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-IKDNLDBK.js";

// node_modules/@angular/common/locales/uk.js
var u = void 0;
function plural(val) {
  const n = val, i = Math.floor(Math.abs(val)), v = val.toString().replace(/^[^.]*\.?/, "").length;
  if (v === 0 && (i % 10 === 1 && !(i % 100 === 11)))
    return 1;
  if (v === 0 && (i % 10 === Math.floor(i % 10) && (i % 10 >= 2 && i % 10 <= 4) && !(i % 100 >= 12 && i % 100 <= 14)))
    return 3;
  if (v === 0 && i % 10 === 0 || (v === 0 && (i % 10 === Math.floor(i % 10) && (i % 10 >= 5 && i % 10 <= 9)) || v === 0 && (i % 100 === Math.floor(i % 100) && (i % 100 >= 11 && i % 100 <= 14))))
    return 4;
  return 5;
}
var uk_default = ["uk", [["\u0434\u043F", "\u043F\u043F"]], u, [["\u041D", "\u041F", "\u0412", "\u0421", "\u0427", "\u041F", "\u0421"], ["\u043D\u0434", "\u043F\u043D", "\u0432\u0442", "\u0441\u0440", "\u0447\u0442", "\u043F\u0442", "\u0441\u0431"], ["\u043D\u0435\u0434\u0456\u043B\u044F", "\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A", "\u0432\u0456\u0432\u0442\u043E\u0440\u043E\u043A", "\u0441\u0435\u0440\u0435\u0434\u0430", "\u0447\u0435\u0442\u0432\u0435\u0440", "\u043F\u02BC\u044F\u0442\u043D\u0438\u0446\u044F", "\u0441\u0443\u0431\u043E\u0442\u0430"], ["\u043D\u0434", "\u043F\u043D", "\u0432\u0442", "\u0441\u0440", "\u0447\u0442", "\u043F\u0442", "\u0441\u0431"]], u, [["\u0441", "\u043B", "\u0431", "\u043A", "\u0442", "\u0447", "\u043B", "\u0441", "\u0432", "\u0436", "\u043B", "\u0433"], ["\u0441\u0456\u0447.", "\u043B\u044E\u0442.", "\u0431\u0435\u0440.", "\u043A\u0432\u0456\u0442.", "\u0442\u0440\u0430\u0432.", "\u0447\u0435\u0440\u0432.", "\u043B\u0438\u043F.", "\u0441\u0435\u0440\u043F.", "\u0432\u0435\u0440.", "\u0436\u043E\u0432\u0442.", "\u043B\u0438\u0441\u0442.", "\u0433\u0440\u0443\u0434."], ["\u0441\u0456\u0447\u043D\u044F", "\u043B\u044E\u0442\u043E\u0433\u043E", "\u0431\u0435\u0440\u0435\u0437\u043D\u044F", "\u043A\u0432\u0456\u0442\u043D\u044F", "\u0442\u0440\u0430\u0432\u043D\u044F", "\u0447\u0435\u0440\u0432\u043D\u044F", "\u043B\u0438\u043F\u043D\u044F", "\u0441\u0435\u0440\u043F\u043D\u044F", "\u0432\u0435\u0440\u0435\u0441\u043D\u044F", "\u0436\u043E\u0432\u0442\u043D\u044F", "\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434\u0430", "\u0433\u0440\u0443\u0434\u043D\u044F"]], [["\u0421", "\u041B", "\u0411", "\u041A", "\u0422", "\u0427", "\u041B", "\u0421", "\u0412", "\u0416", "\u041B", "\u0413"], ["\u0441\u0456\u0447.", "\u043B\u044E\u0442.", "\u0431\u0435\u0440.", "\u043A\u0432\u0456\u0442.", "\u0442\u0440\u0430\u0432.", "\u0447\u0435\u0440\u0432.", "\u043B\u0438\u043F.", "\u0441\u0435\u0440\u043F.", "\u0432\u0435\u0440.", "\u0436\u043E\u0432\u0442.", "\u043B\u0438\u0441\u0442.", "\u0433\u0440\u0443\u0434."], ["\u0441\u0456\u0447\u0435\u043D\u044C", "\u043B\u044E\u0442\u0438\u0439", "\u0431\u0435\u0440\u0435\u0437\u0435\u043D\u044C", "\u043A\u0432\u0456\u0442\u0435\u043D\u044C", "\u0442\u0440\u0430\u0432\u0435\u043D\u044C", "\u0447\u0435\u0440\u0432\u0435\u043D\u044C", "\u043B\u0438\u043F\u0435\u043D\u044C", "\u0441\u0435\u0440\u043F\u0435\u043D\u044C", "\u0432\u0435\u0440\u0435\u0441\u0435\u043D\u044C", "\u0436\u043E\u0432\u0442\u0435\u043D\u044C", "\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434", "\u0433\u0440\u0443\u0434\u0435\u043D\u044C"]], [["\u0434\u043E \u043D.\u0435.", "\u043D.\u0435."], ["\u0434\u043E \u043D. \u0435.", "\u043D. \u0435."], ["\u0434\u043E \u043D\u0430\u0448\u043E\u0457 \u0435\u0440\u0438", "\u043D\u0430\u0448\u043E\u0457 \u0435\u0440\u0438"]], 1, [6, 0], ["dd.MM.yy", "d MMM y\u202F'\u0440'.", "d MMMM y\u202F'\u0440'.", "EEEE, d MMMM y\u202F'\u0440'."], ["HH:mm", "HH:mm:ss", "HH:mm:ss z", "HH:mm:ss zzzz"], ["{1}, {0}", u, u, u], [",", "\xA0", ";", "%", "+", "-", "\u0415", "\xD7", "\u2030", "\u221E", "NaN", ":"], ["#,##0.###", "#,##0%", "#,##0.00\xA0\xA4", "#E0"], "UAH", "\u20B4", "\u0443\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430 \u0433\u0440\u0438\u0432\u043D\u044F", { "AUD": [u, "$"], "BRL": [u, "R$"], "BYN": [u, "\u0440."], "CAD": [u, "$"], "CNY": [u, "\xA5"], "EUR": [u, "\u20AC"], "GBP": [u, "\xA3"], "HKD": [u, "$"], "ILS": [u, "\u20AA"], "INR": [u, "\u20B9"], "KRW": [u, "\u20A9"], "MXN": [u, "$"], "NZD": [u, "$"], "PHP": [u, "\u20B1"], "RUR": [u, "\u0440."], "TWD": [u, "$"], "UAH": ["\u20B4"], "UAK": ["\u043A\u0440\u0431."], "USD": [u, "$"], "VND": [u, "\u20AB"], "XCD": [u, "$"] }, "ltr", plural];

// src/app/auth/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const token = auth.token();
  let authReq = req.clone({ withCredentials: true });
  if (token) {
    authReq = authReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(authReq).pipe(catchError((error) => {
    const isAuthExempt = req.url.includes("/api/account/login") || req.url.includes("/graphql");
    if (error.status === 401 && !isAuthExempt) {
      auth.logout();
    }
    return throwError(() => error);
  }));
};

// node_modules/@apollo/client/link/batch/batching.js
var OperationBatcher = class {
  // Queue on which the QueryBatcher will operate on a per-tick basis.
  batchesByKey = /* @__PURE__ */ new Map();
  scheduledBatchTimerByKey = /* @__PURE__ */ new Map();
  batchDebounce;
  batchInterval;
  batchMax;
  //This function is called to the queries in the queue to the server.
  batchHandler;
  batchKey;
  constructor({ batchDebounce, batchInterval, batchMax, batchHandler, batchKey }) {
    this.batchDebounce = batchDebounce;
    this.batchInterval = batchInterval;
    this.batchMax = batchMax || 0;
    this.batchHandler = batchHandler;
    this.batchKey = batchKey || (() => "");
  }
  enqueueRequest(request) {
    const requestCopy = __spreadProps(__spreadValues({}, request), {
      next: [],
      error: [],
      complete: [],
      subscribers: /* @__PURE__ */ new Set()
    });
    const key = this.batchKey(request.operation);
    if (!requestCopy.observable) {
      requestCopy.observable = new Observable((observer) => {
        let batch = this.batchesByKey.get(key);
        if (!batch)
          this.batchesByKey.set(key, batch = /* @__PURE__ */ new Set());
        const isFirstEnqueuedRequest = batch.size === 0;
        const isFirstSubscriber = requestCopy.subscribers.size === 0;
        requestCopy.subscribers.add(observer);
        if (isFirstSubscriber) {
          batch.add(requestCopy);
        }
        if (observer.next) {
          requestCopy.next.push(observer.next.bind(observer));
        }
        if (observer.error) {
          requestCopy.error.push(observer.error.bind(observer));
        }
        if (observer.complete) {
          requestCopy.complete.push(observer.complete.bind(observer));
        }
        if (isFirstEnqueuedRequest || this.batchDebounce) {
          this.scheduleQueueConsumption(key);
        }
        if (batch.size === this.batchMax) {
          this.consumeQueue(key);
        }
        return () => {
          if (requestCopy.subscribers.delete(observer) && requestCopy.subscribers.size < 1) {
            if (batch.delete(requestCopy) && batch.size < 1) {
              this.consumeQueue(key);
              batch.subscription?.unsubscribe();
            }
          }
        };
      });
    }
    return requestCopy.observable;
  }
  // Consumes the queue.
  // Returns a list of promises (one for each query).
  consumeQueue(key = "") {
    const batch = this.batchesByKey.get(key);
    this.batchesByKey.delete(key);
    if (!batch || !batch.size) {
      return;
    }
    const operations = [];
    const forwards = [];
    const observables = [];
    const nexts = [];
    const errors = [];
    const completes = [];
    batch.forEach((request) => {
      operations.push(request.operation);
      forwards.push(request.forward);
      observables.push(request.observable);
      nexts.push(request.next);
      errors.push(request.error);
      completes.push(request.complete);
    });
    const batchedObservable = this.batchHandler(operations, forwards);
    const onError = (error) => {
      errors.forEach((rejecters) => {
        if (rejecters) {
          rejecters.forEach((e) => e(error));
        }
      });
    };
    batch.subscription = batchedObservable.subscribe({
      next: (results) => {
        if (!Array.isArray(results)) {
          results = [results];
        }
        if (nexts.length !== results.length) {
          const error = new Error(`server returned results with length ${results.length}, expected length of ${nexts.length}`);
          error.result = results;
          return onError(error);
        }
        results.forEach((result, index) => {
          if (nexts[index]) {
            nexts[index].forEach((next) => next(result));
          }
        });
      },
      error: onError,
      complete: () => {
        completes.forEach((complete) => {
          if (complete) {
            complete.forEach((c) => c());
          }
        });
      }
    });
    return observables;
  }
  scheduleQueueConsumption(key) {
    clearTimeout(this.scheduledBatchTimerByKey.get(key));
    this.scheduledBatchTimerByKey.set(key, setTimeout(() => {
      this.consumeQueue(key);
      this.scheduledBatchTimerByKey.delete(key);
    }, this.batchInterval));
  }
};

// node_modules/@apollo/client/link/batch/batchLink.js
var BatchLink = class extends ApolloLink {
  batcher;
  constructor(options) {
    super();
    const { batchDebounce, batchInterval = 10, batchMax = 0, batchHandler = () => EMPTY, batchKey = () => "" } = options || {};
    this.batcher = new OperationBatcher({
      batchDebounce,
      batchInterval,
      batchMax,
      batchHandler,
      batchKey
    });
  }
  request(operation, forward) {
    return this.batcher.enqueueRequest({ operation, forward });
  }
};

// node_modules/apollo-angular/fesm2022/apollo-angular-http.mjs
var fetch = (req, httpClient, extractFiles) => {
  const shouldUseBody = ["POST", "PUT", "PATCH"].indexOf(req.method.toUpperCase()) !== -1;
  const shouldStringify = (param) => ["variables", "extensions"].indexOf(param.toLowerCase()) !== -1;
  const isBatching = req.body.length;
  let shouldUseMultipart = req.options && req.options.useMultipart;
  let multipartInfo;
  if (shouldUseMultipart) {
    if (isBatching) {
      return new Observable((observer) => observer.error(new Error("File upload is not available when combined with Batching")));
    }
    if (!shouldUseBody) {
      return new Observable((observer) => observer.error(new Error("File upload is not available when GET is used")));
    }
    if (!extractFiles) {
      return new Observable((observer) => observer.error(new Error(`To use File upload you need to pass "extractFiles" function from "extract-files" library to HttpLink's options`)));
    }
    multipartInfo = extractFiles(req.body);
    shouldUseMultipart = !!multipartInfo.files.size;
  }
  let bodyOrParams = {};
  if (isBatching) {
    if (!shouldUseBody) {
      return new Observable((observer) => observer.error(new Error("Batching is not available for GET requests")));
    }
    bodyOrParams = {
      body: req.body
    };
  } else {
    const body = shouldUseMultipart ? multipartInfo.clone : req.body;
    if (shouldUseBody) {
      bodyOrParams = {
        body
      };
    } else {
      const params = Object.keys(req.body).reduce((obj, param) => {
        const value = req.body[param];
        obj[param] = shouldStringify(param) ? JSON.stringify(value) : value;
        return obj;
      }, {});
      bodyOrParams = {
        params
      };
    }
  }
  if (shouldUseMultipart && shouldUseBody) {
    const form = new FormData();
    form.append("operations", JSON.stringify(bodyOrParams.body));
    const map = {};
    const files = multipartInfo.files;
    let i = 0;
    files.forEach((paths) => {
      map[++i] = paths;
    });
    form.append("map", JSON.stringify(map));
    i = 0;
    files.forEach((_, file) => {
      form.append(++i + "", file, file.name);
    });
    bodyOrParams.body = form;
  }
  return httpClient.request(req.method, req.url, __spreadValues(__spreadValues({
    observe: "response",
    responseType: "json",
    reportProgress: false
  }, bodyOrParams), req.options));
};
var mergeHeaders = (source, destination) => {
  if (source && destination) {
    const merged = destination.keys().reduce((headers, name) => headers.set(name, destination.getAll(name)), source);
    return merged;
  }
  return destination || source;
};
var mergeHttpContext = (source, destination) => {
  if (source && destination) {
    return [...source.keys()].reduce((context, name) => context.set(name, source.get(name)), destination);
  }
  return destination || source;
};
function prioritize(...values) {
  return values.find((val) => typeof val !== "undefined");
}
function createHeadersWithClientAwareness(context) {
  let headers = context.headers && context.headers instanceof HttpHeaders ? context.headers : new HttpHeaders(context.headers);
  if (context.clientAwareness) {
    const {
      name,
      version
    } = context.clientAwareness;
    if (name && !headers.has("apollographql-client-name")) {
      headers = headers.set("apollographql-client-name", name);
    }
    if (version && !headers.has("apollographql-client-version")) {
      headers = headers.set("apollographql-client-version", version);
    }
  }
  return headers;
}
var defaults = {
  batchInterval: 10,
  batchMax: 10,
  uri: "graphql",
  method: "POST",
  withCredentials: false,
  includeQuery: true,
  includeExtensions: false,
  useMultipart: false
};
function pick(context, options, key) {
  return prioritize(context[key], options[key], defaults[key]);
}
var HttpBatchLinkHandler = class extends ApolloLink {
  httpClient;
  options;
  batcher;
  batchInterval;
  batchMax;
  print = print;
  constructor(httpClient, options) {
    super();
    this.httpClient = httpClient;
    this.options = options;
    this.batchInterval = options.batchInterval || defaults.batchInterval;
    this.batchMax = options.batchMax || defaults.batchMax;
    if (this.options.operationPrinter) {
      this.print = this.options.operationPrinter;
    }
    const batchHandler = (operations) => {
      return new Observable((observer) => {
        const body = this.createBody(operations);
        const headers = this.createHeaders(operations);
        const context = this.createHttpContext(operations);
        const {
          method,
          uri,
          withCredentials
        } = this.createOptions(operations);
        if (typeof uri === "function") {
          throw new Error(`Option 'uri' is a function, should be a string`);
        }
        const req = {
          method,
          url: uri,
          body,
          options: {
            withCredentials,
            headers,
            context
          }
        };
        const sub = fetch(req, this.httpClient, () => {
          throw new Error("File upload is not available when combined with Batching");
        }).subscribe({
          next: (result) => observer.next(result.body),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
        return () => {
          if (!sub.closed) {
            sub.unsubscribe();
          }
        };
      });
    };
    const batchKey = options.batchKey || ((operation) => {
      return this.createBatchKey(operation);
    });
    this.batcher = new BatchLink({
      batchInterval: this.batchInterval,
      batchMax: this.batchMax,
      batchKey,
      batchHandler
    });
  }
  createOptions(operations) {
    const context = operations[0].getContext();
    return {
      method: pick(context, this.options, "method"),
      uri: pick(context, this.options, "uri"),
      withCredentials: pick(context, this.options, "withCredentials")
    };
  }
  createBody(operations) {
    return operations.map((operation) => {
      const includeExtensions = prioritize(operation.getContext().includeExtensions, this.options.includeExtensions, false);
      const includeQuery = prioritize(operation.getContext().includeQuery, this.options.includeQuery, true);
      const body = {
        operationName: operation.operationName,
        variables: operation.variables
      };
      if (includeExtensions) {
        body.extensions = operation.extensions;
      }
      if (includeQuery) {
        body.query = this.print(operation.query);
      }
      return body;
    });
  }
  createHeaders(operations) {
    return operations.reduce((headers, operation) => {
      const {
        headers: contextHeaders
      } = operation.getContext();
      return contextHeaders ? mergeHeaders(headers, contextHeaders) : headers;
    }, createHeadersWithClientAwareness({
      headers: this.options.headers,
      clientAwareness: operations[0]?.getContext()?.clientAwareness
    }));
  }
  createHttpContext(operations) {
    return operations.reduce((context, operation) => {
      const {
        httpContext
      } = operation.getContext();
      return httpContext ? mergeHttpContext(httpContext, context) : context;
    }, mergeHttpContext(this.options.httpContext, new HttpContext()));
  }
  createBatchKey(operation) {
    const context = operation.getContext();
    if (context.skipBatching) {
      return Math.random().toString(36).substring(2, 11);
    }
    const headers = context.headers && context.headers.keys().map((k) => context.headers.get(k));
    const opts = JSON.stringify({
      includeQuery: context.includeQuery,
      includeExtensions: context.includeExtensions,
      headers
    });
    return prioritize(context.uri, this.options.uri, "") + opts;
  }
  request(op, forward) {
    return this.batcher.request(op, forward);
  }
};
var HttpBatchLink = class _HttpBatchLink {
  httpClient;
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  create(options) {
    return new HttpBatchLinkHandler(this.httpClient, options);
  }
  static \u0275fac = function HttpBatchLink_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpBatchLink)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _HttpBatchLink,
    factory: _HttpBatchLink.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpBatchLink, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: HttpClient
  }], null);
})();
var HttpLinkHandler = class extends ApolloLink {
  httpClient;
  options;
  requester;
  print = print;
  constructor(httpClient, options) {
    super();
    this.httpClient = httpClient;
    this.options = options;
    if (this.options.operationPrinter) {
      this.print = this.options.operationPrinter;
    }
    this.requester = (operation) => new Observable((observer) => {
      const context = operation.getContext();
      let method = pick(context, this.options, "method");
      const includeQuery = pick(context, this.options, "includeQuery");
      const includeExtensions = pick(context, this.options, "includeExtensions");
      const url = pick(context, this.options, "uri");
      const withCredentials = pick(context, this.options, "withCredentials");
      const useMultipart = pick(context, this.options, "useMultipart");
      const useGETForQueries = this.options.useGETForQueries === true;
      const httpContext = mergeHttpContext(context.httpContext, mergeHttpContext(this.options.httpContext, new HttpContext()));
      const isQuery = operation.query.definitions.some((def) => def.kind === "OperationDefinition" && def.operation === "query");
      if (useGETForQueries && isQuery) {
        method = "GET";
      }
      const req = {
        method,
        url: typeof url === "function" ? url(operation) : url,
        body: {
          operationName: operation.operationName,
          variables: operation.variables
        },
        options: {
          withCredentials,
          useMultipart,
          headers: this.options.headers,
          context: httpContext
        }
      };
      if (includeExtensions) {
        req.body.extensions = operation.extensions;
      }
      if (includeQuery) {
        req.body.query = this.print(operation.query);
      }
      const headers = createHeadersWithClientAwareness(context);
      req.options.headers = mergeHeaders(req.options.headers, headers);
      const sub = fetch(req, this.httpClient, this.options.extractFiles).subscribe({
        next: (response) => {
          operation.setContext({
            response
          });
          observer.next(response.body);
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete()
      });
      return () => {
        if (!sub.closed) {
          sub.unsubscribe();
        }
      };
    });
  }
  request(op) {
    return this.requester(op);
  }
};
var HttpLink = class _HttpLink {
  httpClient;
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  create(options) {
    return new HttpLinkHandler(this.httpClient, options);
  }
  static \u0275fac = function HttpLink_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpLink)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _HttpLink,
    factory: _HttpLink.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpLink, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: HttpClient
  }], null);
})();

// src/app/auth/auth.guard.ts
var authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.requiresTwoFactor()) {
    return router.createUrlTree(["/welcome"]);
  }
  if (auth.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(["/login"]);
};
var twoFactorGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.requiresTwoFactor()) {
    return true;
  }
  return router.createUrlTree(["/login"]);
};

// src/app/app.routes.ts
var routes = [
  {
    path: "dictDroneTypes",
    loadComponent: () => import("./chunk-PHBLAT2Q.js").then((m) => m.DictDroneTypeComponent),
    title: "\u0422\u0438\u043F\u0438 \u0411\u041F\u041B\u0410",
    canActivate: [authGuard]
  },
  {
    path: "dictDroneModels",
    loadComponent: () => import("./chunk-HYXOM57T.js").then((m) => m.DictDroneModelComponent),
    title: "\u041C\u043E\u0434\u0435\u043B\u0456 \u0411\u041F\u041B\u0410",
    canActivate: [authGuard]
  },
  {
    path: "dictForcesTypes",
    loadComponent: () => import("./chunk-JXROFMMP.js").then((m) => m.DictForcesTypeComponent),
    title: "\u0412\u0438\u0434\u0438 \u0437\u0431\u0440\u043E\u0439\u043D\u0438\u0445 \u0441\u0438\u043B",
    canActivate: [authGuard]
  },
  {
    path: "dictPosition",
    loadComponent: () => import("./chunk-QSVPML35.js").then((m) => m.DictPositionComponent),
    title: "\u041F\u043E\u0441\u0430\u0434\u0438",
    canActivate: [authGuard]
  },
  {
    path: "dictRanks",
    loadComponent: () => import("./chunk-7EWQWMI2.js").then((m) => m.DictRanksComponent),
    title: "\u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u0456 \u0437\u0432\u0430\u043D\u043D\u044F",
    canActivate: [authGuard]
  },
  {
    path: "dictSoldierStates",
    loadComponent: () => import("./chunk-NGWQHL2A.js").then((m) => m.DictSoldierStatesComponent),
    title: "\u0421\u0442\u0430\u0442\u0443\u0441\u0438 \u043E\u0441\u043E\u0431\u043E\u0432\u043E\u0433\u043E \u0441\u043A\u043B\u0430\u0434\u0443",
    canActivate: [authGuard]
  },
  {
    path: "dictUnitTypes",
    loadComponent: () => import("./chunk-DWED4PNG.js").then((m) => m.DictUnitTypesComponent),
    title: "\u0422\u0438\u043F\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432",
    canActivate: [authGuard]
  },
  {
    path: "dictAreaTypes",
    loadComponent: () => import("./chunk-TM6H2UPU.js").then((m) => m.DictAreaTypeComponent),
    title: "\u0422\u0438\u043F\u0438 \u041D\u0430\u043F\u0440\u044F\u043C\u043A\u0443 \u041B\u0411\u0417",
    canActivate: [authGuard]
  },
  {
    path: "dictCityCategories",
    loadComponent: () => import("./chunk-M77P746P.js").then((m) => m.DictCityCategoryComponent),
    title: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457 \u043E\u0431'\u0454\u043A\u0442\u0456\u0432 \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u043E-\u0442\u0435\u0440\u0438\u0442\u043E\u0440\u0456\u0430\u043B\u044C\u043D\u0438\u0445 \u043E\u0434\u0438\u043D\u0438\u0446\u044C",
    canActivate: [authGuard]
  },
  {
    path: "dictCityCodes",
    loadComponent: () => import("./chunk-KTB2HVW4.js").then((m) => m.CityCodePageComponent),
    title: "\u041A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440 \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u043E-\u0442\u0435\u0440\u0438\u0442\u043E\u0440\u0456\u0430\u043B\u044C\u043D\u0438\u0445 \u043E\u0434\u0438\u043D\u0438\u0446\u044C",
    canActivate: [authGuard]
  },
  {
    path: "dictArea",
    loadComponent: () => import("./chunk-GUQSBQWQ.js").then((m) => m.DictAreaPage),
    title: "\u041D\u0430\u043F\u0440\u044F\u043C\u043E\u043A \u041B\u0411\u0417",
    canActivate: [authGuard]
  },
  {
    path: "dictTemplateCategories",
    loadComponent: () => import("./chunk-KGXYUZEN.js").then((m) => m.DictTemplateCategoriesComponent),
    title: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457 \u0448\u0430\u0431\u043B\u043E\u043D\u0456\u0432 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0456\u0432",
    canActivate: [authGuard]
  },
  {
    path: "dictUnitTasks",
    loadComponent: () => import("./chunk-H4D7LDWF.js").then((m) => m.DictUnitTaskPage),
    title: "\u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432",
    canActivate: [authGuard]
  },
  {
    path: "units",
    title: "\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0438",
    loadComponent: () => import("./chunk-HYSDAMCF.js").then((m) => m.UnitsComponent),
    canActivate: [authGuard]
  },
  {
    path: "unit/import",
    title: "\u0406\u043C\u043F\u043E\u0440\u0442 \u043E\u0441\u043E\u0431\u043E\u0432\u043E\u0433\u043E \u0441\u043A\u043B\u0430\u0434\u0443",
    loadComponent: () => import("./chunk-GWTCZVW2.js").then((m) => m.ImportProgressPage),
    canActivate: [authGuard]
  },
  {
    path: "personnel",
    title: "\u041E\u0441\u043E\u0431\u043E\u0432\u0438\u0439 \u0441\u043A\u043B\u0430\u0434",
    loadComponent: () => import("./chunk-TRE5VSP6.js").then((m) => m.PersonnelPage),
    canActivate: [authGuard]
  },
  {
    path: "DocumentDataSet",
    loadComponent: () => import("./chunk-7643MB43.js").then((m) => m.DocumentDataSetComponent),
    title: "\u0414\u0430\u043D\u0456 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0456\u0432",
    canActivate: [authGuard]
  },
  {
    path: "templates",
    title: "\u0428\u0430\u0431\u043B\u043E\u043D\u0438 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0456\u0432",
    loadComponent: () => import("./chunk-42WHN3FM.js").then((m) => m.DocTemplatesTree),
    canActivate: [authGuard]
  },
  {
    path: "users",
    title: "\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456",
    loadComponent: () => import("./chunk-3E7JP57W.js").then((m) => m.UsersPage),
    canActivate: [authGuard]
  },
  {
    path: "login",
    title: "\u0412\u0445\u0456\u0434 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443",
    loadComponent: () => import("./chunk-F2YMHKAK.js").then((m) => m.LoginPage)
  },
  {
    path: "welcome",
    title: "\u0414\u0432\u043E\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430 \u0430\u0432\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044F",
    loadComponent: () => import("./chunk-UZGTZ5C4.js").then((m) => m.WelcomeComponent),
    canActivate: [twoFactorGuard]
  },
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "**", redirectTo: "" }
];

// src/app/app.config.ts
var MY_NATIVE_FORMATS = {
  parse: {
    dateInput: { month: "short", year: "numeric", day: "numeric" }
  },
  display: {
    dateInput: "dd.MM.yyyy",
    monthYearLabel: "MMM yyyy",
    dateA11yLabel: "PP",
    monthYearA11yLabel: "MMMM yyyy"
  }
};
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: LOCALE_ID, useValue: "uk-UA" },
    { provide: MAT_DATE_FORMATS, useValue: MY_NATIVE_FORMATS },
    provideNativeDateAdapter(),
    provideAppInitializer(() => {
      const auth = inject(AuthService);
      return firstValueFrom(auth.checkSession());
    }),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({ uri: "/graphql" }),
        cache: new InMemoryCache(),
        defaultOptions: {
          watchQuery: { fetchPolicy: "network-only" },
          query: { fetchPolicy: "network-only" }
        }
      };
    })
  ]
};

// node_modules/@angular/material/fesm2022/toolbar.mjs
var _c0 = ["*", [["mat-toolbar-row"]]];
var _c1 = ["*", "mat-toolbar-row"];
var MatToolbarRow = class _MatToolbarRow {
  static \u0275fac = function MatToolbarRow_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatToolbarRow)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatToolbarRow,
    selectors: [["mat-toolbar-row"]],
    hostAttrs: [1, "mat-toolbar-row"],
    exportAs: ["matToolbarRow"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbarRow, [{
    type: Directive,
    args: [{
      selector: "mat-toolbar-row",
      exportAs: "matToolbarRow",
      host: {
        "class": "mat-toolbar-row"
      }
    }]
  }], null, null);
})();
var MatToolbar = class _MatToolbar {
  _elementRef = inject(ElementRef);
  _platform = inject(Platform);
  _document = inject(DOCUMENT);
  color;
  _toolbarRows;
  constructor() {
  }
  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._checkToolbarMixedModes();
      this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes());
    }
  }
  _checkToolbarMixedModes() {
    if (this._toolbarRows.length && (typeof ngDevMode === "undefined" || ngDevMode)) {
      const isCombinedUsage = Array.from(this._elementRef.nativeElement.childNodes).filter((node) => !(node.classList && node.classList.contains("mat-toolbar-row"))).filter((node) => node.nodeType !== (this._document ? this._document.COMMENT_NODE : 8)).some((node) => !!(node.textContent && node.textContent.trim()));
      if (isCombinedUsage) {
        throwToolbarMixedModesError();
      }
    }
  }
  static \u0275fac = function MatToolbar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatToolbar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatToolbar,
    selectors: [["mat-toolbar"]],
    contentQueries: function MatToolbar_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatToolbarRow, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._toolbarRows = _t);
      }
    },
    hostAttrs: [1, "mat-toolbar"],
    hostVars: 6,
    hostBindings: function MatToolbar_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classMap(ctx.color ? "mat-" + ctx.color : "");
        \u0275\u0275classProp("mat-toolbar-multiple-rows", ctx._toolbarRows.length > 0)("mat-toolbar-single-row", ctx._toolbarRows.length === 0);
      }
    },
    inputs: {
      color: "color"
    },
    exportAs: ["matToolbar"],
    ngContentSelectors: _c1,
    decls: 2,
    vars: 0,
    template: function MatToolbar_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c0);
        \u0275\u0275projection(0);
        \u0275\u0275projection(1, 1);
      }
    },
    styles: [".mat-toolbar{background:var(--mat-toolbar-container-background-color, var(--mat-sys-surface));color:var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));font-size:var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));line-height:var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));font-weight:var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));letter-spacing:var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));margin:0}@media(forced-colors: active){.mat-toolbar{outline:solid 1px}}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));--mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height, 56px)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height, 56px)}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbar, [{
    type: Component,
    args: [{
      selector: "mat-toolbar",
      exportAs: "matToolbar",
      host: {
        "class": "mat-toolbar",
        "[class]": 'color ? "mat-" + color : ""',
        "[class.mat-toolbar-multiple-rows]": "_toolbarRows.length > 0",
        "[class.mat-toolbar-single-row]": "_toolbarRows.length === 0"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: '<ng-content></ng-content>\n<ng-content select="mat-toolbar-row"></ng-content>\n',
      styles: [".mat-toolbar{background:var(--mat-toolbar-container-background-color, var(--mat-sys-surface));color:var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));font-size:var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));line-height:var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));font-weight:var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));letter-spacing:var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));margin:0}@media(forced-colors: active){.mat-toolbar{outline:solid 1px}}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));--mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height, 56px)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height, 56px)}}\n"]
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    _toolbarRows: [{
      type: ContentChildren,
      args: [MatToolbarRow, {
        descendants: true
      }]
    }]
  });
})();
function throwToolbarMixedModesError() {
  throw Error("MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.");
}
var MatToolbarModule = class _MatToolbarModule {
  static \u0275fac = function MatToolbarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatToolbarModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatToolbarModule,
    imports: [MatToolbar, MatToolbarRow],
    exports: [MatToolbar, MatToolbarRow, BidiModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbarModule, [{
    type: NgModule,
    args: [{
      imports: [MatToolbar, MatToolbarRow],
      exports: [MatToolbar, MatToolbarRow, BidiModule]
    }]
  }], null, null);
})();

// src/navigator/navigator.component.ts
function NavigatorComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275text(1, "\u0414\u043E\u0432\u0456\u0434\u043D\u0438\u043A\u0438");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 18);
    \u0275\u0275text(3, " \u0414\u0430\u043D\u0456 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0456\u0432 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 19);
    \u0275\u0275text(5, " \u0428\u0430\u0431\u043B\u043E\u043D\u0438 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0456\u0432 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 20);
    \u0275\u0275text(7, "\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0438");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 21);
    \u0275\u0275text(9, " \u041E\u0441\u043E\u0431\u043E\u0432\u0438\u0439 \u0441\u043A\u043B\u0430\u0434 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 22);
    \u0275\u0275text(11, "\u0420\u043E\u0437\u043F\u043E\u0440\u044F\u0434\u0436\u0435\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 23);
    \u0275\u0275text(13, "\u0414\u043E\u043D\u0435\u0441\u0435\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 24);
    \u0275\u0275text(15, "\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "span", 25);
    \u0275\u0275elementStart(17, "span", 26);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 27);
    \u0275\u0275listener("click", function NavigatorComponent_Conditional_1_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onLogout());
    });
    \u0275\u0275text(20, "\u0412\u0438\u0439\u0442\u0438");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    const dictionaries_r3 = \u0275\u0275reference(4);
    \u0275\u0275property("matMenuTriggerFor", dictionaries_r3);
    \u0275\u0275advance(18);
    \u0275\u0275textInterpolate(ctx_r1.auth.displayName());
  }
}
function NavigatorComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 25);
    \u0275\u0275elementStart(1, "button", 28);
    \u0275\u0275text(2, "\u0412\u0445\u0456\u0434 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443");
    \u0275\u0275elementEnd();
  }
}
var NavigatorComponent = class _NavigatorComponent {
  auth = inject(AuthService);
  onLogout() {
    this.auth.logout().subscribe();
  }
  static \u0275fac = function NavigatorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NavigatorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NavigatorComponent, selectors: [["app-navigator"]], decls: 39, vars: 3, consts: [["dictionaries", "matMenu"], ["dictDroneForces", "matMenu"], ["dictGeneralInfo", "matMenu"], ["mat-menu-item", "", 3, "matMenuTriggerFor"], ["mat-menu-item", "", "routerLink", "/dictDroneTypes", "routerLinkActive", "active-menu-item"], ["mat-menu-item", "", "routerLink", "/dictDroneModels", "routerLinkActive", "active-menu-item"], ["mat-menu-item", "", "routerLink", "/dictTemplateCategories", "routerLinkActive", "active-menu-item"], ["mat-menu-item", "", "routerLink", "/dictUnitTasks", "routerLinkActive", "active-menu-item"], ["mat-menu-item", "", "routerLink", "/dictForcesTypes", "routerLinkActive", "active-menu-item"], ["mat-menu-item", "", "routerLink", "/dictPosition", "routerLinkActive", "active-menu-item"], ["mat-menu-item", "", "routerLink", "/dictSoldierStates", "routerLinkActive", "active-menu-item"], ["mat-menu-item", "", "routerLink", "/dictUnitTypes", "routerLinkActive", "active-menu-item"], ["mat-menu-item", "", "routerLink", "/dictRanks", "routerLinkActive", "active-menu-item"], ["mat-menu-item", "", "routerLink", "/dictCityCategories", "routerLinkActive", "active-menu-item"], ["mat-menu-item", "", "routerLink", "/dictCityCodes", "routerLinkActive", "active-menu-item"], ["mat-menu-item", "", "routerLink", "/dictAreaTypes", "routerLinkActive", "active-menu-item"], ["mat-menu-item", "", "routerLink", "/dictArea", "routerLinkActive", "active-menu-item"], ["matButton", "", 3, "matMenuTriggerFor"], ["matButton", "", "routerLink", "/DocumentDataSet", "routerLinkActive", "active-link"], ["matButton", "", "routerLink", "/templates", "routerLinkActive", "active-link"], ["matButton", "", "routerLink", "/units", "routerLinkActive", "active-link"], ["matButton", "", "routerLink", "/personnel", "routerLinkActive", "active-link"], ["matButton", "", "routerLink", "/orders", "routerLinkActive", "active-link"], ["matButton", "", "routerLink", "/reports", "routerLinkActive", "active-link"], ["matButton", "", "routerLink", "/users", "routerLinkActive", "active-link"], [1, "spacer"], [1, "user-info"], ["matButton", "", 3, "click"], ["matButton", "", "routerLink", "/login", "routerLinkActive", "active-link"]], template: function NavigatorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-toolbar");
      \u0275\u0275conditionalCreate(1, NavigatorComponent_Conditional_1_Template, 21, 2)(2, NavigatorComponent_Conditional_2_Template, 3, 0);
      \u0275\u0275elementStart(3, "mat-menu", null, 0)(5, "button", 3);
      \u0275\u0275text(6, "\u0421\u0438\u043B\u0438 \u0431\u0435\u0437\u043F\u0456\u043B\u043E\u0442\u043D\u0438\u0445 \u0441\u0438\u0441\u0442\u0435\u043C");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "button", 3);
      \u0275\u0275text(8, "\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0456");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "mat-menu", null, 1)(11, "button", 4);
      \u0275\u0275text(12, " \u0422\u0438\u043F\u0438 \u0411\u041F\u041B\u0410 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "button", 5);
      \u0275\u0275text(14, " \u041C\u043E\u0434\u0435\u043B\u0456 \u0411\u041F\u041B\u0410 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "button", 6);
      \u0275\u0275text(16, " \u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457 \u0448\u0430\u0431\u043B\u043E\u043D\u0456\u0432 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0456\u0432 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "button", 7);
      \u0275\u0275text(18, " \u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "mat-menu", null, 2)(21, "button", 8);
      \u0275\u0275text(22, " \u0412\u0438\u0434\u0438 \u0437\u0431\u0440\u043E\u0439\u043D\u0438\u0445 \u0441\u0438\u043B ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "button", 9);
      \u0275\u0275text(24, " \u041F\u043E\u0441\u0430\u0434\u0438 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "button", 10);
      \u0275\u0275text(26, " \u0421\u0442\u0430\u0442\u0443\u0441\u0438 \u043E\u0441\u043E\u0431\u043E\u0432\u043E\u0433\u043E \u0441\u043A\u043B\u0430\u0434\u0443 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "button", 11);
      \u0275\u0275text(28, " \u0422\u0438\u043F\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "button", 12);
      \u0275\u0275text(30, " \u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u0456 \u0437\u0432\u0430\u043D\u043D\u044F ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "button", 13);
      \u0275\u0275text(32, " \u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457 \u043E\u0431'\u0454\u043A\u0442\u0456\u0432 \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u043E-\u0442\u0435\u0440\u0438\u0442\u043E\u0440\u0456\u0430\u043B\u044C\u043D\u0438\u0445 \u043E\u0434\u0438\u043D\u0438\u0446\u044C ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "button", 14);
      \u0275\u0275text(34, " \u041A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440 \u043E\u0431'\u0454\u043A\u0442\u0456\u0432 \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u043E-\u0442\u0435\u0440\u0438\u0442\u043E\u0440\u0456\u0430\u043B\u044C\u043D\u0438\u0445 \u043E\u0434\u0438\u043D\u0438\u0446\u044C ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "button", 15);
      \u0275\u0275text(36, " \u0422\u0438\u043F\u0438 \u0440\u0430\u0439\u043E\u043D\u0443 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C (\u0420\u0412\u0417) ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "button", 16);
      \u0275\u0275text(38, " \u0420\u0430\u0439\u043E\u043D\u0438 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C (\u0420\u0412\u0417) ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      const dictDroneForces_r4 = \u0275\u0275reference(10);
      const dictGeneralInfo_r5 = \u0275\u0275reference(20);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.auth.isAuthenticated() ? 1 : 2);
      \u0275\u0275advance(4);
      \u0275\u0275property("matMenuTriggerFor", dictDroneForces_r4);
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", dictGeneralInfo_r5);
    }
  }, dependencies: [RouterLink, RouterLinkActive, MatToolbarModule, MatToolbar, MatButtonModule, MatButton, MatMenuModule, MatMenu, MatMenuItem, MatMenuTrigger], styles: ["\n\nmat-toolbar[_ngcontent-%COMP%] {\n  background: lightcyan;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.user-info[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin-right: 8px;\n  opacity: 0.8;\n}\n.active-link[_ngcontent-%COMP%] {\n  background-color: #1976d2 !important;\n  color: white !important;\n  font-weight: bold !important;\n  border-radius: 4px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n.active-link[_ngcontent-%COMP%]:hover {\n  background-color: #1565c0 !important;\n}\nbutton[matButton][_ngcontent-%COMP%]:not(.active-link):hover {\n  background-color: rgba(25, 118, 210, 0.1);\n  border-radius: 4px;\n}\n.active-menu-item[_ngcontent-%COMP%] {\n  background-color: #e3f2fd !important;\n  color: #1976d2 !important;\n  font-weight: bold !important;\n}\n.active-menu-item[_ngcontent-%COMP%]:hover {\n  background-color: #bbdefb !important;\n}\n/*# sourceMappingURL=navigator.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavigatorComponent, [{
    type: Component,
    args: [{ selector: "app-navigator", template: `
    <mat-toolbar>
      @if (auth.isAuthenticated()) {
        <button matButton [matMenuTriggerFor]="dictionaries">\u0414\u043E\u0432\u0456\u0434\u043D\u0438\u043A\u0438</button>
        <button matButton routerLink="/DocumentDataSet" routerLinkActive="active-link">
          \u0414\u0430\u043D\u0456 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0456\u0432
        </button>

        <button matButton routerLink="/templates" routerLinkActive="active-link">
          \u0428\u0430\u0431\u043B\u043E\u043D\u0438 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0456\u0432
        </button>

        <button matButton routerLink="/units" routerLinkActive="active-link">\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0438</button>
        <button matButton routerLink="/personnel" routerLinkActive="active-link">
          \u041E\u0441\u043E\u0431\u043E\u0432\u0438\u0439 \u0441\u043A\u043B\u0430\u0434
        </button>
        <button matButton routerLink="/orders" routerLinkActive="active-link">\u0420\u043E\u0437\u043F\u043E\u0440\u044F\u0434\u0436\u0435\u043D\u043D\u044F</button>
        <button matButton routerLink="/reports" routerLinkActive="active-link">\u0414\u043E\u043D\u0435\u0441\u0435\u043D\u043D\u044F</button>
        <button matButton routerLink="/users" routerLinkActive="active-link">\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456</button>

        <span class="spacer"></span>
        <span class="user-info">{{ auth.displayName() }}</span>
        <button matButton (click)="onLogout()">\u0412\u0438\u0439\u0442\u0438</button>
      } @else {
        <span class="spacer"></span>
        <button matButton routerLink="/login" routerLinkActive="active-link">\u0412\u0445\u0456\u0434 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443</button>
      }

      <mat-menu #dictionaries="matMenu">
        <button mat-menu-item [matMenuTriggerFor]="dictDroneForces">\u0421\u0438\u043B\u0438 \u0431\u0435\u0437\u043F\u0456\u043B\u043E\u0442\u043D\u0438\u0445 \u0441\u0438\u0441\u0442\u0435\u043C</button>
        <button mat-menu-item [matMenuTriggerFor]="dictGeneralInfo">\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0456</button>
      </mat-menu>

      <mat-menu #dictDroneForces="matMenu">
        <button mat-menu-item routerLink="/dictDroneTypes" routerLinkActive="active-menu-item">
          \u0422\u0438\u043F\u0438 \u0411\u041F\u041B\u0410
        </button>
        <button mat-menu-item routerLink="/dictDroneModels" routerLinkActive="active-menu-item">
          \u041C\u043E\u0434\u0435\u043B\u0456 \u0411\u041F\u041B\u0410
        </button>
        <button
          mat-menu-item
          routerLink="/dictTemplateCategories"
          routerLinkActive="active-menu-item"
        >
          \u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457 \u0448\u0430\u0431\u043B\u043E\u043D\u0456\u0432 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0456\u0432
        </button>
        <button mat-menu-item routerLink="/dictUnitTasks" routerLinkActive="active-menu-item">
          \u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432
        </button>
      </mat-menu>

      <mat-menu #dictGeneralInfo="matMenu">
        <button mat-menu-item routerLink="/dictForcesTypes" routerLinkActive="active-menu-item">
          \u0412\u0438\u0434\u0438 \u0437\u0431\u0440\u043E\u0439\u043D\u0438\u0445 \u0441\u0438\u043B
        </button>
        <button mat-menu-item routerLink="/dictPosition" routerLinkActive="active-menu-item">
          \u041F\u043E\u0441\u0430\u0434\u0438
        </button>
        <button mat-menu-item routerLink="/dictSoldierStates" routerLinkActive="active-menu-item">
          \u0421\u0442\u0430\u0442\u0443\u0441\u0438 \u043E\u0441\u043E\u0431\u043E\u0432\u043E\u0433\u043E \u0441\u043A\u043B\u0430\u0434\u0443
        </button>
        <button mat-menu-item routerLink="/dictUnitTypes" routerLinkActive="active-menu-item">
          \u0422\u0438\u043F\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432
        </button>
        <button mat-menu-item routerLink="/dictRanks" routerLinkActive="active-menu-item">
          \u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u0456 \u0437\u0432\u0430\u043D\u043D\u044F
        </button>
        <button mat-menu-item routerLink="/dictCityCategories" routerLinkActive="active-menu-item">
          \u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457 \u043E\u0431'\u0454\u043A\u0442\u0456\u0432 \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u043E-\u0442\u0435\u0440\u0438\u0442\u043E\u0440\u0456\u0430\u043B\u044C\u043D\u0438\u0445 \u043E\u0434\u0438\u043D\u0438\u0446\u044C
        </button>
        <button mat-menu-item routerLink="/dictCityCodes" routerLinkActive="active-menu-item">
          \u041A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440 \u043E\u0431'\u0454\u043A\u0442\u0456\u0432 \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u043E-\u0442\u0435\u0440\u0438\u0442\u043E\u0440\u0456\u0430\u043B\u044C\u043D\u0438\u0445 \u043E\u0434\u0438\u043D\u0438\u0446\u044C
        </button>
        <button mat-menu-item routerLink="/dictAreaTypes" routerLinkActive="active-menu-item">
          \u0422\u0438\u043F\u0438 \u0440\u0430\u0439\u043E\u043D\u0443 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C (\u0420\u0412\u0417)
        </button>
        <button mat-menu-item routerLink="/dictArea" routerLinkActive="active-menu-item">
          \u0420\u0430\u0439\u043E\u043D\u0438 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C (\u0420\u0412\u0417)
        </button>
      </mat-menu>
    </mat-toolbar>
  `, imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatMenuModule], styles: ["/* angular:styles/component:css;9b7f63ad5d396a5d0049dbb467efc71669edc311055b29e0916daf58b98a60a6;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/navigator/navigator.component.ts */\nmat-toolbar {\n  background: lightcyan;\n}\n.spacer {\n  flex: 1;\n}\n.user-info {\n  font-size: 14px;\n  margin-right: 8px;\n  opacity: 0.8;\n}\n.active-link {\n  background-color: #1976d2 !important;\n  color: white !important;\n  font-weight: bold !important;\n  border-radius: 4px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n.active-link:hover {\n  background-color: #1565c0 !important;\n}\nbutton[matButton]:not(.active-link):hover {\n  background-color: rgba(25, 118, 210, 0.1);\n  border-radius: 4px;\n}\n.active-menu-item {\n  background-color: #e3f2fd !important;\n  color: #1976d2 !important;\n  font-weight: bold !important;\n}\n.active-menu-item:hover {\n  background-color: #bbdefb !important;\n}\n/*# sourceMappingURL=navigator.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NavigatorComponent, { className: "NavigatorComponent", filePath: "navigator/navigator.component.ts", lineNumber: 137 });
})();

// src/app/app.ts
var App = class _App {
  title = signal("Menu", ...ngDevMode ? [{ debugName: "title" }] : []);
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 2, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navigator")(1, "router-outlet");
    }
  }, dependencies: [RouterOutlet, MatMenuModule, MatButtonModule, NavigatorComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [RouterOutlet, MatMenuModule, MatButtonModule, NavigatorComponent], template: "<app-navigator />\n<router-outlet />\n" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "app/app.ts", lineNumber: 13 });
})();

// src/main.ts
registerLocaleData(uk_default);
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
/*! Bundled license information:

@angular/common/locales/uk.js:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.dev/license
   *)
*/
//# sourceMappingURL=main.js.map
