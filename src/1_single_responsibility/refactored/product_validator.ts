import { ProductValidationResult } from './product_validation_result';
import { Product } from './product';
import { ProductInventory } from '../naive';


export class ProductValidator {
	private validations: { (product: Product, count: number): ProductValidationResult; }[] = [];

	public addValidation(callback: (product: Product, count: number) => ProductValidationResult):  void {
		this.validations.push(callback)
	}

	isValidPrice = (product: Product, count: number): ProductValidationResult => {

		if(product.price <= 0) {
			return this.buildResult(false, `Invalid product identified. Price must be > $0 ${JSON.stringify(product)}`)
		}

		return this.buildResult(true, "Valid")
	}

	isValidQuantity = (product: Product, count: number): ProductValidationResult => {

		if(count < 0) {
			return this.buildResult(false, `Cannot have a negative product inventory. Context: ${JSON.stringify(product)}`)
		}

		return new ProductValidationResult(true, "Valid")
	}

	runAll(product: Product, count: number): {isValid: boolean, results: ProductValidationResult[]} {

		const results: ProductValidationResult[] = this.validations.map(x => x(product, count))

		return {
			isValid: results.every(x => x.isSuccessful),
			results: results
		}
	}

	buildResult(isValid: boolean, message: string): ProductValidationResult {
		return new ProductValidationResult(isValid, message)
	}
}
