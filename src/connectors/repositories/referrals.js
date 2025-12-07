import { requestApi } from 'connectors/api';
import { BaseRepository } from 'connectors/repositories/base';

class Repository extends BaseRepository {
  getReferralInfo = address =>
    requestApi(
      'get',
      `${this.path}/user/${address}/info?include=details,stats,balances`
    );
  getPrices = address =>
    requestApi('get', `${this.path}/user/${address}/pricing-details`);
  getWithdrawStatuses = address =>
    requestApi('get', `${this.path}/user/${address}/withdrawals`);
  withdrawRewards = data =>
    requestApi('post', `${this.path}/user/withdraw`, data);
}

export const ReferralsRepository = new Repository('');
