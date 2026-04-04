import {
  Router
} from "./chunk-O3M7BV3X.js";
import {
  HttpClient,
  Injectable,
  catchError,
  computed,
  inject,
  map,
  of,
  setClassMetadata,
  signal,
  tap,
  ɵɵdefineInjectable
} from "./chunk-CK6AJVHQ.js";

// src/app/auth/auth.service.ts
var AuthService = class _AuthService {
  api = "/api/account";
  gql = "/graphql";
  http = inject(HttpClient);
  router = inject(Router);
  /** Поточний авторизований користувач */
  user = signal(null, ...ngDevMode ? [{ debugName: "user" }] : []);
  /** Поточний JWT токен */
  token = signal(localStorage.getItem("auth_token"), ...ngDevMode ? [{ debugName: "token" }] : []);
  /** Стан очікування 2FA (зберігаємо UserId) */
  pendingTwoFactor = signal(null, ...ngDevMode ? [{ debugName: "pendingTwoFactor" }] : []);
  /** Режим 2FA (soft/strict) витягнутий з токену */
  twoFactorMode = signal("strict", ...ngDevMode ? [{ debugName: "twoFactorMode" }] : []);
  /** Чи авторизований користувач повністю */
  isAuthenticated = computed(() => this.user() !== null && !this.requiresTwoFactor(), ...ngDevMode ? [{ debugName: "isAuthenticated" }] : []);
  /** Чи очікує користувач на 2FA верифікацію */
  requiresTwoFactor = computed(() => this.pendingTwoFactor() !== null, ...ngDevMode ? [{ debugName: "requiresTwoFactor" }] : []);
  /** Ролі поточного користувача */
  roles = computed(() => this.user()?.roles ?? [], ...ngDevMode ? [{ debugName: "roles" }] : []);
  constructor() {
    const savedToken = localStorage.getItem("auth_token");
    if (savedToken) {
      this.token.set(savedToken);
      this.trySetPendingFromToken(savedToken);
    }
  }
  trySetPendingFromToken(token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.requiresTwoFactor === "true" || payload.requiresTwoFactor === true) {
        this.pendingTwoFactor.set({ userId: payload.sub });
        this.twoFactorMode.set(payload.twoFactorMode === "soft" ? "soft" : "strict");
      }
    } catch {
    }
  }
  /** Крок 1: Вхід за логіном/паролем (через GraphQL Mutation) */
  login(dto) {
    const query = `
      mutation Login($userName: String!, $password: String!) {
        login(userName: $userName, password: $password) {
          token
          requiresTwoFactor
          userId
          user {
            id
            userName
            email
            lastLoginDate
            requirePasswordChange
            lastPasswordChangeDate
            roles
            soldier {
              id
              firstName
              lastName
              midleName
              unitId
              rankId
            }
          }
        }
      }
    `.trim();
    return this.http.post(this.gql, {
      query,
      variables: { userName: dto.userName, password: dto.password }
    }).pipe(map((res) => {
      if (!res.data?.login) {
        throw new Error("Authentication failed");
      }
      return res.data.login;
    }), tap((payload) => {
      if (payload.token) {
        this.setToken(payload.token);
      }
      if (payload.requiresTwoFactor) {
        this.pendingTwoFactor.set({ userId: payload.userId });
      } else if (payload.user) {
        this.user.set(payload.user);
        this.pendingTwoFactor.set(null);
      }
    }));
  }
  /** Крок 2: Підтвердження TOTP-коду (через GraphQL Mutation) */
  verifyTwoFactor(code) {
    const query = `
      mutation Verify($code: String!) {
        verifyTwoFactor(code: $code) {
          token
          requiresTwoFactor
          userId
          user {
            id
            userName
            email
            lastLoginDate
            requirePasswordChange
            lastPasswordChangeDate
            roles
            soldier {
              id
              firstName
              lastName
              midleName
              unitId
              rankId
            }
          }
        }
      }
    `.trim();
    return this.http.post(this.gql, {
      query,
      variables: { code }
    }).pipe(map((res) => {
      if (!res.data?.verifyTwoFactor) {
        return { token: null, requiresTwoFactor: false, userId: null, user: null };
      }
      return res.data.verifyTwoFactor;
    }), tap((payload) => {
      if (payload.token && !payload.requiresTwoFactor) {
        this.setToken(payload.token);
        this.user.set(payload.user);
        this.pendingTwoFactor.set(null);
      }
    }));
  }
  setToken(token) {
    this.token.set(token);
    localStorage.setItem("auth_token", token);
    this.trySetPendingFromToken(token);
  }
  /** ПІБ для відображення */
  displayName = computed(() => {
    const u = this.user();
    if (!u?.soldier) {
      return u?.userName ?? "";
    }
    const s = u.soldier;
    return [s.rankShortValue, s.firstName, s.lastName].filter(Boolean).join(" ");
  }, ...ngDevMode ? [{ debugName: "displayName" }] : []);
  /** Вихід з системи */
  logout() {
    localStorage.removeItem("auth_token");
    this.token.set(null);
    this.user.set(null);
    this.pendingTwoFactor.set(null);
    this.router.navigate(["/login"]);
    return of(void 0);
  }
  /** Перевірити поточну сесію */
  checkSession() {
    const token = this.token();
    if (!token) {
      this.user.set(null);
      return of(null);
    }
    try {
      const jwtPayload = JSON.parse(atob(token.split(".")[1]));
      if (jwtPayload["requiresTwoFactor"] === "true" || jwtPayload["requiresTwoFactor"] === true) {
        return of(null);
      }
    } catch {
    }
    if (this.requiresTwoFactor()) {
      return of(null);
    }
    return this.http.get(`${this.api}/me`).pipe(tap((user) => this.user.set(user)), catchError(() => {
      this.logout();
      return of(null);
    }));
  }
  /** Чи має користувач роль */
  hasRole(...roles) {
    const userRoles = this.roles();
    return roles.some((r) => userRoles.includes(r));
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-BPVAGNWP.js.map
