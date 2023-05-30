import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto } from 'src/auth/dto';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async createTodo(dto: TodoDto, userId: string): Promise<any> {
    const createTodo = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        todos: {
          create: {
            description: dto.description,
          },
        },
      },
    });

    return {
      createTodo: createTodo,
    };
  }

  async updateTodo(dto: TodoDto, todoId: string): Promise<Todo> {
    return this.prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        description: dto.description,
        completed: dto.completed,
      },
    });
  }

  async deleteTodo(id: string): Promise<Todo> {
    return this.prisma.todo.delete({
      where: {
        id: id,
      },
    });
  }

  async getTodo(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }
}
