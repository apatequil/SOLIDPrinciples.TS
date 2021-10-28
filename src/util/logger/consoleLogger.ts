import { ILogger } from "./logger";
import chalk from 'chalk'

export class ConsoleLogger {
    logError(message: string): void {
        console.log(chalk.red`${message}`)
    }
    logInfo(message: string): void {
        console.log(chalk.blue`${message}`)
    }
    logWarning(message: string): void {
        console.log(chalk.yellow`${message}`)
    }
    log(message: string): void {
        console.log(chalk.white`${message}`)
    }

}