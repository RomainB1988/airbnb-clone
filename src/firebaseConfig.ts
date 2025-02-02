import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkuORkd8sA-p8D8S1-xw6dUptjPH3pULM",
  authDomain: "airbnb-clone-915c4.firebaseapp.com",
  projectId: "airbnb-clone-915c4",
  storageBucket: "airbnb-clone-915c4.firebasestorage.app",
  messagingSenderId: "474894328567",
  appId: "1:474894328567:web:32a22923d2802da6f8e9f2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
