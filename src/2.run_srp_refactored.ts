
// Single Responsibility Principle example refactored
import { ProductManager, ProductValidator, ProductInventory, Validations, ConsoleLogger } from './1_single_responsibility/refactored'

function runSingleResponsibilityRefactored() {

	//`======================================`
	//`|| Single Responsibility Refactored ||`
	//`======================================`

	const logger: ConsoleLogger = new ConsoleLogger()
	const validator: ProductValidator = new ProductValidator()
	validator.addValidation(Validations.isValidPrice)
	validator.addValidation(Validations.isValidQuantity)
	validator.addValidation(Validations.isDuplicateProduct)

	const startingInventory = [
		new ProductInventory("Unicycle", {name: 'Unicycle', description: 'Typical unicycle', price: 75}, 25),
		new ProductInventory("Bicycle", {name: 'Bicycle', description: 'Typical bicycle', price: 345}, 125),
		new ProductInventory("Tricycle", {name: 'Triycle', description: 'Typical tricycle', price: 121}, 30),
		new ProductInventory("Quadcycle", {name: 'Quadcycle', description: 'Typical quadcycle', price: 200}, 15),
	]

	const manager = new ProductManager(validator, logger, startingInventory)

	console.log(`Beginning Inventory:`)
	manager.getProducts().forEach(x => console.log(`${x.name} (${x.inventoryCount}) - $${x.product.price}`))

	// 'Now add a duplicated item and should see an error'
	manager.addProduct({name: 'Bicycle', description: 'Typical bicycle', price: 250}, 10)

	console.log("Completed SRP:Refactored")
}

runSingleResponsibilityRefactored();
