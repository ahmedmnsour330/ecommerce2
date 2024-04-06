import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoriesData:any[]=[]
constructor(private _ProductsService:ProductsService){}

  ngOnInit(): void {
    localStorage.setItem("currentPage", "/categories")
    this._ProductsService.getCategroies().subscribe({
      next:(res)=>{
        this.categoriesData = res.data
      }
    })

}
}

