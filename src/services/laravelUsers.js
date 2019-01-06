import request from '@/utils/request';
import {stringify} from "qs";

export async function laravelUserList(params) {
  return request(`/api/laravel/users/list?${stringify(params)}`)
}
