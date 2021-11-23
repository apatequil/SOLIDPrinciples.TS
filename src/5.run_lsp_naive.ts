
// Liskov's Substitution Principle example start
import { ProductManager, ProductValidator, ProductInventory, Validations, PrincipleLogger, DatabaseLogger } from './3_liskovs_substitution/naive'

function runLiskovSubstitutionNaive(logPath: string) {

	//`======================================`
	//`|| Liskov's Substitution Naive      ||`
	//`======================================`

	// Construct logger. Note the type of logger is now passed and multiple types are supported
	// per the new requirements. For demonstration we're using a console logger

	// We could swap it for the db logger or file logger if we really wanted to fully expand the example. A realistic
	// example of this would be to have a configuration file which is read and controls which logger to use allowing
	// the change of logging without code change.
	const log: PrincipleLogger = new PrincipleLogger(new DatabaseLogger(logPath))
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

	console.log("Completed LSP:Naive")
}

runLiskovSubstitutionNaive('/mnt/logs/lsp.naive.log');
