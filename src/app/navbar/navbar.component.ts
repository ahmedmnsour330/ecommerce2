import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit{
cartItemNumbNav:string= '';

isLogin:boolean=false;

constructor(private _CartService:CartService , private _AuthService:AuthService , private _Router :Router) {}

ngOnInit(): void {
this._CartService.cartItemsNumbers.subscribe(()=> {

  this.cartItemNumbNav = this._CartService.cartItemsNumbers.getValue()
})


this._AuthService.userDatevar.subscribe(()=>{

if(this._AuthService.userDatevar.getValue() == null)
{
  this.isLogin = false;
}
else{
  this.isLogin = true;

}

})
}
logout(){
  localStorage.removeItem("userToken");
  this._AuthService.saveDataMethod();
  this._Router.navigate(['/login']);

}

}
