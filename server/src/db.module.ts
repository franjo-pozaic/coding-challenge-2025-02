import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Pool } from 'pg';

export const PG_CONNECTION_TOKEN = 'PG_CONNECTION';

@Module({
    imports: [ConfigModule],
    providers: [{
        provide: PG_CONNECTION_TOKEN,
        useFactory: async (configService: ConfigService) => {
            const pool = new Pool({
                user: configService.get('DB_USER'),
                database: configService.get('DB_NAME'),
                password: configService.get('DB_PASSWORD'),
                port: configService.get('DB_PORT')
            });
            return pool;
        },
        inject: [ConfigService]
    }],
    exports: [PG_CONNECTION_TOKEN]
})
export class DbModule {}