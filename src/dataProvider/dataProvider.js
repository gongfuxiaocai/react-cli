import { Post } from 'Components/request/index';

// const baseUrl = "http://192.168.1.132:8080/data-base";

let urls = {
  login: '/login-validate'
};

function login( requestData ) {
  return Post( urls.login, requestData );
}

export default {
  login,
};