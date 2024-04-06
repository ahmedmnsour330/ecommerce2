import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


interface accountDataInterface{
  name? : string;
  email:string;
  password:string;
  rePassword? : string;
  phone?:string;
  resetCode?:string;
  newPassword?:string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDatevar : BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    if(localStorage.getItem("currentPage")){
      _Router.navigate([localStorage.getItem('currentPage')]);
    }


  }

  registerAPI(rData:accountDataInterface):Observable<any>

{
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,rData)
}


loginAPI(rData:accountDataInterface):Observable<any>

{
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,rData)
}

forgetAPI(rData:accountDataInterface):Observable<any>

{
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,rData)
}

verifyAPI(rData:accountDataInterface):Observable<any>

{
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,rData)
}

newPassAPI(rData:accountDataInterface):Observable<any>

{
  return this._HttpClient.put (`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,rData)
}


saveDataMethod(){
  if(localStorage.getItem("userToken") !=null){
    this.userDatevar.next(localStorage.getItem("userToken"));
    this.userDatevar.next(jwtDecode(this.userDatevar.getValue()));


  }
  else{
    this.userDatevar.next(null)
  }

}
}
