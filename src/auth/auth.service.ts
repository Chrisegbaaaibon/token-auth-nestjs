import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Tokens, JwtPayload } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
            private prisma: PrismaService,
            private jwtService: JwtService,
            private config: ConfigService
        ) {}
                
          
    async signup(dto: AuthDto): Promise<Tokens> {
        const password = await this.hashData(dto.password);
        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                password,
            }
        })
        const tokens = await this.getToken(newUser.id, newUser.email)
        await this.updateRtHash(newUser.id, tokens.refresh_token)
        return tokens
    }
           
            
        
        
    async signin(dto: AuthDto): Promise<Tokens> {
        const user = await this.prisma.user.findUnique({
            where:{
                email: dto.email
            }
        })

        if(!user) throw new ForbiddenException('Invalid credentials')

        const passwordMatch = await bcrypt.compare(dto.password, user.password)
        
        if(!passwordMatch) throw new ForbiddenException('Invalid credentials')

        const tokens = await this.getToken(user.id, user.email)
        await this.updateRtHash(user.id, tokens.refresh_token)
        return tokens
    }
    
    async signout(userId: string){
        await this.prisma.user.updateMany({
            where:{
                id: userId,
                hashedRT:{
                    not: null
                }
            },
            data:{
                hashedRT: null
            }
        })
        return true
    }
    
    async refresh(userId: string, rt: string): Promise<Tokens> {
        const user = await this.prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
        if (!user || !user.hashedRT) throw new ForbiddenException('Access Denied');
    
        const rtMatches = await bcrypt.compare(user.hashedRT, rt);
        if (!rtMatches) throw new ForbiddenException('Access Denied');
    
        const tokens = await this.getToken(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);
    
        return tokens;
      }
    
    
    async updateRtHash(userId: string, rt: string){
        const hash = await this.hashData(rt)
        await this.prisma.user.update({
            where:{
                id: userId
            },
            data:{
                hashedRT: hash
            }
        })
    }

    hashData(data: string){
        return bcrypt.hashSync(data, 10);
    }

    async getToken(userId: string , email: String){

        const jwtPayload: JwtPayload = {
            sub: userId,
            email: email,
          };
          const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
              secret: this.config.get<string>('at-secret'),
              expiresIn: '15m',
            }),
            this.jwtService.signAsync(jwtPayload, {
              secret: this.config.get<string>('rt-secret'),
              expiresIn: '7d',
            }),
          ]);
        return {
            access_token : at,
            refresh_token : rt
        }
    }
    

   
}
