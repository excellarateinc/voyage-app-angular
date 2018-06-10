import { FormBuilder } from '@angular/forms';

import { ConfirmPasswordValidator } from './confirm-password.validator';

describe('ConfirmPasswordValidator', () => {
  const builder = new FormBuilder();
  const form = builder.group({
    newPassword: [''],
    confirmNewPassword: ['', ConfirmPasswordValidator.MatchPassword]
  });

  it('should return an error if confirm password does not match', () => {
    form.get('newPassword').setValue('password');
    const confirmPassword = form.get('confirmNewPassword');
    confirmPassword.setValue('password1');
    expect(confirmPassword.errors).toEqual({ matchPassword: true });
  });

  it('should return null if confirm password matches', () => {
    form.get('newPassword').setValue('password');
    const confirmPassword = form.get('confirmNewPassword');
    confirmPassword.setValue('password');
    expect(confirmPassword.errors).toBeNull();
  });
});
