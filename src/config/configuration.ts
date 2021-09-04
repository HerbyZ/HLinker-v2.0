export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    uri: process.env.DATABASE_URI,
  },
});
