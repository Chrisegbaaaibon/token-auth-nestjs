import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto } from 'src/auth/dto';

@Injectable()
export class TodoService {
    constructor( private prisma: PrismaService) {}

    async createTodo(dto: TodoDto) { 
        const newTodo = await this.prisma.todo.create({
            data: {
                description: dto.description,
                userId: dto.userId,       
            }
            
        })
        const user = await this.prisma.user.findUnique({
            where:{
                id: dto.userId
            }
        })
        if(!user) throw new ForbiddenException('Please create a user first')
        
        return {
            id: newTodo.id,
            description: newTodo.description,
        }

    }

    async updateTodo(dto: TodoDto, id: string) {
       const updateTodo = await this.prisma.todo.update({
            where: {
                id: dto.id
            },
            data: {
                description: dto.description,
            }
        })
        return {
           updateTodo: updateTodo
        }
    }

    async deleteTodo() {
        return 'This action deletes a todo.';
    }

    async getTodo() {
        return 'This action gets a todo.';
    }
}
