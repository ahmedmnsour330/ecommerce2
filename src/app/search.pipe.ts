import { Pipe, PipeTransform } from '@angular/core';
import {Product}from "./product"
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(AllProducts:Product[], userWord: string): Product[] {
    return AllProducts.filter((onProd)=>onProd.title.toLowerCase().includes(userWord.toLowerCase()));
  }

}
