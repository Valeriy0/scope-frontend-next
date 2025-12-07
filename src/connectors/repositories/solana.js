import { requestApi } from 'connectors/api';
import { BaseRepository } from 'connectors/repositories/base';

class Repository extends BaseRepository {
  getPaymentStatus = signature =>
    requestApi(
      'post',
      `${this.path}/payment-force-updated/${signature}/status`
    );
}

export const SolanaRepository = new Repository('');
