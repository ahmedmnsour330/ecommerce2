import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

import { Product } from '../product';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
cartItems:any=[];

totalPrice:string ="";

cartTd:string ="";

  constructor(private _toastEvokeService: ToastEvokeService,private _CartService:CartService ){}


  ngOnInit(): void {


    localStorage.setItem("currentPage", "/cart")
this._CartService.getAllCartItemsAPI().subscribe({
  next:(res)=>{

    this.cartItems = res.data.products;

    this.totalPrice = res.data.totalCartPrice;

    this.cartTd = res.data._id;

    console.log(this.cartItems)
  },
  error:(error)=>{console.log(error)}
})

}

removeItemBtn(pId:string){
this._CartService.removeItemAPI(pId).subscribe({
  next:(res)=>{
 // Type SUCCESS
 this._toastEvokeService.success('success', res.message).subscribe();


    this._CartService.cartItemsNumbers.next(res.numOfCartItems);

    this.cartItems = res.data.products;

  },
  error:(err)=>{console.log(err)}

})
}

updateItemsQuBtn(wichBtn:string , pCount:string|number , pId : string )
{
 if(wichBtn == "plus"){
  pCount =  (Number(pCount) +1).toString() ;
}
else{
  pCount =  (Number(pCount) -1).toString() ;

  if( Number(pCount) == 0 ){
    this.removeItemBtn(pId);
  }
}
this._CartService.updateCartItemQuAPI(pId,pCount).subscribe({
  next:(res)=>{

    this.cartItems= res.data.products;
    console.log(res)},
  error:(err)=>{console.log(err)}
})

}

}
