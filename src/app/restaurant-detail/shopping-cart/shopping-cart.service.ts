import { Injectable } from "@angular/core";
import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.mode";
import { NotificationService } from "app/shared/messages/notification.service";


@Injectable()
export class ShoppingCartService {
    public items: CartItem[] = []

    constructor (private notification: NotificationService) {}

    public clear(){
        this.items = []
    }

    public total(): number {
        return this.items
        .map(item => item.value())
        .reduce((prev, value) => prev + value, 0)
    }

    public addItem(item: MenuItem) : void {
        let foundItem = this.items.find(mItem => item.id === mItem.menuItem.id )
        if (foundItem) {
            this.increaseQty(foundItem)
        } else {
            this.items.push(new CartItem(item))
        }

        this.notification.notify(`Você adicionou o item ${item.name}`)
    }

    public removeItem(item: CartItem): void {
        this.items.splice(this.items.indexOf(item), 1)
        this.notification.notify(`Você adicionou o item ${item.menuItem.name}`)
    }

    public increaseQty(item: CartItem): void {
        item.quantity++
    }

    public decreaseQty(item: CartItem): void {
        item.quantity--
        if (item.quantity === 0 ) {
            this.removeItem(item)
        }
    }

}