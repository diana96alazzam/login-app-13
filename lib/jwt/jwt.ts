import { JWTPayload, SignJWT, jwtVerify } from "jose";

/**
 * Function to sign JWT which is called on login
 */
export const signJWT = async (payload: { sub: string }) => {
  try {
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const alg = "HS256";
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime("1h")
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(secret);
  } catch (error) {
    throw error;
  }
};

/**
 * Function to verify JWT token which is called on before protected endpoints
 */
export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    return (
      await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY))
    ).payload as T;
  } catch (error) {
    console.log(error);
    throw new Error("Error verifying token!");
  }
};
