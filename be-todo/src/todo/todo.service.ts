import { Injectable } from "@nestjs/common"
import { CreateTodoDto } from "@/todo/dto/create-todo.dto"
import { UpdateTodoDto } from "@/todo/dto/update-todo.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { Todo } from "@/todo/entities/todo.entity"
import { Repository } from "typeorm"

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) { }

  create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodoDto)
    return this.todoRepository.save(todo)
  }

  findAll() {
    return this.todoRepository.find()
  }

  findOne(id: number) {
    return this.todoRepository.findOneBy({ id })
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.todoRepository.update(id, updateTodoDto)
  }

  remove(id: number) {
    return this.todoRepository.delete(id)
  }
}
