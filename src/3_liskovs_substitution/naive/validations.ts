import { Product, ProductValidator, ProductValidationContext, ProductValidationResult, ProductInventory } from '.'

export function isValidPrice(product: Product): ProductValidationResult {

	if(product.price <= 0) {
		return ProductValidator.buildResult(false, `Invalid product identified. Price must be > $0 ${JSON.stringify(product)}`)
	}

	return ProductValidator.buildSuccess()
}

export function isValidQuantity(product: Product, context: ProductValidationContext): ProductValidationResult {

	if(context.data["count"] < 0) {
		return ProductValidator.buildResult(false, `Cannot have a negative product inventory. Context: ${JSON.stringify(product)}`)
	}

	return ProductValidator.buildSuccess()
}

export function isDuplicateProduct(product: Product, context: ProductValidationContext): ProductValidationResult {

	const catalog = context?.data["catalog"]

	// Validate context has what is needed for the validation
	if(!catalog) {
		return ProductValidator.buildResult(false, `Duplicate check is missing catalog context. Context: ${JSON.stringify(context)}`)
	}

	const existingProduct = context.data["catalog"].find((x: ProductInventory) => x.name === product.name)

	if(existingProduct) {
		return ProductValidator.buildResult(false, `Cannot add duplicate item. Context: ${JSON.stringify(product)}`)
	}

	return ProductValidator.buildSuccess()
}
