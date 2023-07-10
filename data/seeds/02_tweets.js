const defaultTweets = [
  { content: 'Bugün hava çok sıcak.', likes: 8, user_id: 1 },
  { content: 'Bugün hava çok soğuk.', likes: 5, user_id: 1 },
  { content: 'Bugün hava güneşli.', likes: 5, user_id: 2 },
  { content: 'Bugün hava bulutlu', likes: 70, user_id: 3 },
  { content: 'Bugün hava yağmurlu.', likes: 8552, user_id: 4 },
  { content: 'Bugün hava çok nemli', likes: 0, user_id: 4 },
  { content: 'Bugün hava parçalı bulutlu.', likes: 8, user_id: 4 },
];

exports.users = defaultTweets;

exports.seed = function (knex) {
  return knex('tweets').insert(defaultTweets);
};
