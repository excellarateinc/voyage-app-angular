import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export class ConfirmPasswordValidator {
  static MatchPassword(control: AbstractControl): ValidationErrors | null {
    const form = control.parent as FormGroup;
    const newPassword = form.get('newPassword').value;
    const confirmPassword = form.get('confirmNewPassword').value;
    if (!confirmPassword || newPassword !== confirmPassword) {
      return { matchPassword: true };
    } else {
      return null;
    }
  }
}
