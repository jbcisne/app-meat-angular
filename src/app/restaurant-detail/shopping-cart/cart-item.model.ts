import { MenuItem } from "../menu-item/menu-item.mode";

export class CartItem {
    constructor(
        public menuItem: MenuItem,
        public quantity: number = 1
    ){}

    public value(): number {
        return this.menuItem.price * this.quantity
    }
}