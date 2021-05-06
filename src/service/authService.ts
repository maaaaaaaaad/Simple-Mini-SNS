import { firebaseApp, githubProvider, googleProvider } from "./firebaseSet";

class AuthServcie {
  diffLogin(
    providerName: string
  ): Promise<firebase.default.auth.UserCredential> {
    const provider = this.getProvider(providerName);
    return firebaseApp.auth().signInWithPopup(provider);
  }

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

  getProvider(providerName: string) {
    switch (providerName) {
      case "Continue Google":
        return googleProvider;
      case "Continue Github":
        return githubProvider;
      default:
        throw new Error(`Not vaild ${providerName}`);
    }
  }
}

export default AuthServcie;
