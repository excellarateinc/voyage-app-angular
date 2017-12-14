import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RandomStringService } from '../../services/random-string.service';
import { MembersService } from "../members.service";

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  public opened: boolean = false;
  private show: boolean = false;
  private member: any;

  constructor(private randomStringService: RandomStringService, private membersService: MembersService) {
  }

  @Output() onSubmitOrCancel = new EventEmitter();

  ngOnInit() {
    this.member = new FormGroup({
      'first_name': new FormControl('', Validators.required),
      'last_name': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required),
      'date_of_birth': new FormControl(null, Validators.required),
      'mobile_no': new FormControl('', Validators.compose([Validators.required])),
      'address': new FormControl('', Validators.required),
      'email': new FormControl('',
        Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])),
      'occupation': new FormControl('', Validators.required),
      'password': new FormControl()
    });
  }


  public open() {
    this.opened = true;
  }

  public close() {
    this.member.reset();
    this.show = false;
    this.onSubmitOrCancel.emit({'type': 'close'});
  }

  public async save() {
    this.member.controls['password'].setValue(this.randomStringService.randomString());
    const isSaved = await this.membersService.addMember(this.member.value);
    if (isSaved['status'] === 'failure') {
      this.show = true;
    } else {
      this.onSubmitOrCancel.emit({'type': 'save', 'memberObj': this.member});
      this.member.reset();
    }
  }
}
