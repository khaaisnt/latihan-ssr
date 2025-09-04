import { cookies } from 'next/headers';

// Set cookie di server
export const setServerCookie = async (
  name: string, 
  value: string, 
  options: {
    maxAge?: number;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  } = {}
): Promise<void> => {
  try {
    const cookieStore = await cookies();
    cookieStore.set({
      name,
      value,
      maxAge: options.maxAge || 60 * 60 * 24 * 7, // 7 days default
      path: options.path || '/',
      secure: options.secure ?? true,
      httpOnly: options.httpOnly ?? true,
      sameSite: options.sameSite || 'strict',
    });
  } catch (error) {
    console.error('Error setting server cookie:', error);
  }
};

// Get cookie dari server
export const getServerCookie = async (name: string): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value || null;
  } catch (error) {
    console.error('Error getting server cookie:', error);
    return null;
  }
};

// Remove cookie di server
export const removeServerCookie = async (name: string): Promise<void> => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  } catch (error) {
    console.error('Error removing server cookie:', error);
  }
};

// Get all cookies untuk API requests
export const getServerCookieHeader = async (): Promise<string> => {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    return allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
  } catch (error) {
    console.error('Error getting cookie header:', error);
    return '';
  }
};