import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { reportProviders, repStatProviders } from './app.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [
    ...reportProviders,
    ...repStatProviders,
    AppService,
  ],
})
export class AppModule {}
