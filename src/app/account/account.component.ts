import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {

  account?: Account;
  user?: Account

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.user = await this.accountService.getAccount();
    const id = String(this.route.snapshot.paramMap.get('id'));
    if (id != 'null') {
      this.account = await this.accountService.getAccount(id);
    }
    else {
      this.account = await this.accountService.getAccount();
    }
  }

  onEdit() {
    this.router.navigate(['/account/edit'])
  }

  averageRatings(ratings: number[]): number {
    let total: number = 0;
    for (let rating of ratings) {
      total += rating;
    }
    return total / ratings.length;
  }

}
