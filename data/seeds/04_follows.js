const defaultFollows = [
  // { user_id: 1,  following_user_id: 1 },
  { user_id: 1,  following_user_id: 2 },
  { user_id: 1,  following_user_id: 3 },
  // { user_id: 1,  following_user_id: 4 },

  { user_id: 2,  following_user_id: 1 },
  // { user_id: 2,  following_user_id: 2 },
  // { user_id: 2,  following_user_id: 3 },
  // { user_id: 2,  following_user_id: 4 },

  { user_id: 3,  following_user_id: 1 },
  { user_id: 3,  following_user_id: 2 },
  // { user_id: 3,  following_user_id: 3 },
  { user_id: 3,  following_user_id: 4 },

  // { user_id: 4,  following_user_id: 1 },
  // { user_id: 4,  following_user_id: 2 },
  // { user_id: 4,  following_user_id: 3 },
  // { user_id: 4,  following_user_id: 4 },
];

exports.users = defaultFollows;

exports.seed = function (knex) {
  return knex('follows').insert(defaultFollows);
};