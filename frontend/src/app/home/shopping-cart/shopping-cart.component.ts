import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ProductService } from 'src/app/services/product.service';

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
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'description', 'stock', 'status']
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand']
  expandedElement: productsElement | null | undefined
  data_dynamic: any = []
  dataSource = new MatTableDataSource<productsElement>(this.data_dynamic)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getItems()
    let res = this.productService.getItems()
    this.data_dynamic = Object.values(res)
    this.dataSource = new MatTableDataSource<productsElement>(this.productService.getItems())
    this.dataSource.paginator = this.paginator
  }

}
