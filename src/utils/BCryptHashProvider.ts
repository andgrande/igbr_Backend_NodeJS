import { hash, compare } from 'bcrypt';
import hashProviderDTO from '../dtos/hashProviderDTO';

class BCryptHashProvider implements hashProviderDTO {
  public async generateHash(payload: string): Promise<string> {
    console.log('ola');
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptHashProvider;
