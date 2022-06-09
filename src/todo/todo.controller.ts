import { Body, Controller, HttpCode, Post, HttpStatus, Param, Patch } from '@nestjs/common';
import { Public } from 'src/auth/common/decorators';
import { TodoService } from './todo.service';
import { TodoDto } from '../auth/dto';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}
    
    @Public()
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createTodo(@Body() dto: TodoDto): Promise<any> {
        return this.todoService.createTodo(dto)
    }

    @Public()
    @Patch('update/:id')
    @HttpCode(HttpStatus.OK)
    async updateTodo(@Body() dto: TodoDto, @Param() id: string ) {
        this.todoService.updateTodo(dto, id);
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
