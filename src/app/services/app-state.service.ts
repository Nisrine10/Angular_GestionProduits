import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public productState : any ={
    products : [],
    keyword : "",
    totalPages:0,
    pageSize:3,
    currentPage:1,
    totalProducts:0,
    status : "",
    errorMessage : ""
  }
  public authState: any={
    isAuthenticated : false,
    username:undefined,
    roles:undefined,
    token : undefined
  };
  constructor() { }

  public setProductState(state : any): void {
    this.productState={...this.productState, ...state}
  }

  public setAuthState(state : any):void{
    this.authState={...this.authState,...state};
  }
}
