import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function currentUser() {
  return request('/api/user/currentUser');
}

export async function registerReq(params) {
  return request('/api/user/register', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function loginReq(params) {
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  });
}
