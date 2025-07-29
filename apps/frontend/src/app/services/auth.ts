import { Injectable } from '@angular/core';

const TOKEN_KEY='auth_key';
const TOKEN_EXPIRY_KEY='auth_key_expiry'

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private token:string | null=null

  constructor(){
    this.loadToken()
  }

  private loadToken(){
    const token=localStorage.getItem(TOKEN_KEY)
    const expiry=localStorage.getItem(TOKEN_EXPIRY_KEY)

    if(token && expiry){
      const now=new Date().getTime()
      if(now<+expiry){
        this.token=token
      }else{
        this.logout()
      }
    }
  }

  isLoggedIn():boolean{
    return this.token!==null
  }

  getToken():string| null{
    return this.token
  }

  login(token:string){
    this.token=token
    const expiry=new Date().getTime()+8*60*60*1000 
    localStorage.setItem(TOKEN_KEY,token)
    localStorage.setItem(TOKEN_EXPIRY_KEY,expiry.toString())
  }

  logout(){
    this.token=null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(TOKEN_EXPIRY_KEY)
  }
  
}
