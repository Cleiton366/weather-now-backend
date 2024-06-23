
declare global {
  namespace Express {
    interface User {
      id: string,
      username: string,
      name: string,
      picture: any
    }
  }
}

import express, { Router } from 'express';
import passport from 'passport';
import session from 'express-session';
import path from 'path';
import { UserController } from '../../controllers/UserController';

var SQLiteStore = require('connect-sqlite3')(session);
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const auth = Router();
const userController = new UserController();


passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/oauth2/redirect/google',
  scope: ['profile', 'email'],
}, async function (accessToken: any, refreshToken : any, profile : any, cb : any) {
  try {
    const userData = {
      id: profile.id,
      name: profile.displayName,
      profilePicture: profile.photos[0].value,
      email: profile.emails[0].value
    }
    const user = await userController.getUser(userData.id);
    if (!user) {
      const newUser = await userController.createUser(userData);
      return cb(null, newUser);
    } else {
      return cb(null, user);
    }
  } catch (error) {
    return cb(error, null);
  }
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, name: user.name });
  });
});

passport.deserializeUser(function(user : any, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

auth.use(express.static(path.join(__dirname, 'public')));
auth.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore()
}));
auth.use(passport.session());
auth.use(passport.authenticate('session'));
auth.use(passport.initialize());
auth.get('/auth/google', passport.authenticate('google'));

auth.get('/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: process.env.FRONTEND_URL }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/auth-success?user=${encodeURIComponent(JSON.stringify(req.user))}`);
  }
);

auth.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect(process.env.FRONTEND_URL || '/');
  });
});

export default auth;