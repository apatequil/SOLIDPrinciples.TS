import { ProductOperationResult } from './product_inventory_result';
import { Product } from './product'
import { ProductInventory } from './product_inventory'
import chalk from 'chalk'
import { ConsoleLogger } from '../../util/logger/consoleLogger';

// Naive implementation of an inventory management system. The manager maintains the inventory state
// of products.
// Restrictions:
// - Cannot have duplicate products defined in the system. Duplicates defined as having the same product name. Log error when this happens
// - Cannot have products with negative prices. Log error when this happens
// - Cannot update a product which the manager doesn't know about. Log error when this happens
// - Log information when a product is successfully updated
export class ProductManager {
	private readonly productCatalog: ProductInventory[]	= [];
	private readonly logger: ConsoleLogger = new ConsoleLogger()

	public addProduct(product: Product, count: number) {
		// The price of the product must be greater than 0
		if(product.price <= 0) {			
			this.logger.logError(`Invalid product identified. Price must be > $0 ${JSON.stringify(product)}`)
			return;
		}

		// Can't have negative inventory
		if(count < 0) {
			this.logger.logError(`Cannot have a negative product inventory. Context: ${JSON.stringify(product)}`)
			return;
		}

		const existingProduct: ProductInventory | undefined = this.productCatalog.filter(x => x.name === product.name)?.pop()

		// No duplicate products
		if(existingProduct) {
			this.logger.logError(`Cannot add duplicate product with name ${product.name}`)
			return;
		}


		// Validation passed. Add new product to catalog
		this.productCatalog.push({ name: product.name, inventoryCount: count, product: product })
		this.logger.logInfo(`Product ${product.name} has been added with inventory ${count}`)
	}

	public updateProduct(name: string, product: Product, count: number) {

		// Make sure we don't lose money on each product
		if(product.price <= 0){
			this.logger.logError(`Invalid product price. Price must be > $0 ${JSON.stringify(product)}`)
			return;
		}

		const existingProduct: ProductInventory | undefined = this.productCatalog.filter(x => x.name === product.name)?.pop()

		if(!existingProduct) {
			this.logger.logError(`Product not found. Add product by calling addProduct before trying to update. Context: ${JSON.stringify(product)}`)
			return
		}

		existingProduct.product = product
		existingProduct.inventoryCount = count


		this.logger.logInfo(`Product ${name} has been updated: Context: ${product}`)
	}

	public listProducts(): void {
		if(this.productCatalog.length < 1) {
			this.logger.logInfo("There are currently no products in inventory")
			return;
		}
	}
}
