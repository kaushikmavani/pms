import "dotenv/config"
import messages from "./messages"

const config = {
  app: {
    appName: process.env.APP_NAME,
    port: process.env.PORT || "3000",
    nodeEnv: process.env.NODE_ENV || "production",
  },
  db: {
    type: process.env.DB_TYPE || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_DATABASE,
  },
  auth: {
    jwtSecret: "WG00SXN1UUAXF6Nu5ujIDp7pOr752wAgj9cOOqsG4xadres+G6rLU0eP/wjwGU6YYW0=",
    jwtExpiresIn: "1d",
    bcryptSaltLength: 10,
  },
  messages,
}

export default config
