import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";

import { AppModule } from "./app.module";

async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  const app = await NestFactory.createMicroservice(AppModule, {
    // options: { port },
    transport: Transport.TCP
  });
  app.listen(() => console.log(`Microservice is listening on ${port}/TCP`));
}
bootstrap();
