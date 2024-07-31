import * as bcrypt from 'bcryptjs';

export class BcryptService {
  private static readonly saltRounds = 7;

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BcryptService.saltRounds);
  }

  async comparePassword(
    original_password: string,
    hashed_password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(original_password, hashed_password);
  }
}
