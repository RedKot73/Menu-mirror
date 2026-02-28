/** Модели аутентификации — соответствуют серверным DTO */

export interface LoginDto {
  userName: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthUser {
  id: string;
  userName: string;
  email: string;
  soldierId: string;
  lastLoginDate: string | null;
  roles: string[];
  soldier?: {
    id: string;
    firstName: string;
    midleName: string;
    lastName: string;
    rank: string | null;
    position: string | null;
    unit: string | null;
  };
}
