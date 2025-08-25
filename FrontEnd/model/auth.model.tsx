export interface LoginCredentials {
  username: string;
  password: string;
}

export interface Signup {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface JwtPayload {
  sub: string; // username or user ID
  roles: string[]; // roles array
  exp: number; // expiration timestamp
  token: string;
}
