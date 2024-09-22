import {
  OidcAuth,
  IDToken,
  TokenEndpointResponses,
  revokeSession,
  processOAuthCallback,
  getAuth,
  oidcAuthMiddleware,
} from "@hono/oidc-auth";
import { OidcAuthClaims, Hono } from "hono";

declare module "hono" {
  interface OidcAuthClaims {
    name: string;
    sub: string;
    picture: string;
  }
}

/**
 * 通常取得できる情報から追加で取得できる情報を追加するhook。
 */
const oidcClaimsHook = async (
  orig: OidcAuth | undefined,
  claims: IDToken | undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _response: TokenEndpointResponses
): Promise<OidcAuthClaims> => {
  return {
    // アカウント名（フルネーム）
    name: (claims?.name as string) ?? orig?.name ?? "",
    // GoogleアカウントのID
    sub: claims?.sub ?? orig?.sub ?? "",
    // Googleアカウントのプロフィール画像
    picture: (claims?.picture as string) ?? orig?.picture ?? "",
  };
};

export const authApi = new Hono()
  .get("/logout", async (c) => {
    await revokeSession(c);

    return c.redirect("/");
  })
  .get("/callback", async (c) => {
    c.set("oidcClaimsHook", oidcClaimsHook);

    return processOAuthCallback(c);
  })
  .get("/isAuthenticated", async (c) =>
    c.json({
      isAuthenticated: await getAuth(c)
        .then((auth) => !!auth)
        .catch(() => false),
    })
  )
  .use(oidcAuthMiddleware());
