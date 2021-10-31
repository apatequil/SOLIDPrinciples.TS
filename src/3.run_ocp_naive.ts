
// Open/Close Principle example
import { ProductManager, ProductValidator, ProductInventory, Validations, Logger, LoggerType } from './2_open_closed/naive'

function runSingleResponsibilityRefactored() {

	//`======================================`
	//`|| Open/Closed Refactored           ||`
	//`======================================`

	// Construct logger. Note the type of logger is now passed and multiple types are supported
	// per the new requirements. For demonstration we're using a console logger

	// We could swap it for the db logger or file logger if we really wanted to fully expand the example
	const log: Logger = new Logger(LoggerType.Console)
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

	const manager = new ProductManager(validator, log, startingInventory)

	console.log(`Beginning Inventory:`)
	manager.getProducts().forEach(x => console.log(`${x.name} (${x.inventoryCount}) - $${x.product.price}`))

	// 'Now add a duplicated item and should see an error'
	manager.addProduct({name: 'Bicycle', description: 'Typical bicycle', price: 250}, 10)

	console.log("Completed SRP:Refactored")
}

runSingleResponsibilityRefactored();
