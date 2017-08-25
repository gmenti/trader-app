import asyncRequest from '../asyncRequest';
import config from './config';

const baseUrl = config.baseUrl + "currency";

export default {
  async all() {
    const response = await asyncRequest({
      method: 'GET',
      url: baseUrl,
    });

    return response.body;
  },
};
