import { Module } from '@nestjs/common';
import { ApiController, AppController } from './contrellers';
import { ApiService } from './services/api.service';
import { drizzleProvider } from './drizzle.provider';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api{*test}'],
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
  ],
  controllers: [ApiController, AppController],
  providers: [ApiService, ...drizzleProvider],
})
export class AppModule {}
