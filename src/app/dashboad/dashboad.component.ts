import { Component } from '@angular/core';
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-dashboad',
  templateUrl: './dashboad.component.html',
  styleUrl: './dashboad.component.css'
})
export class DashboadComponent {

  constructor( public appStateService: AppStateService) {
  }

  totalCheckedProducts() {
    let checkedProducts= this.appStateService.productState.products.filter((p:any)=>p.checked==true);
    return checkedProducts.length;
  }
}
