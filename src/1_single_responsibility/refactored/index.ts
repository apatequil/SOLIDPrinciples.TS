import { isValidPrice, isDuplicateProduct, isValidQuantity } from './validations'

export { ConsoleLogger } from './console_logger'
export { Product } from './product'
export { ProductInventory } from './product_inventory'
export { ProductValidationContext } from './product_validation_context'
export { ProductValidationResult } from './product_validation_result'
export { ProductValidator } from './product_validator'
export { ProductManager } from './product_manager'

export const Validations = { isValidPrice, isDuplicateProduct, isValidQuantity }
