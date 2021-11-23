export interface IProduct {
	readonly name: string
	readonly description: string
	readonly price: number
}

export class Product implements IProduct {

	constructor(public readonly name: string, public readonly description: string, public readonly price: number){


	}
}
