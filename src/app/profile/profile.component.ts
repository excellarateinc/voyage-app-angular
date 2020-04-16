import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../core/user/user.service';
import { User } from '../core/user/user.model';
import { BroadcastService } from '../core/broadcast.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileErrors: any[] = [];
  user: User;
  profileImage: string;
  loading = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getCurrentUser(true)
      .subscribe(user => {
        this.user = user;
        this.initializeForm(user);
        this.loading = false;
      });
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }
    this.profileErrors = [];
    const profile = this.profileForm.value as User;
    if (this.profileImage != null) {
      profile.profileImage = this.profileImage;
    }
    this.userService.updateProfile(profile)
      .subscribe(
        user => {
          this.user = user;
          this.broadcastService.emitProfileUpdated(this.user);
          this.snackbar.open('Profile updated successfully', null, { duration: 5000 });
          this.resetPasswordFields();
        },
        response => this.profileErrors = response.error);
  }

  onProfileImageChanged(image: any): void {
    this.profileImage = image;
  }

  get phones(): FormArray {
    return this.profileForm.get('phones') as FormArray;
  }

  private initializeForm(user: User): void {
    this.profileForm = this.formBuilder.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      email: [user.email, Validators.required],
      currentPassword: [''],
      newPassword: [''],
      confirmNewPassword: [''],
      phones: this.formBuilder.array([])
    });

    user.phones.forEach(phone => {
      this.phones.push(this.formBuilder.group({
        phoneNumber: [phone.phoneNumber, Validators.required],
        phoneType: 'Mobile'
      }));
    });

    this.profileForm.get('newPassword').valueChanges.subscribe(value => {
      if (value) {
        this.profileForm.get('currentPassword').setValidators([Validators.required]);
        this.profileForm.get('confirmNewPassword').setValidators([ConfirmPasswordValidator.MatchPassword]);
        this.profileForm.get('currentPassword').updateValueAndValidity();
        this.profileForm.get('confirmNewPassword').updateValueAndValidity();
      } else {
        this.profileForm.get('currentPassword').clearValidators();
        this.profileForm.get('confirmNewPassword').clearValidators();
        this.profileForm.get('currentPassword').updateValueAndValidity();
        this.profileForm.get('confirmNewPassword').updateValueAndValidity();
      }
    });
  }

  private resetPasswordFields(): void {
    this.profileForm.get('currentPassword').setValue(null);
    this.profileForm.get('newPassword').setValue(null);
    this.profileForm.get('confirmNewPassword').setValue(null);
    this.profileForm.get('currentPassword').clearValidators();
    this.profileForm.get('newPassword').clearValidators();
    this.profileForm.get('confirmNewPassword').clearValidators();
  }
}
