import { Request, Response, NextFunction } from "express";
import { errorLabels } from "../erros/labels";
import * as admin from "firebase-admin";

// Função de middleware para validar o token
interface AuthenticatedRequest extends Request {
  token?: admin.auth.DecodedIdToken;
}
export async function validateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).send(errorLabels.tokenRequired);
  }

  const idToken = authorization.split(" ")[1];

  try {
    admin
      .auth()
      .verifyIdToken(idToken, true)
      .then((decodedToken) => {
        req.token = decodedToken;
        next();
      })
      .catch((error) => {
        if (error.code === "auth/id-token-revoked") {
          res.status(401).send(errorLabels.invalidToken);
        }
        res.status(401).send(errorLabels.invalidToken);
      });
  } catch (error) {
    res.status(401).send(errorLabels.invalidToken);
  }
}
