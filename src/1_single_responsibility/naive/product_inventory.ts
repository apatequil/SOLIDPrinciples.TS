import { Product } from './product'

export class ProductInventory {
	constructor(public name: string, public product: Product, public inventoryCount: number){}
}
