import Resource from '@/api/resource';
import request from '@/utils/request';

class AuthResource extends Resource {
  login(resource) {
    return request({
      url: '/login',
      method: 'post',
      data: resource,
    });
  }
}

export { AuthResource as default };