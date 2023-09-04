export const environment = {
  production: false,
  database: {
    connectionLimit : 10,
    host     : 'hut-postgres',
    port     : 5432,
    user     : 'postgres',
    password : 'pgpass',
    database : 'alpinehut_db'
  },
  sessionSecret: "qAwertd0hyuiop_12355445ererh67vbvF89",
  passwordStaticHash: "w0rbw@@t_btb3!45bb*45+tbn-",
  jwtSecretKey: 'secretKey',
};
