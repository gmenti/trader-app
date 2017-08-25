import asyncRequest from '../asyncRequest';
import config from './config';

const baseUrl = config.baseUrl + "tweet";

export default {
  async paginated(page) {
    const response = await asyncRequest({
      method: 'GET',
      url: baseUrl + '?page=' + page,
    });

    return response.body;
  },
};
