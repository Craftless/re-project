import axios from "axios";

const API_KEY = "AIzaSyB9gIkbRc-zbcp75JhIrarBw_8hAz1pqME";

async function authenticate(
  mode: "signUp" | "logIn",
  email: string,
  password: string
) {
  let urlCont;
  switch (mode) {
    case "signUp":
      urlCont = "signUp";
      break;
    case "logIn":
      urlCont = "signInWithPassword";
      break;
  }
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${urlCont}?key=${API_KEY}`,
    { email: email, password: password, returnSecureToken: true }
  );
}

export function createUser(email: string, password: string) {
  authenticate("signUp", email, password);
}

export function logIn(email: string, password: string) {
  authenticate('logIn', email, password);
}