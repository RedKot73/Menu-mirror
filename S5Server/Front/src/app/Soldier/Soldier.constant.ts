export const SoldierStatusIds = {
  KILLED: '00000000-0000-0000-0000-000000000200', // 200 Вбито
  WOUNDED: '00000000-0000-0000-0000-000000000300', // 300 Поранено
  DESERTER: '00000000-0000-0000-0000-000000000500', // 500 СЗЧ/Відмова
  MISSING: '00000000-0000-0000-0000-000000000600', // 600 Зниклий безвісти
  CAPTURED: '00000000-0000-0000-0000-000000000800', // 800 В полоні
  RELEASED_FROM_CAPTIVITY: '00000000-0000-0000-0000-000000001000', // 1000 Звільнено з полону
} as const;

/**
 * Перевіряє чи статус є критичним (загиблий)
 */
export function isCriticalStatus(stateId: string): boolean {
  return stateId === SoldierStatusIds.KILLED || stateId === SoldierStatusIds.WOUNDED;
}

/**
 * Перевіряє чи статус є тяжким (поранений, в полоні тощо)
 */
export function isSevereStatus(stateId: string): boolean {
  return (
    stateId === SoldierStatusIds.WOUNDED ||
    stateId === SoldierStatusIds.MISSING ||
    stateId === SoldierStatusIds.CAPTURED
  );
}

/**
 * Перевіряє чи статус є проблемним (дезертир, капітуляція)
 */
export function isProblematicStatus(stateId: string): boolean {
  return stateId === SoldierStatusIds.DESERTER;
}

/**
 * Перевіряє чи статус є позитивним (повернення з полону)
 */
export function isRecoveryStatus(stateId: string): boolean {
  return stateId === SoldierStatusIds.RELEASED_FROM_CAPTIVITY;
}
