import { Component, Input } from '@angular/core';
import { Rating } from '../rating';
import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

  @Input() rating?: Rating;
  raterAccount?: Account;

  constructor(
    private accountService: AccountService,
  ){}

    ngOnInit(){
      if(this.rating){
        this.accountService.getAccount(this.rating.raterUid).then(account => {
          this.raterAccount = account;
        });
      }
    }

}
