
// Single Responsibility Principle example start
import { ProductManager } from './1_single_responsibility/naive'
import chalk from 'chalk'

function buildIndent(count: number) {
	return '\t'.repeat(count)
}
function info(message: string, indent: number = 0) {
	console.log(chalk.cyan(`${buildIndent(indent)}${message}`))
}

function runSingleResponsibilityNaive() {

	info(`=================================`)
	info(`|| Single Responsibility Naive ||`)
	info(`=================================`)

	const manager = new ProductManager()

	info(`Beginning Inventory:`)
	manager.getProducts()
	info(`Add some products:`)

	manager.addProduct({name: 'Bicycle', description: 'Typical bicycle', price: 250}, 3)
	manager.addProduct({name: 'Unicycle', description: 'Typical unicycle', price: 500}, 2)
	manager.addProduct({name: 'Tricycle', description: 'Typical tricycle', price: 750}, 9)
	manager.addProduct({name: 'Quadcycle', description: 'Typical 4-wheeler', price: 1000}, 1)

	manager.getProducts()

	info('Now add a duplicated item and should see an error')
	manager.addProduct({name: 'Bicycle', description: 'Typical bicycle', price: 250}, 10)

	info('Done')
}
runSingleResponsibilityNaive();
