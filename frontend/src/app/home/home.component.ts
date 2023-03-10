import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from '../services/login.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ProductService } from './../services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface productsElement {
  id:number
  title: string;
  description: string;
  code: number;
  price: number;
  stock: number;
  status: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'stock', 'status']
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand']
  expandedElement: productsElement | null | undefined
  data_dynamic: any = []
  dataSource = new MatTableDataSource<productsElement>(this.data_dynamic)
  token = localStorage.getItem('aut')
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  products = [{
    'title':'title',
    'stock':'stock',
    'status':'status',
    'description':'description',
    'code':'code',
    'price':'price',
  }]
  cartCount = 0;
  search = new FormGroup({
    code : new FormControl('', Validators.required),
  })
  productsCart: any = [];
  constructor(public dialog: MatDialog, private router:Router, private loginService:LoginService, private productService:ProductService, private _snackBar: MatSnackBar ) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  logoutJwt(){
    this.loginService.logout(this.token?.replace(/['"]+/g, '')).subscribe((response) =>{
      if (response) {
        console.log("Succesfully")
      }
    })
    localStorage.clear()
    this.router.navigate(['/login']);
  }
  cartCounts(): any{
   return this.productService.CountProductsCard()
  }
  login(){
    this.router.navigate(['login'])
  }

  register(){
    this.router.navigate(['register'])
  }
  card(){
    this.router.navigate(['shopping-cart'])
  }
  filterProduc(): void {
    this.productService.findProduct(this.search.value.code).subscribe((response:any ) => {
      let res = response
      this.dataSource = new MatTableDataSource<productsElement>([res])
      this.dataSource.paginator = this.paginator

      if (res.hasOwnProperty('products') ) {
      let res = response
      this.data_dynamic = Object.values(res)
      this.dataSource = new MatTableDataSource<productsElement>(this.data_dynamic[0])
      this.dataSource.paginator = this.paginator
      }else {
        let res = response
        this.dataSource = new MatTableDataSource<productsElement>([res[0]])
        this.dataSource.paginator = this.paginator
      }
    })

  }
  addCart(element:any){
    this.productService.addProducto(element)
    this.cartCount++;
    console.log( this.productService.getItems())
  }
  ngOnInit(): void {
    this.productService.findAllProducts().subscribe((response:any ) => {
      let res = response
      this.data_dynamic = Object.values(res)
      this.dataSource = new MatTableDataSource<productsElement>(this.data_dynamic[0])
      this.dataSource.paginator = this.paginator
    })
  }

}
