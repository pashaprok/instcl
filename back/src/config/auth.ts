export const authConfig = {
  bcrypt: {
    saltRounds: 12,
  },
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET || 'secret_access',
    expire: +process.env.JWT_ACCESS_EXPIRES_IN || 15, // in minutes
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET || 'secret_refresh',
    expire: +process.env.JWT_REFRESH_EXPIRES_IN || 1, // in weeks
  },
};
