import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  //products$! : Observable<Array<Product>>;
  constructor(private productService:ProductService,
              private router: Router, public appStateService: AppStateService) {
  }

  ngOnInit(){
    this.searchProducts();
  }

  searchProducts(){
    /*
    this.appStateService.setProductState({
      status:"LOADING"
    });*/
    this.productService.searchProducts(
      this.appStateService.productState.keyword,
      this.appStateService.productState.currentPage,
      this.appStateService.productState.pageSize)
      .subscribe({
        next:(response) => {
          let products=response.body as Product[];
          this.appStateService.productState.products=response.body as Product[];
          let totalProducts : number=parseInt( response.headers.get('x-total-count')!);
      //  this.appStateService.productState.totalProducts=totalProducts;
          let totalPages=
            Math.floor(totalProducts/this.appStateService.productState.pageSize) ;
          if (totalProducts % this.appStateService.productState.pageSize !=0){
            ++totalPages;
          }
          this.appStateService.setProductState({
            products : products,
            totalProducts : totalProducts,
            totalPages : totalPages,
            status:"LOADED"
          })
        },
        error : err => {
          this.appStateService.setProductState({
            status : "ERROR",
            errorMessage : err
          })
        }

      })
    //this.products$=this.productService.getProducts();
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: updatedProduct => {
        product.checked=!product.checked;
      }
    })
  }


  handleDelete(product: Product) {
    if(confirm("Are you sure?"))
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        //this.getProducts();
        //this.appStateService.productState.products=this.appStateService.productState.products.filter((p:any)=>p.id!=product.id);
        this.searchProducts();
      }
    })
  }


  handleGoToPage(page: number) {
    this.appStateService.productState.currentPage=page;
    this.searchProducts();

  }

  handleEdit(product: Product) {
        this.router.navigateByUrl(`/admin/editProduct/${product.id}`)

  }
}
