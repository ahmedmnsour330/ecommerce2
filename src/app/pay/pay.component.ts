import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';



@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent {

  currentCartId :string = '';

constructor(private _ActivatedRoute: ActivatedRoute , private _OrdersService:OrdersService) {}

ngOnInit(): void {

  this._ActivatedRoute.params.subscribe((p)=>{
    this.currentCartId = p['id'];

  })

}

  adressForm : FormGroup = new FormGroup({
    details : new FormControl(null),
    phone : new FormControl(null),
    city : new FormControl(null),



  })
  adressFormSubmit(){
    this.adressForm.value
this._OrdersService.checkOut(this.currentCartId , this.adressForm.value).subscribe({
  next : (res)=>{
    window.location.href= res.session.url;
    console.log(res)},
  error : (err) => {console.log(err)}
})
  }

}
