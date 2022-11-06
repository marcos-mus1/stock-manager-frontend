import * as bcrypt from 'bcrypt';

export class PasswordUtil {
  public static async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }
}
