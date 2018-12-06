import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  //valor fixo para representar o frete
  delivery: number = 8

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Crédito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem): void {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem): void {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem): void {
    this.orderService.remove(item)
  }

  checkOrder(order: Order): void {
    console.log(order)
    order.orderItems = this.cartItems()
    .map((item:CartItem)=>new OrderItem(item.quantity, item.menuItem.id))

    this.orderService.checkOrder(order)
      .subscribe((orderId: string) => {
        this.orderService.clear()
        this.router.navigate(['/order-summary'])
      })
  }  
}
