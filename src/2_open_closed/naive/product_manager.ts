import { Product, ProductInventory, ProductValidator, ProductValidationContext, Logger, LogLevel } from './'

// Naive version of the Product Manager after more "robust" logging has been added. The logging functionality is
// now done through the logger as before but the logger itself can log to console, database, etc..
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
		private readonly logger: Logger,
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

		// Note that we're outputting the log information here for simplicity's sake. Ideally this would
		// simply return the errors and the caller would decide if they are errors or not. This is to
		// keep the examples as simple as possible
		validationResults.results.forEach(x => {
			if(!x.isSuccessful){
				this.logger.log(x.message, LogLevel.Error)
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
