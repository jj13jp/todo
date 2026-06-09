import { NestFactory } from "@nestjs/core"
import { AppModule } from "@/app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const corsOrigin = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    // 3001は本番環境、5173は開発環境
    : ["http://localhost:3001", "http://localhost:5173"]
  app.enableCors({ origin: corsOrigin })
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
