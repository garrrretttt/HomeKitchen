import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../account';
import { GlobalAccountService } from '../global-account.service';
import { Meal } from '../meal';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private globalAccountService:
    GlobalAccountService,
    private router: Router

  ) { }

  signupUsers: GlobalAccountService[] = [];

  //constructor(){}


  signupObj: any = {
    userName: '',
    email: '',
    password: ''
  };
  loginObj: any = {
    userName: '',
    password: ''
  };


  ngOnInit(): void {

    const localData = localStorage.getItem('signuUpUswes');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }

  }
  // onSignUp(){

  // this.signupUsers.push(this.signupObj);
  // localStorage.setItem('signUpUsers', 
  // JSON.stringify(this,this.signupUsers));
  // this.signupObj = {
  //   userName: ' ',
  //   email: ' ',
  //   password: ' '
  // };
  // }

  onSignUp2(): void {
    let newAccount = {
      //isChef: false,
      //name: '',
      //dietaryRestrictions: [],
      //bio: '',
      //profilePicture: '',
      //ratings: {'Diner': [], 'Chef': []},
      username: this.signupObj.userName,
      password: this.signupObj.password,
    } as unknown as Account
    this.globalAccountService.addAccount(newAccount)
  }

  // onLogin(){

  //   const isUserExist = this.signupUsers.find(m => m.userName == 
  //     this.loginObj.userName && m.password == this.loginObj.password);
  //   if(isUserExist != undefined){
  //     alert('User Login Successfully');

  //   } else { alert('Wrong Credentials') }
  // }

  onLogin2() {
    this.globalAccountService.getUsers().subscribe(users => {
      console.log('got it');
      for (var user of users) {
        console.log(user.username);
        if (user.username == this.loginObj.userName && user.password == this.loginObj.password) {
          this.globalAccountService.setActiveUser(user.id);
          this.router.navigate(['/home']);
        }
      }
    });
  }

}
