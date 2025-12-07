import { requestApi } from 'connectors/api';

export class BaseRepository {
  constructor(path) {
    this.path = path;
  }
  get = id => {
    return requestApi('get', `${this.path}/${id}`);
  };
}
