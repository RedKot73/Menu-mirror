/** Модели аутентификации — соответствуют серверным DTO */

import { SoldierDto } from '../../ServerService/soldier.service';

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
  requirePasswordChange: boolean;
  lastPasswordChangeDate: string | null;
  roles: string[];
  soldier?: SoldierDto;
}
