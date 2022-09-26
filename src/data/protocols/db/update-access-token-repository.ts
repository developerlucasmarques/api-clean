export interface UpdateAccessTokenRepository {
  updateAcceesToken(id: string, token: string): Promise<void>;
}
