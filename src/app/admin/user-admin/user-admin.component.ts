import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../core/user/user.model';
import { UserStatus } from '../../core/user/user-status.model';
import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  users: Array<User>;
  selectedUser: User;

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(result => this.users = result);
  }

  onToggle(): void {
    const userStatus = new UserStatus();
    userStatus.isActive = this.selectedUser.isActive;
    userStatus.isVerifyRequired = this.selectedUser.isVerifyRequired;
    this.userService.toggleStatus(this.selectedUser.id, userStatus)
      .subscribe(result => {
        this.snackBar.open('User updated successfully', null, { duration: 5000 });
      }, error => {
        this.snackBar.open(error[0].errorDescription, null, { duration: 5000 });
      });
  }
}
