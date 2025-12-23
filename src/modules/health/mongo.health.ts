import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { getDb } from '../../shared/db/mongo.client';

@Injectable()
export class MongoHealthIndicator extends HealthIndicator {
    async isHealthy(key: string): Promise<HealthIndicatorResult> {
        try {
            const db = getDb();
            await db.command({ ping: 1 });
            return this.getStatus(key, true);
        } catch (error) {
            throw new HealthCheckError(
                'MongoDB check failed',
                this.getStatus(key, false, { message: error.message }),
            );
        }
    }
}
