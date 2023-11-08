import { createContext, useState } from "react";
import { UserType } from "../../types/user.type";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
} from "react-native-dotenv";
// Firebase
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  initializeAuth,
  onAuthStateChanged,
  signOut,
  getReactNativePersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

type AuthenticationContextType = {
  isAuthenticated: boolean;
  user: Partial<UserType>;
  isLoading: boolean;
  error: any;
  onLogin: (email?: string, password?: string) => void;
  onRegister: (
    email?: string,
    password?: string,
    repeatedPassword?: string
  ) => void;
  onLogout: () => void;
};

export const AuthenticationContext = createContext<AuthenticationContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  onLogin: () => {},
  onRegister: () => {},
  onLogout: () => {},
});

export const AuthenticationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<Partial<UserType>>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  onAuthStateChanged(auth, (user: Partial<UserType>) => {
    if (user) {
      setUser(user);
    }
  });

  const onLogin = (email = "", password = "") => {
    setIsLoading(true);
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials: any) => {
        setIsLoading(false);
        if (!userCredentials) {
          setError("Invalid email or password");
          return;
        }
        setUser(userCredentials?.user);
        setError("");
      })
      .catch((error: any) => {
        console.log({ error });
        setIsLoading(false);
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const onRegister = (email = "", password = "", repeatedPassword = "") => {
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    setError("");
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        const user = userCredential?.user;
        setUser(user);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const onLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setError("");
      })
      .catch((error: any) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
