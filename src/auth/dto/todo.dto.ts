import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class TodoDto {
    @IsString()
    @IsNotEmpty()
    description:string;


    
    
    id: string;

    completed: boolean;
}