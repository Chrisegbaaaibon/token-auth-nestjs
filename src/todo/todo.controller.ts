import { Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/common/decorators';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Post('create')
    async createTodo() {
        this.todoService.createTodo();
        return 'This action adds a new todo.';
    }

    @Post('update')
    async updateTodo() {
        this.todoService.updateTodo();
    }

    @Post('delete')
    async deleteTodo() {
        this.todoService.deleteTodo();
        return 'This action deletes a todo.';
    }

    @Public()
    @Post('get')
    async getTodo() {
        this.todoService.getTodo();
    }
}
