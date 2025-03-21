import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { drizzleProvider } from './drizzle.provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ...drizzleProvider],
})
export class AppModule {}
