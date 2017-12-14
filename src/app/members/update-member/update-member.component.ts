import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MembersService } from "../members.service";

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.scss']
})
export class UpdateMemberComponent implements OnInit {

  private show: boolean = false;
  private member: any;

  constructor(private membersService: MembersService) {
  }

  @Input() memberDetails: any;
  @Output() onUpdateOrCancel = new EventEmitter();

  ngOnInit() {
    this.member = new FormGroup({
      'first_name': new FormControl('', Validators.required),
      'last_name': new FormControl('', Validators.required),
      'mobile_no': new FormControl('', Validators.compose([Validators.required])),
      'address': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.compose([Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])),
      'occupation': new FormControl('', Validators.required),
      'subscriber_id': new FormControl()
    });
  }

  public close() {
    this.member.reset();
    this.show = false;
    this.onUpdateOrCancel.emit({'type': 'close'});
  }


  public async update() {
    this.member.controls['subscriber_id'].setValue(this.memberDetails.subscriber_id);
    const isSaved = await this.membersService.updateMember(this.member.value);
    if (isSaved['status'] === 'failure') {
      this.show = true;
    } else {
      this.onUpdateOrCancel.emit({'type': 'save', 'memberObj': this.member});
      this.member.reset();
    }
  }
}
