

export interface ILogger {
    logError(message: string): void
    logInfo(message: string): void
    logWarning(message: string): void
    log(message: string): void
}