import { IProduct } from '.';

export class ProductValidationResult {

	constructor(public readonly isSuccessful: boolean, public readonly message: string, public data: IProduct | undefined = undefined){}
}
