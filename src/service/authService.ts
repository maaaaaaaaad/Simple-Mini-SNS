import { firebaseApp } from "./firebaseSet";

class AuthServcie {
  createAccount(email: string, password: string) {
    return firebaseApp.auth().createUserWithEmailAndPassword(email, password);
  }

  signInWithAccount(email: string, password: string) {
    return firebaseApp.auth().signInWithEmailAndPassword(email, password);
  }

  onStateChanged(userState: Function) {
    return firebaseApp.auth().onAuthStateChanged((user) => userState(user));
  }

  logout() {
    firebaseApp.auth().signOut();
  }
}

export default AuthServcie;
