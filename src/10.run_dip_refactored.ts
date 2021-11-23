
// Dependency Inversion Principle example refactored
import { ProductManager, ProductValidator, ProductInventory, Validations, BaseLogger, FileLogger } from './5_dependency_inversion/refactored'

function getLoggerFromConfig(logPath: string): BaseLogger {
	return new FileLogger(logPath)
}

function getValidationsFromConfig() {
	return [Validations.isValidPrice,
		Validations.isValidQuantity,
		Validations.isDuplicateProduct];
}

function runDependencyInversionRefactored(logPath: string) {

	//`================================================`
	//`|| Dependency Inversion Principle Refactored  ||`
	//`================================================`

	// In order to meet the new requirements of changing validation and logging
	// functionality without a redeploy, we will utilize abstractions rather than
	// concretes. This allows any classes which conform to the contracts of the
	// abstractions to be utilized, even those outside the built-in versions.

	// The logging implementation is now retrieved each time this is run. This means
	// changing the configuration file will automatically apply the behavior when this
	// runs next. Note this type can handle anything that extends the base logger allowing
	// extension through polymorphism
	const log: BaseLogger = getLoggerFromConfig(logPath)

	// The product validator now relies on abstractions (IProduct, IValidationContext) rather than concretes. This means
	// we can create custom validation and load them when this runs to provide new behavior
	const validator: ProductValidator = new ProductValidator()
	validator.addValidations(getValidationsFromConfig())

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

	console.log("Completed DIP:Refactored")
}

runDependencyInversionRefactored('/mnt/logs/dip.refactored.log');
