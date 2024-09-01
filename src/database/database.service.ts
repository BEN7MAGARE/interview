/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = new DataSource({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'moneytracker',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
            charset: 'utf8mb4',
        });
    }

    async initialize() {
        if (!this.dataSource.isInitialized) {
            await this.dataSource.initialize()
                .then(() => {
                    console.log('Data Source has been initialized!');
                })
                .catch((err) => {
                    console.error('Error during Data Source initialization:', err);
                    throw err; // Rethrow the error to handle it in tests if necessary
                });
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    getRepository(entity: Function) {
        if (!this.dataSource.isInitialized) {
            throw new Error('Data Source is not initialized.');
        }
        return this.dataSource.getRepository(entity);
    }

    async getQueryRunner() {
        if (!this.dataSource.isInitialized) {
            throw new Error('Data Source is not initialized.');
        }
        return this.dataSource.createQueryRunner();
    }

    async closeConnection() {
        if (this.dataSource.isInitialized) {
            await this.dataSource.destroy();
        }
    }
}
