module.exports = {
    development: {
        client: "mysql",
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'banner',
            database: 'loginPage'
        },
        migrations: {
            directory: __dirname + "/db/migrations"
        },
        seeds: {
            directory: __dirname + "/db/seeds"
        }
    },
    production: {
        client: "mysql",
        connection: "mysql://root:banner@localhost:3000/loginPage",
        }
};