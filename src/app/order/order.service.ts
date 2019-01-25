import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Observable } from "rxjs/Observable";
import { Order } from "./order.model";
import { MEAT_API } from "app/app.api";
import { map } from "rxjs/operator/map";
import { LoginService } from "app/security/login/login.service";


@Injectable()
export class OrderService{
    constructor(
        private cartService: ShoppingCartService,
        private loginService: LoginService,
        private http: HttpClient
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
        let headers = new HttpHeaders()

        if (this.loginService.isLoogedIn()) {
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
        }

        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers})
            .map(order => order.id)
    }
}