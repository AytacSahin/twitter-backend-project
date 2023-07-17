const defaultUsers = [
  { name: 'aytac', email: 'aytac@aytac.com.tr', nick: 'aytac', role: 'admin', password: '$2a$08$394J9.utNucp1CayyYxtdej8Ck27wDV9BTsUrhRMfJsfoFyqyUh8a' },
  { name: 'ali', email: 'ali@ali.com.tr', nick: 'ali_2000', role: 'user', password: '$2a$08$oEDm4/Zi3sqKpjaHdz/nTeLUb/W6hAifdol8enetd098lUjo/eBv2' },
  { name: 'veli', email: 'veli@veli.com.tr', nick: 'veli4950', role: 'user', password: '$2a$08$E7V0WdSs0onF3WkID/U/U..SzXEV4TgI6/lfBYqTvz5JcX95GLh3K' },
  { name: 'osman', email: 'osman@osman.com.tr', nick: 'osmancik', role: 'user', password: '$2a$08$NPIces6OjXaFjBEO6mYSNuclmktotIeAiDTf7/FjZPjh.wkytDF0q' },
  { name: 'mahmut', email: 'mahmut@mahmut.com.tr', nick: 'kel_mahmut', role: 'user', password: '$2a$08$q.6NHXYsRLaGvwEdK3g.y./XTYZI9zMZr4iguW5.s9i.HbDjjDfhi' },
];

exports.users = defaultUsers;

exports.seed = async function (knex) {
  await knex('users').truncate()
  await knex('users').insert(defaultUsers);
}; 
