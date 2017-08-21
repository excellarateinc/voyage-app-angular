import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { MdSnackBar } from '@angular/material';
import { FileUploader, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { UserService } from '../../core/user/user.service';
import { User } from '../../core/user/user.model';
import { BroadcastService } from '../../core/broadcast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({});
  @ViewChild('uploaderInput') uploaderInput: any;
  profileForm: FormGroup;
  profileErrors: Array<any>;
  user: User;
  profileImage: string;
  loading = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackbar: MdSnackBar,
    private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getCurrentUser()
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
        },
        errors => this.profileErrors = errors);
  }

  initFileUpload(): void {
    this.uploader.queue = [];
    this.uploaderInput.nativeElement.click();
  }

  onProfileImageChange(image: any): void {
    this.profileImage = image;
  }

  get phones(): FormArray {
    return this.profileForm.get('phones') as FormArray;
  };

  get uploadItem(): FileItem {
    if (!this.uploader.queue.length) {
      return null;
    }
    return this.uploader.queue[0];
  }

  private initializeForm(user: User): void {
    this.profileForm = this.formBuilder.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      email: [user.email, Validators.required],
      phones: this.formBuilder.array([])
    });

    for (let i = 0; i < user.phones.length; i++) {
      this.phones.push(this.formBuilder.group({
        phoneNumber: [user.phones[i].phoneNumber, Validators.required],
        phoneType: [user.phones[i].phoneType, Validators.required]
      }));
    }
  }
}
