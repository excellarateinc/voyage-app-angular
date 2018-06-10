import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export class ConfirmPasswordValidator {
  static MatchPassword(confirmNewPasswordControl: AbstractControl): ValidationErrors | null {
    const form = confirmNewPasswordControl.parent as FormGroup;
    if (!form) {
      return null;
    }
    const newPassword = form.get('newPassword').value;
    const confirmPassword = confirmNewPasswordControl.value;
    if (!confirmPassword || newPassword !== confirmPassword) {
      return { matchPassword: true };
    } else {
      return null;
    }
  }
}
