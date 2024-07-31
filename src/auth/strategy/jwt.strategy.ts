import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY || 'Ekj1a03mOJa6AAJxwE95pZnHopvzWo',
    });
  }

  async validate(payload: any) {
    //this can be caught in Request pipeline
    return {
      id: payload.id,
      phone: payload.phone,
      role: payload.role,
    };
  }
}
