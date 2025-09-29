import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as trpcExpress from "@trpc/server/adapters/express";
import { TrpcService } from "./trpc/trpc.service";

async function bootstrap() {
  let port = Number(process.env.PORT) || 4000;
  while (true) {
    const app = await NestFactory.create(AppModule);
    try {
      const trpc = app.get(TrpcService);
      app.use(
        "/trpc",
        trpcExpress.createExpressMiddleware({
          router: trpc.router,
          createContext: () => ({}),
        })
      );
      await app.listen(port);
      console.log(`Nest application listening on port ${port}`);
      console.log(`🚀 App running on http://localhost:${port}/trpc`);
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
