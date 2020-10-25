exports.up = function(knex) {
    return knex.schema
        .hasTable('githubUsers')
        .then(exists => {
            if (!exists) {
                return knex.schema
                    .createTable('githubUsers',function(table){
                      table.increments('userId').primary()
                      table.string('githubId').notNullable()
                      table.string('name').notNullable()
                      table.string('username').notNullable()
                      table.string('profilePhoto')
                      table.timestamp('created_at').defaultTo(knex.fn.now())
                      table.timestamp('updated_at').defaultTo(knex.fn.now()) 
                  })
                  .then(() => {
                      console.log('githubUsers table created ...')
                  })
            }
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable('githubUsers')	
};