import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Param,
  Patch,
  Delete,
  Get,
} from '@nestjs/common';
import { Public } from 'src/auth/common/decorators';
import { TodoService } from './todo.service';
import { TodoDto } from '../auth/dto';
import { Todo } from '@prisma/client';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Public()
  @Patch('create/:id')
  @HttpCode(HttpStatus.CREATED)
  async createTodo(
    @Body() dto: TodoDto,
    @Param('id') userId: string,
  ): Promise<Todo> {
    return this.todoService.createTodo(dto, userId);
  }

  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  async updateTodo(
    @Body() dto: TodoDto,
    @Param('id') todoId: string,
  ): Promise<Todo> {
    return this.todoService.updateTodo(dto, todoId);
  }

  @Delete('delete/:id')
  async deleteTodo(@Param('id') id: string): Promise<Todo> {
    // this.todoService.deleteTodo();
    return this.todoService.deleteTodo(id);
  }

  @Public()
  @Get()
  async getTodo(): Promise<Todo[]> {
    return this.todoService.getTodo();
  }
}
