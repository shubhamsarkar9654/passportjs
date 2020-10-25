exports.up = function(knex) {
  	return knex.schema
  		.hasTable('googleUsers')
  		.then(exists => {
  			if (!exists) {
  				return knex.schema
  					.createTable('googleUsers',function(table){
						table.increments('userId').primary()
						table.string('googleId').notNullable()
						table.string('name').notNullable()
						table.string('username').notNullable()
						table.string('profilePhoto')
						table.timestamp('created_at').defaultTo(knex.fn.now())
					    table.timestamp('updated_at').defaultTo(knex.fn.now()) 
					})
					.then(() => {
						console.log('googleUsers table created ...')
					})
  			}
  		})
};

exports.down = function(knex) {
  	return knex.schema.dropTable('googleUsers')	
};