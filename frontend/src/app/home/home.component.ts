import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from '../services/login.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ProductService } from './../services/product.service';

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

  products = [{
    'title':'title',
    'stock':'stock',
    'status':'status',
    'description':'description',
    'code':'code',
    'price':'price',
  }]

  constructor(public dialog: MatDialog, private router:Router, private loginService:LoginService, private productService:ProductService ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
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

  login(){
    this.router.navigate(['login'])
  }

  register(){
    this.router.navigate(['register'])
  }

  ngOnInit(): void {
    this.productService.findAllProducts().subscribe((response:any ) => {
      let res = response
      this.data_dynamic = Object.values(res)
      this.dataSource = new MatTableDataSource<productsElement>(this.data_dynamic[0])
    })
  }

}
