
// Interface Segregation Principle example start
import { ProductManager, ProductValidator, ProductInventory, Validations, PrincipleLogger, FileLogger } from './5_dependency_inversion/naive'

function runInterfaceSegregationRefactored(logPath: string) {

	//`================================================`
	//`|| Dependency Inversion Principle Naive       ||`
	//`================================================`

	// A new requirement has come in that product manager *must* be
	// highly available and therefore maintenance windows to bring it
	// down and update are not allowed. We need to be able to change
	// the logging and validation without the need for a redeployment.

	// Currently the ProductManager wouldn't allow custom implementations of
	// loggers and validators because the ProductManager constructor takes
	// in concrete types. This limits the options to those loggers/validators
	// already defined and can therefore not be updated without redeployment.
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
