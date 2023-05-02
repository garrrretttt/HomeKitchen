import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {

  account?: Account;

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.account = await this.accountService.getAccount();
  }

  onSave() {
    if (this.account) {
      this.accountService.updateAccount(this.account);
      this.router.navigate(['/account/view'])
    }
  }

}
