import request from 'browser-request';

export default async (config) => new Promise((resolve, reject) => {
  request(config, (err, response) => {
    if (err) {
      reject(err);
    } else {
      response.body = JSON.parse(response.body);
      resolve(response);
    }
  });
});
