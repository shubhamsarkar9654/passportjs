exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name:'banner',emailId:'banner@gmail.com',password:'123'},
        {name:'hulk',emailId:'hulk@gmail.com',password:'123'}
      ]);
    });
};
