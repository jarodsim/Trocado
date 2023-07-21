import { Request, Response } from "express";
import { errorLabels } from "../erros/labels";
import { isEmail } from "../utils/isEmail";
import { isPasswordStrong } from "../utils/isPasswordStrong";
import * as admin from "firebase-admin";

import * as firebaseAuth from "firebase/auth";

export default class AuthController {
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send(errorLabels.emailAndPasswordRequired);
    }

    if (!isEmail(email)) {
      return res.status(400).send(errorLabels.emailInvalid);
    }

    if (isPasswordStrong(password)) {
      return res.status(400).send(errorLabels.passwordWeak);
    }

    try {
      const auth = firebaseAuth.getAuth();
      const userRecord = await firebaseAuth.signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const {
        uid,
        displayName,
        email: userEmail,
        refreshToken,
      } = userRecord.user;

      const idToken = await auth.currentUser.getIdToken(true);

      return res.status(200).json({
        uid,
        displayName,
        email: userEmail,
        refreshToken,
        token: idToken,
      });
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          return res.status(401).send(errorLabels.invalidCredentials);
        default:
          return res.status(500).send(errorLabels.errorWhenAuthenticating);
      }
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      await admin.auth().revokeRefreshTokens(req["token"].uid);

      return res.status(200);
    } catch (error) {
      console.log(error);
      return res.status(500).send(errorLabels.errorWhenLoggingOut);
    }
  };
}
