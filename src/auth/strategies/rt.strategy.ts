import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Injectable, ForbiddenException } from "@nestjs/common";
import { JwtPayload, JwtPayloadWithRt } from "../types";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : config.get<string>("rt-secret"),
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
        const refreshToken = req
        ?.get('authorization')
        ?.replace('Bearer', '')
        .trim();

        if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

        return {
            ...payload,
            refreshToken,
        }
    }
}