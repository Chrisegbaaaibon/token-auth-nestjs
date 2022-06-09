import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
    constructor() {}

    async createTodo() {
        return 'This action adds a new todo.';
    }

    async updateTodo() {
        return 'This action updates a todo.';
    }

    async deleteTodo() {
        return 'This action deletes a todo.';
    }

    async getTodo() {
        return 'This action gets a todo.';
    }
}
