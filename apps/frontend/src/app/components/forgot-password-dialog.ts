import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {MatDialogRef} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-dialog',
  imports: [CommonModule,MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,FormsModule],
  templateUrl: './forgot-password-dialog.html',
  styleUrl: './forgot-password-dialog.css',
  standalone:true
})
export class ForgotPasswordDialog {
  email:string=''
  errorMessage:string=''
  successMessage:string=''

  constructor(private http:HttpClient,private dialogRef:MatDialogRef<ForgotPasswordDialog>){ }

  onCancel(){
    this.dialogRef.close()
  }

  send(){
    this.errorMessage=''
    this.successMessage=''

    this.http.post('http://localhost:3000/api/auth/forgot-password',{email:this.email})
    .subscribe({
      next:()=>{
        this.successMessage='Password reset link sent to your email'
        this.errorMessage=''
        setTimeout(() => this.dialogRef.close(), 2000);
      },
      error:(err)=>{
        this.errorMessage= err.error.message || 'Failed to send reset link'
      }
    })
  }
}
