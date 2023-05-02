import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { Account } from '../account';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  userId?: string;

  constructor(
    private accountService: AccountService,
    private router: Router,
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
    ratings: {
      Diner: [],
      Chef: []
    },
    username: '',
    password: '',
    mealsCreated: [],
    mealsBooked: []
  }

  onSubmit() {
    if (this.userId) {
      this.account['uid'] = this.userId;
      this.accountService.createAccount(this.account);
      this.router.navigate(['/home']);
    }
  }

}
