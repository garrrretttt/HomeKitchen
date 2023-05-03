import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { Account } from '../account';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  userId?: string;

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this.formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  constructor(
    private accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.userId = this.accountService.getUid();
  }

  account: Account = {
    uid: '',
    first: '',
    last: '',
    isChef: false,
    bio: '',
    dietaryRestrictions: [],
    profilePicture: '',
    ratings: [],
    mealsBooked: [],
    mealsCreated: []
  }

  onSubmit() {
    if (this.userId) {
      this.account.uid = this.userId;
      this.accountService.createAccount(this.account);
      this.router.navigate(['/home']);
    }
  }

}
