
// Liskov's Substitution Principle example refactored
import { ProductManager, ProductValidator, ProductInventory, Validations, PrincipleLogger, FileLogger } from './3_liskovs_substitution/refactored'

function runLiskovSubstitutionRefactored(logPath: string) {

	//`======================================`
	//`|| Liskov's Substitution Refactored ||`
	//`======================================`

	// Since the Database now inherits from the base logger we don't run the risk of side effect introduced by someone
	// who misunderstood the the side effects of swapping the file and database loggers. Said side effects being distinct
	// text patterns in the logging
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

	console.log("Completed LSP:Refactored")
}

runLiskovSubstitutionRefactored('/mnt/logs/lsp.refactored.log');
