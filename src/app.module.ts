import { Module } from '@nestjs/common';
import { ApiController } from './contrellers';
import { AppService } from './services/api.service';
import { drizzleProvider } from './drizzle.provider';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

console.log(__dirname);
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/{*test}'],
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
  ],
  controllers: [ApiController],
  providers: [AppService, ...drizzleProvider],
})
export class AppModule {}
