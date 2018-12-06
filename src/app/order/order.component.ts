import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  //valor fixo para representar o frete
  delivery: number = 8

  orderForm: FormGroup

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Crédito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      emailConfirmation: this.formBuilder.control(''),
      address: this.formBuilder.control(''),
      number: this.formBuilder.control(''),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control(''),
    })
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
