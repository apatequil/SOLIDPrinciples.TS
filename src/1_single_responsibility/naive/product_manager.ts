import { ProductOperationResult } from './product_inventory_result';
import { Product } from './product'
import { ProductInventory } from './product_inventory'

// Naive implementation of an inventory management system. The manager maintains the inventory state
// of products.
// Restrictions:
// - Cannot have duplicate products defined in the system. Duplicates defined as having the same product name. Log error when this happens
// - Cannot have products with negative prices. Log error when this happens
// - Cannot update a product which the manager doesn't know about. Log error when this happens
// - Log information when a product is successfully updated
export class ProductManager {
	private readonly productCatalog: ProductInventory[]	= [];

	constructor(private readonly logger: Console) {}

	public addProduct(product: Product, count: number): ProductOperationResult {

		// The price of the product must be greater than 0
		if(product.price <= 0) {
			return new ProductOperationResult(false, `Invalid product identified. Price must be > $0 ${JSON.stringify(product)}`)
		}

		// Can't have negative inventory
		if(count < 0) {
			return new ProductOperationResult(false, `Cannot have a negative product inventory. Context: ${JSON.stringify(product)}`)
		}

		const existingProduct: ProductInventory | undefined = this.productCatalog.filter(x => x.name === product.name)?.pop()

		if(existingProduct) {
			return new ProductOperationResult(false, `Cannot add duplicate item with name ${product.name}`)
		}


		// Validation passed. Add new product to catalog
		this.productCatalog.push({ name: product.name, inventoryCount: count, product: product })
		return new ProductOperationResult(true, `Product ${product.name} has been added with inventory ${count}`)
	}

	public updateProduct(name: string, product: Product, count: number): ProductOperationResult {

		// Make sure we don't lose money on each product
		if(product.price <= 0){
			return new ProductOperationResult(false, `Invalid product identified. Price must be > $0 ${JSON.stringify(product)}`)
		}

		if(count < 0){
			return new ProductOperationResult(false, `Cannot add a negative amount of a product. Context: ${JSON.stringify(product)}`)
		}

		const existingProduct: ProductInventory | undefined = this.productCatalog.filter(x => x.name === product.name)?.pop()

		if(!existingProduct) {
			return new ProductOperationResult(false, `Product not found. Add product by calling addProduct before trying to update. Context: ${JSON.stringify(product)}`)
		}

		existingProduct.product = product
		existingProduct.inventoryCount = count


		return new ProductOperationResult(true, `Product ${name} has been updated: Context: ${product}`)
	}

	public getProductList(): string {
		if(this.productCatalog.length < 1) {
			return "There are currently no products in inventory"
		}

		return `Products: ${this.productCatalog.map(x => `${x.name} [${x.inventoryCount}]`).join(", ")}`;
	}
}
