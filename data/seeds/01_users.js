const defaultUsers = [
  { name: 'aytac', email: 'aytac@aytac.com.tr', nick: 'aytac', role: 'admin', password: '1234' },
  { name: 'ali', email: 'ali@ali.com.tr', nick: 'ali_2000', role: 'user', password: '1234' },
  { name: 'veli', email: 'veli@veli.com.tr', nick: 'veli4950', role: 'user', password: '1234' },
  { name: 'osman', email: 'osman@osman.com.tr', nick: 'osmancik', role: 'user', password: '1234' },
  { name: 'mahmut', email: 'mahmut@mahmut.com.tr', nick: 'kel_mahmut', role: 'user', password: '1234' },
];

exports.users = defaultUsers;

exports.seed = function (knex) {
  return knex('users').insert(defaultUsers);
};
