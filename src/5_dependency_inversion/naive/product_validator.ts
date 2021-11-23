import { ProductValidationResult } from './product_validation_result';
import { Product } from './product';
import { ProductValidationContext } from './product_validation_context';


export class ProductValidator {
	private validations: { (product: Product, context: ProductValidationContext): ProductValidationResult; }[] = [];

	public addValidation(callback: (product: Product, context: ProductValidationContext) => ProductValidationResult):  void {
		this.validations.push(callback)
	}

	runAll(product: Product, context: ProductValidationContext): {isValid: boolean, results: ProductValidationResult[]} {

		const results: ProductValidationResult[] = this.validations.map(x => x(product, context))

		return {
			isValid: results.every(x => x.isSuccessful),
			results: results
		}
	}

	static buildResult(isValid: boolean, message: string): ProductValidationResult {
		return new ProductValidationResult(isValid, message)
	}

	static buildSuccess(): ProductValidationResult {
		return new ProductValidationResult(true, 'Valid')
	}
}
