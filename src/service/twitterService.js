import traderTwitter from '../integration/trader/twitter';

const twitters = [];
const all = () => twitters;
const findById = id => twitters.find(twitter => twitter.id === id);

const fetch = async () => {
  const twittersResponse = await traderTwitter.all();

  for (const twitterResponse of twittersResponse) {
    const twitter = findById(twitterResponse.id);

    if (twitter) {
      Object.keys(twitterResponse).forEach((key) => {
        twitter[key] = twitterResponse[key];
      });
    } else {
      twitters.push(twitterResponse);
    }
  }
};

(async () => {
  await fetch();
})();

setInterval(async () => {
  await fetch();
}, 1800000 /* 30 min */);

export default {
  all,
  findById,
};
