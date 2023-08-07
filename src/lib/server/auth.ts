import jwt from "jsonwebtoken";

export const auth = {
  verify,
  getUserId,
};

type JwtPayload = { sub: string; exp: number };

function verify(token: string): JwtPayload | false {
  try {
    if (!token || token.search("Bearer ") < 0) return false;

    const _token = token.replace("Bearer ", "");
    return jwt.verify(_token, process.env.JWT_SECRET!) as JwtPayload;
  } catch (error) {
    return false;
  }
}

function getUserId(token: string): string {
  try {
    if (!token || token.search("Bearer ") < 0) return "";

    const _token = token.replace("Bearer ", "");
    const payload = jwt.decode(_token) as JwtPayload;

    return payload.sub;
  } catch (error) {
    return "";
  }
}
