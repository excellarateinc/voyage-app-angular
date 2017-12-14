import { Component, OnInit } from '@angular/core';

import { MembersService } from "./members.service";
import {ResponseObjectToJsonParserService} from "../services/response-object-to-json-parser.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  public members: any;
  public membersList: any;
  public opened: boolean = false;
  public openEdit: boolean = false;
  public confirmDelete: boolean = false;
  public subscriber_id: any;
  public memberEditData: any;

  constructor(private membersService: MembersService, private responseObjectToJsonParserService: ResponseObjectToJsonParserService) {
  }

  async ngOnInit() {
    const membersList = await this.membersService.getMembersList();
    this.membersList = this.responseObjectToJsonParserService.parseResponseObjectToJson(membersList);
    this.members = this.membersList;
  }

  public open() {
    this.opened = true;
  }

  public async saveOrCancel(event) {
    this.opened = false;
    if (event.type === 'save') {
      const membersList = await this.membersService.getMembersList();
      this.membersList = this.responseObjectToJsonParserService.parseResponseObjectToJson(membersList);
      this.members = this.membersList;
    }
  }

  public updateOrCancel(event) {
    this.openEdit = false;
    if (event.type === 'save') {
      const memberObj = event.memberObj.value;
      debugger;
      const rmMemIdx = this.membersList.findIndex(item => item.subscriber_id === memberObj.subscriber_id);
      this.membersList[rmMemIdx].first_name = memberObj.first_name;
      this.membersList[rmMemIdx].last_name = memberObj.last_name;
      this.membersList[rmMemIdx].mobile_no = memberObj.mobile_no;
      this.membersList[rmMemIdx].address = memberObj.address;
      this.membersList[rmMemIdx].email = memberObj.email;
      this.membersList[rmMemIdx].occupation = memberObj.occupation;
      this.members = this.membersList;
    }
  }

  public removeMember(dataItem): void {
    this.confirmDelete = true;
    this.subscriber_id = dataItem.subscriber_id;
  }

  public close() {
    this.confirmDelete = false;
  }

  public async deleteMember() {
    let isRemoved = await this.membersService.removeMember(this.subscriber_id);
    isRemoved = this.responseObjectToJsonParserService.parseResponseObjectToJson(isRemoved);
    if (isRemoved['status'] === 'success') {
      this.membersList = await this.membersService.getMembersList();
      this.members =this.responseObjectToJsonParserService.parseResponseObjectToJson(this.membersList);
    } else {
      alert('Deleting member details is not successful. Please try again.');
    }
    this.confirmDelete = false;
  }

  public editMember(dataItem) {
    this.memberEditData = Object.assign({}, dataItem);
    this.openEdit = true;
  }
}
