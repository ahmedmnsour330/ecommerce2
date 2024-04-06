import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }
getCategroies():Observable<any>{
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}



getProductsAPI():Observable<any>{

  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/`)
}
getSpecProdAPI(_id:string):Observable<any>{

  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${_id}`)


}
}
