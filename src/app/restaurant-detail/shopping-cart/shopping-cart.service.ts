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

    public addItem(item: MenuItem){
        let foundItem = this.items.find(mItem => item.id === mItem.menuItem.id )
        if (foundItem) {
            console.log('service found: ', item)
            foundItem.quantity++;
        }else{
            console.log('service notfound: ', item)
            this.items.push(new CartItem(item))
        }

        console.log('itens: ', this.items)
    }

    public removeItem(item: CartItem){
        this.items.splice(this.items.indexOf(item), 1)
    }

}