import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalAccountService } from '../global-account.service';
import { User } from '../users';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

constructor(private globalAccountService:
   GlobalAccountService){}

signupUsers: GlobalAccountService[] = [];

//constructor(){}


signupObj:any = {
  userName: ' ',
  email: ' ',
  password: ' '
};
loginObj: any = {
  userName: ' ',
  password: ' '
};


ngOnInit(): void {

  const localData = localStorage.getItem('signuUpUswes');
  if(localData != null){
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

onSignUp2(): void{
  this.globalAccountService.getUsers().subscribe
  (users => this.signupObj = users);
  this.signupObj = {
    userName: ' ',
    email: ' ',
    password: ' '
  };
}

// onLogin(){

//   const isUserExist = this.signupUsers.find(m => m.userName == 
//     this.loginObj.userName && m.password == this.loginObj.password);
//   if(isUserExist != undefined){
//     alert('User Login Successfully');

//   } else { alert('Wrong Credentials') }
// }

onLogin2(){

this.globalAccountService.getUsers().subscribe(
  
)

}

}
