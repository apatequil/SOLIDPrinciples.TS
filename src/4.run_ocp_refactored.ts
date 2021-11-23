
// Open/Close Principle example refactored
import { ProductManager, ProductValidator, ProductInventory, Validations, PrincipleLogger
	, ConsoleLogger
	//, DatabaseLogger
	//, FileLogger
	//, ILogger*/
} from './2_open_closed/refactored'

function runOpenClosedRefactored() {

	//`======================================`
	//`|| Open/Closed Refactored           ||`
	//`======================================`

	// With the refactor we can now drive where the logging happens by passing in different
	// types of loggers. This could be driven through code or configuration. Since the
	// console, db, and file loggers all implement ILogger, we can utilize any of them here
	// without having to alter underlying logging code

	// Note we are still depending on concretes and that will be cleaned up in a different principle

	const log: PrincipleLogger = new PrincipleLogger(new ConsoleLogger())
	//const log: PrincipleLogger = new PrincipleLogger(new DatabaseLogger())
	//const log: PrincipleLogger = new PrincipleLogger(new FileLogger())

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

runOpenClosedRefactored();
