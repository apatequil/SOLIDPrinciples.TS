import { ProductValidationResult } from './product_validation_result';
import { Product } from './product'
import { ProductInventory } from './product_inventory'
import { ProductValidator } from './product_validator';

// Refactored implementation of an inventory management system. The manager maintains the inventory state
// of products.
// Restrictions:
// - Cannot have duplicate products defined in the system. Duplicates defined as having the same product name. Log error when this happens
// - Cannot have products with negative prices. Log error when this happens
// - Cannot update a product which the manager doesn't know about. Log error when this happens
// - Log information when a product is successfully updated
export class ProductManager {
	private readonly productCatalog: ProductInventory[]	= [];

	constructor(private readonly validator: ProductValidator) {
		
		
	}

	private isDuplicateProduct(product: Product): ProductValidationResult {
		
		const existingProduct: ProductInventory | undefined = this.productCatalog.filter(x => x.name === product.name)?.pop()

		if(existingProduct) {
			return this.validator.buildResult(false, `Cannot add duplicate item. Context: ${JSON.stringify(product)}`)
		}

		return this.validator.buildResult(true, `Valid`)
	}

	private doesProductExist(product: Product): ProductValidationResult {
		
		const existingProduct: ProductInventory | undefined = this.productCatalog.filter(x => x.name === product.name)?.pop()

		if(existingProduct) {
			return this.validator.buildResult(false, `Cannot add duplicate item. Context: ${JSON.stringify(product)}`)
		}

		return this.validator.buildResult(true, `Valid`)
	}

	public addProduct(product: Product, count: number): ProductValidationResult[] {

		// We can add any manager-specific validations to our validator and they will automatically run
		this.validator.addValidation(this.isDuplicateProduct)

		const productValidationResult = this.validator.runAll(product, count)

		if(!productValidationResult.isValid) {
			return productValidationResult.results
		}

		// Validation passed. Add new product to catalog
		this.productCatalog.push({ name: product.name, inventoryCount: count, product: product })

		return [
			this.validator.buildResult(true, `Product ${product.name} has been added with inventory ${count}`)
		]
	}

	// public updateProduct(name: string, product: Product, count: number): ProductValidationResult[] {

	// 	// We can add any manager-specific validations to our validator and they will automatically run
	// 	this.validator.addValidation(this.doesProductExist)


	// 	const productValidationResult = this.validator.runAll(product, count)

	// 	if(!productValidationResult.isValid) {
	// 		return productValidationResult.results
	// 	}

		

	// 	existingProduct.product = product
	// 	existingProduct.inventoryCount = count


	// 	return new ProductValidationResult(true, `Product ${name} has been updated: Context: ${product}`)
	// }

	public getProductList(): string {
		if(this.productCatalog.length < 1) {
			return "There are currently no products in inventory"
		}

		return `Products: ${this.productCatalog.map(x => `${x.name} [${x.inventoryCount}]`).join(", ")}`;
	}

	public getCatalog(): ProductInventory[] {
		return this.productCatalog
	}
}
