import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule,FormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit{
  token:string=''
  newpassword:string=''
  success:string=''
  error:string=''

  constructor(private http:HttpClient, private router : Router, private route:ActivatedRoute){}

  ngOnInit() {
   this.token = this.route.snapshot.queryParamMap.get('token') || ''
   if(!this.token){
    this.error='Invalid or expired token'
   }
  }

  submit(){
    this.http.post('http://localhost:3000/api/auth/reset-password',{token:this.token,newpassword:this.newpassword})
    .subscribe({
      next:()=>{
        this.success='Password reset successfully. redirecting to login..'
        setTimeout(() => {
          this.router.navigate(['/auth']);
        }, 2000);
      },
      error:(err)=>{
        this.error=err.error.message || 'Failed to reset password'
      }
    })
  }
}
