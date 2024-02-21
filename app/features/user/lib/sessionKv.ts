export const saveSession = (kv: KVNamespace, sessionId: string, userId: string, expiresIn: number) =>
  kv.put(sessionId, userId, { expirationTtl: expiresIn });

export const getSession = (kv: KVNamespace, sessionId: string) => kv.get(sessionId);

export const clearSession = (kv: KVNamespace, sessionId: string) => kv.delete(sessionId);
