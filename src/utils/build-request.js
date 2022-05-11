import ky from 'ky';

const buildRequest = async (method, url, accessToken, data = {}) => {
  let csrfToken = undefined;

  try {
    await ky.get(`${process.env.REACT_APP_BASE_URL}/sanctum/csrf-cookie`, {
      credentials: 'include',
    });

    csrfToken = document.cookie
      .split(';')
      .find(row => row.startsWith('XSRF-TOKEN='))
      .split('=')[1];
  } catch (error) {
    throw new Error(error);
  }

  const api = ky.extend({
    hooks: {
      beforeRequest: [
        request => {
          request.headers.set('X-XSRF-TOKEN', decodeURIComponent(csrfToken));
        },
        request => {
          if (accessToken) {
            request.headers.set('Authorization', `Bearer ${accessToken}`);
          }
        },
        // request => {
        //   request.headers.set('X-SOCKET-ID', '')
        // },
      ],
    },
  });

  try {
    let json = null;

    switch (method) {
      case 'get':
        json = await api.get(url).json();
        break;
      case 'post':
        json = await api
          .post(url, {
            json: data,
            throwHttpErrors: false,
            credentials: 'include',
          })
          .json();
        break;
      case 'patch':
        json = await api
          .patch(url, {
            json: data,
            throwHttpErrors: false,
            credentials: 'include',
          })
          .json();
        break;
      case 'delete':
        json = await api.delete(url).json();
        break;
      default:
        break;
    }
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

export default buildRequest;

// authorizer: (channel, options) => {
      //   return {
      //     authorize: (socketId, callback) => {
      //       buildRequest(
      //         'post',
      //         `${process.env.REACT_APP_BASE_URL}/broadcasting/auth`,
      //         accessToken,
      //         {
      //           socket_id: socketId,
      //           channel_name: channel.name,
      //         }
      //       )
      //         .then(response => {
      //           callback(false, response.data);
      //         })
      //         .catch(error => {
      //           callback(true, error);
      //         });
      //     },
      //   };
      // },