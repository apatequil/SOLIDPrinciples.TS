import { Product, ProductInventory, ProductValidator, ProductValidationContext } from './'
import { ConsoleLogger } from '../../util/logger/consoleLogger'

// Refactored implementation of an inventory management system. The manager maintains the inventory state
// of products.
// Restrictions:
// - Validation must pass before adding a product
//   - Note the manager no longer cares about the validations, it just executes the validator and moves forward if successful
export class ProductManager {

	// Removed responsibility of creating the logger.
	// Note the catalog initialization can also be done through the constructor making it easy to bulk-load products at the
	// class' instantiation rather than having to call addProduct for each. While this doesn't really add to SRP it
	// helps set things up for future principles like 'O' and 'D'
	constructor (
		private readonly validator: ProductValidator,
		private readonly logger: ConsoleLogger,
		private readonly productCatalog: ProductInventory[] = Array.of<ProductInventory>()) { }

	addProduct(product: Product, count: number): void {

		const context = new ProductValidationContext({
			["catalog"]: this.productCatalog,
			["count"]: count
		})
		const validationResults = this.validator.runAll(product, context)

		if(validationResults.isValid) {
			// Validation passed. Add new product to catalog
			this.productCatalog.push({ name: product.name, inventoryCount: count, product: product })
			return
		}

		validationResults.results.forEach(x => {
			if(!x.isSuccessful){
				this.logger.logError(x.message)
			}
		})
	}

	// Part of main responsibility (maintaining collection of items). It no longer outputs or tries
	// to format anything. Instead it just returns what it has and whatever called this can format it as
	// needed. This removes the reporting responsibility that was in the naive implementation
	getProducts(): ProductInventory[] {
		return this.productCatalog
	}
}
