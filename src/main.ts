import { NestFactory } from "@nestjs/core"
import { type MicroserviceOptions, Transport } from "@nestjs/microservices"
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from "./app.module"

async function bootstrap() {
  // Create HTTP application
  const app = await NestFactory.create(AppModule)

   const config = new DocumentBuilder()
    .setTitle('Internship API')
    .setDescription('API documentation for the Internship microservice')
    .setVersion('1.0')
    .addTag('internships')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Access Swagger UI at /api

  // Connect RabbitMQ microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL ?? "amqp://localhost:5672"],
      queue: "user_created",
      queueOptions: {
        durable: true,
      },
    },
  })

  // Start both HTTP server and microservice
  await app.startAllMicroservices()
  await app.listen(process.env.PORT ?? 8002)

  console.log(`Internship service running on port ${process.env.PORT ?? 8002}`)
  console.log("RabbitMQ microservice listener started")
}
bootstrap()
