import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { Product, ShopService } from '../services/shop';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { cartItemsCount } from '../state/cart.selector';
import { addTocart } from '../state/cart.actions';
import { clearcart, increaseQty, decreaseQty, deleteFromcart } from '../state/cart.actions';
import { selectCartItems, cartItemsPrice } from '../state/cart.selector';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-hello',
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
  standalone: true
})
export class ShopComponent implements OnInit {

  products: Product[] = []
  isUserDropdown = false
  cartItemsCount: Observable<number>
  SidebarOpen = false
  cartItems!: Observable<any>;
  cartTotal!: Observable<number>;
  name: string = ''
  password: string = ''
  showDeleteDialog = false;
  showUpdateDialog = false;

  togglesidebar() {
    this.SidebarOpen = !this.SidebarOpen
  }

  closesidebar() {
    this.SidebarOpen = false
  }

  decreaseQty(productId: string) {
    this.store.dispatch(decreaseQty({ productId }))
  }

  increaseQty(productId: string) {
    this.store.dispatch(increaseQty({ productId }))
  }

  removeFromcart(productId: string) {
    this.store.dispatch(deleteFromcart({ productId }))
  }

  checkout() {
    this.store.dispatch(clearcart())
    alert('order placed successfully')
    this.closesidebar()
  }

  toggleUserDropdown() {
    this.isUserDropdown = !this.isUserDropdown;
  }

  constructor(private auth: Auth, private router: Router, private shopService: ShopService, private store: Store) {
    this.cartItemsCount = this.store.select(cartItemsCount);
    this.cartItems = this.store.select(selectCartItems);
    this.cartTotal = this.store.select(cartItemsPrice);
  }
  ngOnInit(): void {
    this.shopService.getAllProducts().subscribe((data) => {
      this.products = data;
    })
  }

  logout() {
    this.auth.logout()
    this.router.navigate(['/auth'])
  }

  addTocart(product: Product) {
    this.store.dispatch(addTocart({ product }))
  }

  updateProfile() {
    this.showUpdateDialog = false;
    this.auth.updateProfile(this.name, this.password)
  }

  deleteProfile() {
    this.showDeleteDialog = false;
    this.auth.deleteProfile()
  }

  loadProfile() {
    this.auth.loadData().subscribe({next:(data)=>{
      this.name=data.name
      this.showUpdateDialog=true
    },error:(err)=>{console.log(err)}})
  }


}
