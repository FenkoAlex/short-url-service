import { Module } from '@nestjs/common';
import { ApiController, AppController } from './contrellers';
import { AppService } from './services/api.service';
import { drizzleProvider } from './drizzle.provider';

@Module({
  imports: [],
  controllers: [AppController, ApiController],
  providers: [AppService, ...drizzleProvider],
})
export class AppModule {}
