import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("Sample microservice API")
    .setDescription("coding skills assessment")
    .setVersion("1.1")
    .addTag("coding-test")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);
  await app.listen(3030);
}
bootstrap();
