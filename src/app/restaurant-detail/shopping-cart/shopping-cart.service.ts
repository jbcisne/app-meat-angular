import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.mode";

export class ShoppingCartService {
    public items: CartItem[] = []

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
    }

    public removeItem(item: CartItem): void {
        this.items.splice(this.items.indexOf(item), 1)
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