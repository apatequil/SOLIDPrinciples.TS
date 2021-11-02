export enum LogLevel { Debug, Info, Warning, Error }


export interface ILogger {
	log(message: string, level: LogLevel): void
	debug(message: string): void
	info(message: string): void
	warning(message: string): void
	error(message: string): void
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

export class ConsoleLogger extends BaseLogger {
	debug(message: string): void {
		console.debug(message);
	}
	info(message: string): void {
		console.info(message);
	}
	warning(message: string): void {
		console.warn(message);
	}
	error(message: string): void {
		console.error(message);
	}
}

// File logger implementation, pretend it logs to file instead of console
export class FileLogger extends BaseLogger {
	constructor(protected readonly filePath: string) {
		super()
	}
	debug(message: string): void {
		console.debug(`FileLogger[${this.filePath}]: ${message}`);
	}
	info(message: string): void {
		console.info(`FileLogger[${this.filePath}]: ${message}`);
	}
	warning(message: string): void {
		console.warn(`FileLogger[${this.filePath}]: ${message}`);
	}
	error(message: string): void {
		console.error(`FileLogger[${this.filePath}]: ${message}`);
	}
}

// Naive DB logger implementation. Implementation breaks LSP because it is changing the behavior
// of the super class and would therefore generate side effects. In this case the implementation works
// but the logging output behavior is different creating the side effect.
export class DatabaseLogger extends FileLogger {
	constructor(protected readonly dbPath: string) {
		super(dbPath)
	}
	debug(message: string): void {
		console.debug(`DbLogger[${this.dbPath}]: ${message}`);
	}
	info(message: string): void {
		console.info(`DbLogger[${this.dbPath}]: ${message}`);
	}
	warning(message: string): void {
		console.warn(`DbLogger[${this.dbPath}]: ${message}`);
	}
	error(message: string): void {
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
