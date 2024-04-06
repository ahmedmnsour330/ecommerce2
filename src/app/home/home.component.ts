import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../product';
import { CartService } from '../cart.service';

// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{

  inputValue: string= '';

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

  constructor(private toastEvokeService: ToastEvokeService,private _CartService:CartService , private _productService : ProductsService ) {}
  ngOnInit(): void {




      localStorage.setItem("currentPage", "/home");
      this._productService.getProductsAPI().subscribe({
        next:(res)=>{
            this.allProducts = res.data;
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
