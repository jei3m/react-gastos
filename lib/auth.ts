import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";
import { nextCookies } from "better-auth/next-js";
 
export const auth = betterAuth({
    database: createPool({
        namedPlaceholders: true,
        host: process.env.HOST,
        // port: Number(process.env.PORT),
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        multipleStatements: true
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6 
    },
    plugins: [nextCookies()]
})