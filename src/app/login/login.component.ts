import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading :boolean =false;

  forgetFlag :boolean =true;
  verifyFlag :boolean =false;
  newPassFlag :boolean =false;

  errMessage! : string;

    constructor(private _AuthService: AuthService , private _Router:Router) {}

  loginForm : FormGroup =new  FormGroup ({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z].{6}/)])
  },)
// *****************1form***************
  forgetform : FormGroup =new  FormGroup({
    email : new FormControl(null , [Validators.required,Validators.email])
  });

  // *****************2form***************
  verifyform:FormGroup=new FormGroup({
    resetCode: new FormControl(null , [Validators.required])
  });

  // *****************3form***************
  newPasswordform:FormGroup=new  FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z].{6}/)])
  });



  loginsubmitMethod(){
    this.isLoading=true;

  this._AuthService.loginAPI(this.loginForm.value).subscribe({
  next:(res)=> {console.log(res);
    this.isLoading=false;
if(res.message=="success"){

localStorage.setItem("userToken",res.token);
this._AuthService.saveDataMethod();
this._Router.navigate(['/home']);

}
else{
    this._Router.navigate(['/login']);}
  } ,
  error : (err)=>{console.log(err.error.message);
    this.errMessage=err.error.message;
    this.isLoading=false;},
  })

  }

  forgetsubmitMethod(){
    this.isLoading=true;

  this._AuthService.forgetAPI(this.forgetform.value).subscribe({
  next:(res)=> {console.log(res);
    this.isLoading=false;
if(res.message){

  this.forgetFlag=false;
  this.verifyFlag=true;

}


  } ,
  error : (err)=>{console.log(err.error.message);
    this.errMessage=err.error.message;
    this.isLoading=false;},
  })

  }
  verifysubmitMethod(){
    this.isLoading=true;

  this._AuthService.verifyAPI(this.verifyform.value).subscribe({
  next:(res)=>{
    this.isLoading=false;
if(res.status == "success"){

  this.verifyFlag = false;
  this.newPassFlag = true;


}
  } ,
  error : (err)=>{console.log(err.error.message);
    this.errMessage=err.error.message;
    this.isLoading=false;
  },
  })

  }
  newPasssubmitMethod(){
    this.isLoading=true;

  this._AuthService.newPassAPI(this.newPasswordform.value).subscribe({
  next:(res)=> {
    this.isLoading=false;
if(res.token){

  console.log("new pass tmam");

}


  } ,
  error : (err)=>{console.log(err.error.message);
    this.errMessage=err.error.message;
    this.isLoading=false;
  },
  })

  }
}
