import { Module } from "@nestjs/common"
import { AppController } from "@/app.controller"
import { AppService } from "@/app.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TodoModule } from "@/todo/todo.module"
import { Todo } from "@/todo/entities/todo.entity"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST ?? "localhost",
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? "root",
      password: process.env.DB_PASSWORD ?? "password",
      database: process.env.DB_NAME ?? "todo",
      entities: [Todo],
      synchronize: false,
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
