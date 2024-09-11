import { createHash } from 'crypto';
import { createClient } from '../utils/supabase/client'; // Adjust the path as needed

const hashPassword = (password: string): string => {
  return createHash('sha256').update(password).digest('hex');
};

export async function verifyPassword(email: string, password: string): Promise<boolean> {
  try {
    const { data, error } = await createClient()
      .from('UserAccess') // Adjust the table name as needed
      .select('*')
      .eq('Emailid', email)
      .single();

    if (error || !data) {
      return false; // User not found or error in query
    }

    const hashedPassword = hashPassword(password);
    return hashedPassword === data.pwd;
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}
