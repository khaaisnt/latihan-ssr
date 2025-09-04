"use server";

import * as jose from "jose";

/**
 * Verify and decrypt a role JWT
 * @param token JWT containing encrypted role
 * @returns The role string or null if invalid
 */
export const decryptRole = async (role: string): Promise<string | null> => {
  try {
    const secret = new TextEncoder().encode(process.env.CHIPER_KEY);
    const { payload } = await jose.jwtVerify(role, secret);
    return payload.role as string;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};