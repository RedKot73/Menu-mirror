/** Модели аутентификации — соответствуют серверным DTO */

import { SoldierDto } from '../../ServerService/soldier.service';

export interface LoginDto {
  userName: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginTwoFactorDto {
  userId: string;
  code: string;
  rememberMe?: boolean;
}

export interface TwoFactorLoginResponse {
  requiresTwoFactor: boolean;
  userId: string;
  rememberMe: boolean;
}

export interface AuthUser {
  id: string;
  userName: string;
  email: string;
  soldierId: string;
  lastLoginDate: string | null;
  requirePasswordChange: boolean;
  lastPasswordChangeDate: string | null;
  roles: string[];
  soldier?: SoldierDto;
  // TODO: RE-ENABLE 2FA BEFORE PRODUCTION
  debugMessage?: string;
  token?: string;
}

export interface AuthPayload {
  token: string | null;
  requiresTwoFactor: boolean;
  needs2FASetup?: boolean;
  userId: string | null;
  user: AuthUser | null;
}

export interface GqlResponse<T> {
  data: T;
  errors?: any[];
}

