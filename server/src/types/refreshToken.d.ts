export interface NewRefreshToken {
  userId: string;
  token: string;
  expiresAt: Date;
  revoked: boolean;
  // TODO add user_agent and ip_address	for session tracking or anomaly detection
}
