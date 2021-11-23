import { ProductValidationResult } from './product_validation_result';
import { IProduct } from './product';
import { IValidationContext } from './product_validation_context';


export class ProductValidator {
	private validations: { (product: IProduct, context: IValidationContext): ProductValidationResult; }[] = [];

	public addValidation(callback: (product: IProduct, context: IValidationContext) => ProductValidationResult):  void {
		this.validations.push(callback)
	}

	public addValidations(callbacks: Array<(product: IProduct, context: IValidationContext) => ProductValidationResult>):  void {
		callbacks.forEach(x => this.validations.push(x))
	}

	runAll(product: IProduct, context: IValidationContext): {isValid: boolean, results: ProductValidationResult[]} {

		const results: ProductValidationResult[] = this.validations.map(x => x(product, context))

		return {
			isValid: results.every(x => x.isSuccessful),
			results: results
		}
	}

	static buildResult(isValid: boolean, message: string, data: IProduct): ProductValidationResult {
		return new ProductValidationResult(isValid, message, data)
	}

	static buildSuccess(): ProductValidationResult {
		return new ProductValidationResult(true, 'Valid')
	}
}
