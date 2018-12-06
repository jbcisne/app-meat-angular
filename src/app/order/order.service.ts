import { Injectable } from "@angular/core";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Observable } from "rxjs/Observable";
import { Order } from "./order.model";
import { Http, RequestOptions, Headers } from "@angular/http";
import { MEAT_API } from "app/app.api";
import { map } from "rxjs/operator/map";

@Injectable()
export class OrderService{
    constructor(
        private cartService: ShoppingCartService,
        private http: Http
    ){}

    itemsValue(): number {
        return this.cartService.total()
    }

    cartItems(): CartItem[] {
        return this.cartService.items
    }

    increaseQty(item: CartItem): void {
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem): void {
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem): void {
        this.cartService.removeItem(item)
    }

    clear(): void {
        this.cartService.clear()
    }

    checkOrder(order: Order): Observable<string> {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        return this.http.post(
            `${MEAT_API}/orders`,
            JSON.stringify(order),
            new RequestOptions({headers: headers}))
            .map(res => res.json())
            .map(order => order.id)
    }
}