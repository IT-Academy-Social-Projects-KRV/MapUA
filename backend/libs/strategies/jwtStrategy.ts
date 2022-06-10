import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';

const jwtStrategy = new JWTstrategy(
  {
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  async (token, done) => {
    try {
      return done(null, { _id: token._id, role: token.role });
    } catch (error) {
      done(error);
    }
  }
);

export default jwtStrategy;
