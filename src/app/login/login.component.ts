import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Meal } from '../meal';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) { }

  signupObj: any = {
    userName: '',
    email: '',
    password: ''
  };
  loginObj: any = {
    userName: '',
    password: ''
  };

  onSignUp(): void {
    let newAccount = {
      username: this.signupObj.userName,
      password: this.signupObj.password,
    } as unknown as Account;
    this.accountService.addAccount(newAccount).subscribe(() => {
      this.signupObj.userName = '';
      this.signupObj.password = '';
      this.signupObj.email = '';
    })
  }

  onLogin() {
    this.accountService.getAccounts().subscribe((users: Account[]) => {
      for (var user of users) {
        if (user.username == this.loginObj.userName && user.password == this.loginObj.password) {
          this.accountService.setActiveUser(user.id);
          this.router.navigate(['/home']);
        }
      }
    });
  }

}
