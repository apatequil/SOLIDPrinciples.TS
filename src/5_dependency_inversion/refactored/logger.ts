import chalk from 'chalk'

export enum LogLevel { Debug, Info, Warning, Error }

// The refactor to better conform to the ISP breaks down
// interfaces and implementations into smaller, more cohesive
// units. In this case the color information has bee extracted
// and places in its own interface. This allows us to only
// implement the colorful functionality if the logger implementation
// needs it. The file and database loggers are now leaner as is
// the base logger. We've met ISP conditions for our requirements
export interface ILogger {
	log(message: string, level: LogLevel): void
	debug(message: string): void
	info(message: string): void
	warning(message: string): void
	error(message: string): void
}

export interface IColorfulOutput extends ILogger {
	debugColor: chalk.Chalk
	errorColor: chalk.Chalk
	infoColor: chalk.Chalk
	warningColor: chalk.Chalk
}

export abstract class BaseLogger implements ILogger {
	log(message: string, level: LogLevel): void {
		switch(+level){
			case LogLevel.Debug:
				this.debug(message)
				break;
			case LogLevel.Info:
				this.info(message)
				break;
			case LogLevel.Warning:
				this.warning(message)
				break;
			case LogLevel.Error:
				this.error(message)
				break;
		}
	}

	// Defer implementation to child classes
	abstract debug(message: string): void
	abstract info(message: string): void
	abstract warning(message: string): void
	abstract error(message: string): void
}

// Request for color was primarily for the console logger which makes sense
// given the color capabilities.
export class ConsoleLogger extends BaseLogger implements IColorfulOutput {
	debugColor: chalk.Chalk = chalk.blue;
	errorColor: chalk.Chalk = chalk.red;
	infoColor: chalk.Chalk = chalk.cyan;
	warningColor: chalk.Chalk = chalk.yellow;

	override debug(message: string): void {
		console.log(this.debugColor`${message}`)
	}
	override info(message: string): void {
		console.info(this.infoColor`${message}`);
	}
	override warning(message: string): void {
		console.warn(this.warningColor`${message}`);
	}
	override error(message: string): void {
		console.error(this.errorColor`${message}`);
	}
}

// FileLogger no longer needs to implement things it doesn't care about.
export class FileLogger extends BaseLogger {

	constructor(protected readonly filePath: string) {
		super()
	}
	override debug(message: string): void {
		console.debug(`FileLogger[${this.filePath}]: ${message}`);
	}
	override info(message: string): void {
		console.info(`FileLogger[${this.filePath}]: ${message}`);
	}
	override warning(message: string): void {
		console.warn(`FileLogger[${this.filePath}]: ${message}`);
	}
	override error(message: string): void {
		console.error(`FileLogger[${this.filePath}]: ${message}`);
	}
}

// FileLogger no longer needs to implement things it doesn't care about.
export class DatabaseLogger extends BaseLogger {

	constructor(protected readonly dbPath: string)
	{
		super()
	}
	override debug(message: string): void {
		console.debug(`DbLogger[${this.dbPath}]: ${message}`);
	}
	override info(message: string): void {
		console.info(`DbLogger[${this.dbPath}]: ${message}`);
	}
	override warning(message: string): void {
		console.warn(`DbLogger[${this.dbPath}]: ${message}`);
	}
	override error(message: string): void {
		console.error(`DbLogger[${this.dbPath}]: ${message}`);
	}
}

export class PrincipleLogger {

 	constructor(private readonly logImplementation: ILogger) { }

     log(message: string, level: LogLevel): void {
 		this.logImplementation.log(message, level)
     }
}
