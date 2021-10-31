export enum LoggerType { Console, Database, File}
export enum LogLevel { Debug, Info, Warning, Error }

// The Logger class in this implementation breaks the Open/Close principle because
// it is not possible to extend the funcitonality without modification of the base
// implementation. In other words, if we were to add a new type of logging, this
// would need to be updated to add the new switch case. Therefore this class is not
// closed for modification. To conform to OCP the logger would need to be decoupled from
// the different implementations.
export class Logger {

	constructor(private readonly logType: LoggerType) { }

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

	error(message: string) {
		switch(+this.logType){
			case LoggerType.Console:
				console.error(message)
				break;
			case LoggerType.Database:
				// log to db, pretend this is implemented
				break;
			case LoggerType.File:
				// log to file, pretend this is implemented
				break;
		}
	}

	warning(message: string) {
		switch(+this.logType){
			case LoggerType.Console:
				console.warn(message)
				break;
			case LoggerType.Database:
				// log to db
				break;
			case LoggerType.File:
				// log to file
				break;
		}
	}

	debug(message: string) {
		switch(+this.logType){
			case LoggerType.Console:
				console.debug(message)
				break;
			case LoggerType.Database:
				// log to db
				break;
			case LoggerType.File:
				// log to file
				break;
		}
	}

	info(message: string) {
		switch(+this.logType){
			case LoggerType.Console:
				console.info(message)
				break;
			case LoggerType.Database:
				// log to db
				break;
			case LoggerType.File:
				// log to file
				break;
		}
	}

}
