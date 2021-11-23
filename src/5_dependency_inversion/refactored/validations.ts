import { IProduct, ProductValidator, ProductValidationContext, ProductValidationResult, ProductInventory } from '.'

export function isValidPrice(product: IProduct): ProductValidationResult {

	if(product.price <= 0) {
		return ProductValidator.buildResult(false, `Invalid product identified. Price must be > $0 ${JSON.stringify(product)}`, product)
	}

	return ProductValidator.buildSuccess()
}

export function isValidQuantity(product: IProduct, context: ProductValidationContext): ProductValidationResult {

	if(context.data["count"] < 0) {
		return ProductValidator.buildResult(false, `Cannot have a negative product inventory.`, product)
	}

	return ProductValidator.buildSuccess()
}

export function isDuplicateProduct(product: IProduct, context: ProductValidationContext): ProductValidationResult {

	const catalog = context?.data["catalog"]

	// Validate context has what is needed for the validation
	if(!catalog) {
		return ProductValidator.buildResult(false, `Duplicate check is missing catalog context. Context: ${JSON.stringify(context)}`, product)
	}

	const existingProduct = context.data["catalog"].find((x: ProductInventory) => x.name === product.name)

	if(existingProduct) {
		return ProductValidator.buildResult(false, `Cannot add duplicate item.`, product)
	}

	return ProductValidator.buildSuccess()
}
