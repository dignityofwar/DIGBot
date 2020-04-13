import { ContainerModule } from 'inversify';
import { botModule } from '../bot';
import { databaseModule } from '../database';
import { commandModule } from '../commands';
import { getBool } from '../utils/env';
// import { statsModule } from '../stats';

export default class App {
    public readonly environment: string = process.env.NODE_ENV ?? 'development';

    /**
     * @type {boolean} Set to true when developing the application, this will provide more information for debugging
     */
    public readonly debug: boolean = getBool('DEBUG');

    public readonly modules: ContainerModule[] = [
        databaseModule,
        botModule,
        commandModule,
        // statsModule,
    ];
}
