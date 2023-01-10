import aryeoClient from './AryeoClient';

const aryeoRequest = async function (options) {
  try {
    const result = await aryeoClient({
      ...options,
      validateStatus: function (status) {
        return status >= 200 && status <= 299;
      },
    });

    return { result: result.data, error: null };
  } catch (error) {
    if (error.response) {
      const responseData = error.response.data;
      const responseStatus = error.response.status;

      var errorMessage = 'A ' + String(responseStatus) + ' occurred.';
      if (responseData.message) {
        errorMessage = responseData.message;
      } else if (responseData.data) {
        errorMessage = Object.values(responseData.data).join('\n');
      }

      return { result: null, error: errorMessage };
    } else {
      return { result: null, error: error.message };
    }
  }
};

export default aryeoRequest;
