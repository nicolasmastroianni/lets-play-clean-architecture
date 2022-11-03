import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./config/all.exceptions.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SnakeCamelCaseInterceptor } from "./config/middleware/snake.camel.case.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalInterceptors(new SnakeCamelCaseInterceptor())
  const options = new DocumentBuilder()
    .setTitle("lets-play-clean-architecture example")
    .setDescription("infance's cartoons")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}

bootstrap();
