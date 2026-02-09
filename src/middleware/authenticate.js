import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  if (!req.cookies.accessToken) {
    throw createHttpError(401, 'No access token 1');
  }
  const session = await Session.findOne({
    //_id: req.cookies.sessionId,

    accessToken: req.cookies.accessToken,
  });
  if (!session) {
    throw createHttpError(401, 'No access token 2');
  }
  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    throw createHttpError(401, 'Access token is expired');
  }
  const user = await User.findById(session.userId);
  if (!user) {
    throw createHttpError(401, 'No valid user');
  }
  //нам потрібно знати, який користувач зараз хоче отримати длступ до студентів
  req.user = user;
  next();
};
