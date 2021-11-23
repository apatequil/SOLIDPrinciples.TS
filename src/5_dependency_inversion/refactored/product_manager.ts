import { Product, ProductInventory, ProductValidator, ProductValidationContext, BaseLogger, LogLevel } from './'

// Refactored version of the Product Manager after more "robust" logging has been added. The logging functionality is
// now done through a utility class called PrincipleLogger which can be given different behaviors depending on what
// kind of logging is necessary. This class conforms to OCP as it can be extended by passing different implementations
// into the constructor. This makes it open for extension but not modification.
export class ProductManager {
	constructor (
		private readonly validator: ProductValidator,
		private readonly logger: BaseLogger,
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

	// Return inventory
	getProducts(): ProductInventory[] {
		return this.productCatalog
	}
}
