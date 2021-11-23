import { isValidPrice, isDuplicateProduct, isValidQuantity } from './validations'

export { Product, IProduct } from './product'
export { ProductInventory } from './product_inventory'
export { ProductValidationContext } from './product_validation_context'
export { ProductValidationResult } from './product_validation_result'
export { ProductValidator } from './product_validator'
export { ProductManager } from './product_manager'
export { LogLevel, BaseLogger, ConsoleLogger, DatabaseLogger, FileLogger, ILogger, PrincipleLogger } from './logger'

export const Validations = { isValidPrice, isDuplicateProduct, isValidQuantity }
