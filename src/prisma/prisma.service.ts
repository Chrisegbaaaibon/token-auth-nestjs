import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
extends PrismaClient
implements OnModuleInit, OnModuleDestroy 
{
    constructor() {
        super({
            datasources:{
                db: {
                    url: "mongodb+srv://GhostX:johndoe123@cluster0.fflz9yk.mongodb.net/token-based?retryWrites=true&w=majority"
                }
            }
        });
    }
    
    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
    
}
