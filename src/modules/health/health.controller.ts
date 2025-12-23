import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';
import { MongoHealthIndicator } from './mongo.health';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private mongo: MongoHealthIndicator,
        private memory: MemoryHealthIndicator,
    ) { }

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.mongo.isHealthy('database'),
            () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // 150MB
        ]);
    }
}
