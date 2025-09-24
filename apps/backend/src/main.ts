import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  let port = Number(process.env.PORT) || 4000;
  while (true) {
    const app = await NestFactory.create(AppModule);
    try {
      await app.listen(port);
      console.log(`Nest application listening on port ${port}`);
      break;
    } catch (err: any) {
      if (err && err.code === 'EADDRINUSE') {
        console.warn(`Port ${port} in use — trying port ${port + 1}`);
        await app.close();
        port += 1;
        continue;
      }
      throw err;
    }
  }
}
bootstrap();
