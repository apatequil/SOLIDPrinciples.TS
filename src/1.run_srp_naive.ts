
// Single Responsibility Principle Examples
import { ProductManager, ProductOperationResult } from './1_single_responsibility/naive'
import chalk from 'chalk'

function buildIndent(count: number) {
	return '\t'.repeat(count)
}
function info(message: string, indent: number = 0) {
	console.log(chalk.cyan(`${buildIndent(indent)}${message}`))
}
function log(operationResult: ProductOperationResult, indent: number = 1) {
	if(operationResult.isSuccessful){
		console.log(chalk.green(`${buildIndent(indent)}${operationResult.message}`))
		return;
	}

	console.log(chalk.red(`${buildIndent(indent)}${operationResult.message}`))
}

function runSingleResponsibilityNaive() {

	info(`=================================`)
	info(`|| Single Responsibility Naive ||`)
	info(`=================================`)

	const manager = new ProductManager(console)

	info(`Begining Inventory:`)
	info(manager.getProductList(), 1)
	info(`Add some products:`)

	log(manager.addProduct({name: 'Bicycle', description: 'Typical bicycle', price: 250}, 10))
	log(manager.addProduct({name: 'Unicycle', description: 'Typical unicycle', price: 500}, 10))
	log(manager.addProduct({name: 'Tricycle', description: 'Typical tricycle', price: 750}, 10))
	log(manager.addProduct({name: 'Quadcycle', description: 'Typical 4-wheeler', price: 1000}, 10))

	info(manager.getProductList(), 1)

	info('Now add a duplicated item and should see an error')
	log(manager.addProduct({name: 'Bicycle', description: 'Typical bicycle', price: 250}, 10))

	info('Done')
}
runSingleResponsibilityNaive();
