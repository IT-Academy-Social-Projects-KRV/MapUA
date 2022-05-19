import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';

const jwtStrategy = new JWTstrategy(
  {
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  async (token, done) => {
    try {
      return done(null, token._id);
    } catch (error) {
      done(error);
    }
  }
);

export default jwtStrategy;
