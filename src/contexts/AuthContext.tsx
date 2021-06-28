import { ReactNode, createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { firebase, auth } from '../services/firebase';
import { ThemeContextProvider } from './ThemeContext';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  userLoading: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        const { displayName, photoURL, uid } = currentUser;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    });

    setLoading(false);
    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    try {
        setLoading(true);
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

        if (result.user) {
          const { displayName, photoURL, uid } = result.user;

          if (!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.');
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          });
        }
    } catch {
      toast.error('Ocorreu um erro ao vincular sua conta Google');
    } finally {
      toast.success('Você entrou! Seja bem-vindo(a)')
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      setLoading(true);
      await auth.signOut();
      setUser({} as User)
    } catch {
      toast.error('Ocorreu um erro ao sair da sua conta.')
    } finally {
      setLoading(false);
      toast.success('Você saiu!')
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, userLoading: loading, signOut }}>
      <ThemeContextProvider>
        {children}
      </ThemeContextProvider>
    </AuthContext.Provider>
  );
}
