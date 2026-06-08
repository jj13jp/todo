import { NestFactory } from "@nestjs/core"
import { AppModule } from "@/app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // 3001は本番環境、5173は開発環境
  app.enableCors({ origin: ["http://localhost:3001", "http://localhost:5173"] })
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
