
export interface IValidationContext {
	data: {[key:string]:any}
}
export class ProductValidationContext implements IValidationContext {

	constructor(public readonly data : {[key:string]:any}) {}
}
