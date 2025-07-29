import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../services/auth';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialog } from './forgot-password-dialog';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'],
})
export class AuthComonent {
  isLogin=true
  name=''
  email=''
  password=''
  errorMessage=''

  constructor(private http:HttpClient, private auth: Auth, private router:Router, private dialog:MatDialog){}

  toggle(){
    this.isLogin=!this.isLogin
    this.errorMessage=''
  }

  openresetDialog(){
    this.dialog.open(ForgotPasswordDialog,{
      width:'400px'
    })
  }

  submit(){
    this.errorMessage=''
    if(this.isLogin){
      this.http.post<{access_token:string}>('http://localhost:3000/api/auth/login',{
        email:this.email,
        password:this.password
      }).subscribe({
        next:(res)=>{
          this.auth.login(res.access_token)
          this.router.navigate(['/shop'])
        },
        error:(err)=>{
          this.errorMessage=err.error.message || 'Login failed'
        }
      })
    }else{
      this.http.post('http://localhost:3000/api/auth/signup',{
        name:this.name,
        email:this.email,
        password:this.password
      }).subscribe({next:()=>{this.isLogin=true},error:(err)=>{this.errorMessage=err.error.message || 'Signup failed'}});
      
    }
  }
}
