import { Directive, ElementRef, HostListener, inject } from '@angular/core';

/**
 * Директива для маски вводу дати у форматі dd.mm.yyyy
 * Автоматично додає крапки після дня та місяця.
 * Працює з Angular Material Datepicker.
 *
 * Використання:
 * <input matInput appDateMask [matDatepicker]="picker" ... />
 */
@Directive({
  selector: '[appDateMask]',
  standalone: true,
})
export class DateMaskDirective {
  private el = inject(ElementRef<HTMLInputElement>);

  @HostListener('input', ['$event'])
  onInput(_event: Event): void {
    const input = this.el.nativeElement;
    const value = input.value;

    // Видаляємо все, крім цифр
    let digits = value.replace(/\D/g, '');

    // Обмежуємо до 8 цифр (ddmmyyyy)
    if (digits.length > 8) {
      digits = digits.substring(0, 8);
    }

    // Форматуємо з крапками
    let formatted = '';
    if (digits.length > 0) {
      formatted = digits.substring(0, Math.min(2, digits.length));
    }
    if (digits.length > 2) {
      formatted += '.' + digits.substring(2, Math.min(4, digits.length));
    }
    if (digits.length > 4) {
      formatted += '.' + digits.substring(4, 8);
    }

    // Оновлюємо значення тільки якщо воно змінилось
    if (input.value !== formatted) {
      const cursorPos = input.selectionStart || 0;
      const lengthDiff = formatted.length - value.length;
      input.value = formatted;

      // Коригуємо позицію курсора
      const newPos = Math.max(0, cursorPos + lengthDiff);
      input.setSelectionRange(newPos, newPos);

      // Dispatch input event для Angular
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Дозволяємо: Backspace, Delete, Tab, Escape, Enter, стрілки, Home, End
    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
    ];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    // Дозволяємо Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (event.ctrlKey && ['a', 'c', 'v', 'x', 'z'].includes(event.key.toLowerCase())) {
      return;
    }

    // Блокуємо все, крім цифр
    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }

    // Блокуємо, якщо вже 10 символів (dd.mm.yyyy) і немає виділення
    const input = this.el.nativeElement;
    if (
      input.value.length >= 10 &&
      input.selectionStart === input.selectionEnd &&
      /^\d$/.test(event.key)
    ) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(_event: ClipboardEvent): void {
    // Paste обробляється через onInput після вставки
  }
}
