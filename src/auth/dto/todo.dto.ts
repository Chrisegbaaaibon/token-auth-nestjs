import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class TodoDto {
    @IsString()
    @IsNotEmpty()
    description:string;


    
    @IsString()
    @IsNotEmpty()
    userId:string;

    @IsString()
    id: string;

    completed: boolean;
}