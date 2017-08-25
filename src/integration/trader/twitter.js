import config from './config';
import asyncRequest from '../asyncRequest';

const baseUrl = config.baseUrl + "twitter/";

export default {
  async all() {
    const response = await asyncRequest({
      url: baseUrl,
    });

    return response.body;
  },

  async findById(id) {
    const response = await asyncRequest({
      url: baseUrl + id,
    });

    return response.body;
  },

  async getTweets(twitterId) {
    const response = await asyncRequest({
      url: baseUrl + twitterId + "/tweets",
    });

    return response.body;
  }
};
