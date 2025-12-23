import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';
import { MongoHealthIndicator } from './mongo.health';

@Module({
    imports: [TerminusModule, HttpModule],
    controllers: [HealthController],
    providers: [MongoHealthIndicator],
})
export class HealthModule { }
