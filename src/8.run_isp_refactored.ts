
// Interface Segregation Principle example refactored
import { ProductManager, ProductValidator, ProductInventory, Validations, PrincipleLogger, FileLogger } from './4_interface_segregation/refactored'

function runInterfaceSegregationRefactored(logPath: string) {

	//`================================================`
	//`|| Interface Segregation Principle Refactored ||`
	//`================================================`

	// A new requirement came down the to the developer to allow colorful output
	// in the console logger so it's easier to see application health at a glance.

	// The first implementation has some unintended consequences:
	// 		- All 3 base, file, and database loggers were required to implement
	//		  color properties from the base interface. This is even though these
	//		  loggers don't care about colorful output

	// The refactored version has broken the ILogger interface down into the basic
	// logging methods and one with a collection of colors. By doing this only the
	// console logger needed to implement the color data leaving the others with
	// more concise and applicable code.

	const log: PrincipleLogger = new PrincipleLogger(new FileLogger(logPath))
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

	console.log("Completed ISP:Naive")
}

runInterfaceSegregationRefactored('/mnt/logs/lsp.refactored.log');
