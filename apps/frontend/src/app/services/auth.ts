import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const TOKEN_KEY = 'auth_key';
const TOKEN_EXPIRY_KEY = 'auth_key_expiry'

@Injectable({
  providedIn: 'root'
})
export class Auth {

  name:string=''
  private token: string | null = null

  constructor(private http: HttpClient, private router:Router) {
    this.loadToken()
  }

  private loadToken() {
    const token = localStorage.getItem(TOKEN_KEY)
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY)

    if (token && expiry) {
      const now = new Date().getTime()
      if (now < +expiry) {
        this.token = token
      } else {
        this.logout()
      }
    }
  }

  isLoggedIn(): boolean {
    return this.token !== null
  }

  getToken(): string | null {
    return this.token
  }

  login(token: string) {
    this.token = token
    const expiry = new Date().getTime() + 8 * 60 * 60 * 1000
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString())
  }

  logout() {
    this.token = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(TOKEN_EXPIRY_KEY)
  }

  updateProfile(name:string,password:string) {
    this.http.patch<{ access_token: string }>('http://localhost:3000/api/users/me', {name, password }, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    })
      .subscribe({
        next: () => {
          alert('User Updated successfully')
        },
        error: (err) => {
          console.error(err)
          alert('Error updating user')
        }
      })
  }

  deleteProfile() {
    this.http.delete<{ access_token: string }>('http://localhost:3000/api/users/me', {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    })
      .subscribe({
        next: () => {
          alert('User deleted successfully')
          this.logout()
          this.router.navigate(['/auth'])
        },
        error: (err) => {
          console.error(err)
          alert('Error deleting user')
        }
      })
  }

  loadData():Observable<{name:string}>{
    return this.http.get<{name:string}>('http://localhost:3000/api/users/me',{
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    })
  }

}
