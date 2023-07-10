const defaultComments = [
  { content: 'Kesinlikle katılıyorum...', likes: 1, user_id: 1, tweet_id: 1 },
  { content: 'Bu söylediğine katılmıyorum...', likes: 8, user_id: 1, tweet_id: 3 },
  { content: 'Evet ya bence de öyle.', likes: 55, user_id: 2, tweet_id: 3 },
  { content: 'Paylaştıklarına katılmıyorum.', likes: 111, user_id: 3, tweet_id: 2 },
  { content: 'Paylaşımın için teşekkürler.', likes: 99, user_id: 4, tweet_id: 4 },
  { content: 'Söylediğin şey çok doğru.', likes: 0, user_id: 4, tweet_id: 2 },
  { content: 'Bu dünya ne sana ne de bana kalmaz.', likes: 0, user_id: 4, tweet_id: 4 },
  { content: 'Sen bir hancı ol, ben bir yolcu...', likes: 0, user_id: 4, tweet_id: 3 },
];

exports.users = defaultComments;

exports.seed = function (knex) {
  return knex('comments').insert(defaultComments);
};