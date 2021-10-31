import { Product, ProductInventory, ConsoleLogger } from './'

// Naive implementation of an inventory management system. The manager maintains the inventory state
// of products.
// Restrictions:
// - Cannot have duplicate products defined in the system. Duplicates defined as having the same product name. Log error when this happens
// - Cannot have products with negative prices. Log error when this happens
// - Cannot update a product which the manager doesn't know about. Log error when this happens
// - Log information when a product is successfully updated
export class ProductManager {

	// Responsibility: Maintain collection of items
	private readonly productCatalog: ProductInventory[]	= [];

	// Responsibility: If we ever want to change to a db logger or some other type we'd have to change this class
	private readonly logger: ConsoleLogger = new ConsoleLogger()

	// Responsibility: Validation performed in here
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

	// Part of main responsibility (maintaining collection of items)
	public getProducts(): void {
		if(this.productCatalog.length < 1) {
			this.logger.logInfo("There are currently no products in inventory")
			return;
		}
	}
}
