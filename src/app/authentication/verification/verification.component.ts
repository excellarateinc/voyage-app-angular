import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificationService } from './verification.service';
import { Verification } from './verification.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  verificationForm: FormGroup;
  codeSent = false;
  verificationFailed = false;

  constructor(
    private formBuilder: FormBuilder,
    private verificationService: VerificationService,
    private router: Router) { }

  ngOnInit() {
    this.initializeForm();
  }

  sendCode(): void {
    this.verificationService.sendCode()
      .subscribe(result => {
        this.codeSent = true;
      });
  }

  verify(): boolean {
    if (this.verificationForm.invalid) {
      return;
    }

    const verification = this.verificationForm.value as Verification;
    this.verificationService.verify(verification)
      .subscribe(result => {
        this.router.navigate(['/dashboard']);
      }, () => {
        this.verificationFailed = true;
      });
  }

  private initializeForm(): void {
    this.verificationForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }
}
