enum Mode {
  Development = 'DEV',
  Production = 'PROD',
}

export default () => ({
  mode: process.env.MODE as Mode,
  port: parseInt(process.env.PORT) || 3000,
  database: {
    uri: process.env.DATABASE_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
