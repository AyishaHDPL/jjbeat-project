import bcrypt from "bcrypt";

// Hash a password
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10); // 10 = salt rounds
}

// Compare password
export async function comparePassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed);
}
