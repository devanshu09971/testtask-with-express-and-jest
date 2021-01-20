import {createLogger, format, transports} from 'winston'
export class CutomLogger{
    static logger = createLogger({
        level: 'info',
        format: format.json(),

        transports: [
        new transports.File({ filename: 'log/errors.log'}),
        new transports.Console()
        ]
    });
}