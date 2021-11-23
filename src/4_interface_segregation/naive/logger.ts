import chalk from 'chalk'

export enum LogLevel { Debug, Info, Warning, Error }

// The naive implementation was done in a way that causes inflated codebase sized with
// code that doesn't even matter. The initial intention was to put the colors in the
// base interface so that any implementation of the logger would have access to the colors.
// This is probably ok if you will only ever have graphical displays but as shown below
// it adds a lot of bloat to the code which runs the risk of confusing developers and
// introducing bugs
export interface ILogger {
	log(message: string, level: LogLevel): void
	debug(message: string): void
	info(message: string): void
	warning(message: string): void
	error(message: string): void

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

	// Defer colors to child classes
	abstract debugColor: chalk.Chalk;
	abstract errorColor: chalk.Chalk;
	abstract infoColor: chalk.Chalk;
	abstract warningColor: chalk.Chalk;
}

// Request for color was primarily for the console logger which makes sense
// given the color capabilities.
export class ConsoleLogger extends BaseLogger {
	override debugColor: chalk.Chalk = chalk.blue;
	override errorColor: chalk.Chalk = chalk.red;
	override infoColor: chalk.Chalk = chalk.cyan;
	override warningColor: chalk.Chalk = chalk.yellow;

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

// With the file logger, the idea of color doesn't make sense. It's just a plain text file.
// However, since the naive implementation made the decision to put the color values in the
// base interface, they needed to be implemented (or deferred with abstract) in the base class
// and each extending class afterwards. This breaks interface segregation as these loggers
// are required to implement (even if it's a blank or default value) interface members which
// they don't need or care about.
export class FileLogger extends BaseLogger {
	override debugColor: chalk.Chalk = chalk.blue;
	override errorColor: chalk.Chalk = chalk.red;
	override infoColor: chalk.Chalk = chalk.cyan;
	override warningColor: chalk.Chalk = chalk.yellow;

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

// Again we see here with the database logger unneeded and unwanted
// code which we are required to maintain. Additionally, if the color
// implementation in the base class changes it could lead to users
// of the class having to change their code and deploy just because
// of the unneeded code.
export class DatabaseLogger extends BaseLogger {
	override debugColor: chalk.Chalk = chalk.blue;
	override errorColor: chalk.Chalk = chalk.red;
	override infoColor: chalk.Chalk = chalk.cyan;
	override warningColor: chalk.Chalk = chalk.yellow;

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

// With the refactor, we now pass in the implementation of the logger. This means
// that we can add new implementations which can be used by this class without
// having to modify it as long as the logging class implements the ILogger interface
// This also sets things up for more abstraction and inversion
export class PrincipleLogger {

	constructor(private readonly logImplementation: ILogger) { }

    log(message: string, level: LogLevel): void {
		this.logImplementation.log(message, level)
    }
}
