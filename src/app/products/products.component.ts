import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';

import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },

    },
    nav: true
  }

  allProducts: Product[]=[];

  inputValue: string= '';
  constructor(private toastEvokeService: ToastEvokeService,private _CartService:CartService , private _productService : ProductsService ) { }
  ngOnInit(): void {
    localStorage.setItem("currentPage", "/products")

    this._productService.getProductsAPI().subscribe({
      next:(res)=>{
          this.allProducts = res.data;
          console.log(res)
      },
      error : (err)=>{}

    })
}

addCartBtn(pId:string){
  this._CartService.addToCartAPI(pId).subscribe
  ({next:(res) =>{
   // Type SUCCESS
   this.toastEvokeService.success('success', res.message).subscribe();

   this._CartService.cartItemsNumbers.next(res.numOfCartItems)
 },
  error:(err)=>{
   // Type ERROR
   this.toastEvokeService.danger('I am title!', 'I am a message!').subscribe();
  }

 })
 }
}
