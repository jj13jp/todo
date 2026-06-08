import { Module } from "@nestjs/common"
import { TodoService } from "@/todo/todo.service"
import { TodoController } from "@/todo/todo.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Todo } from "@/todo/entities/todo.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
