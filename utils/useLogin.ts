import { useState } from 'react';

function useLogin(): [
  (mail: string, pass: string) => Promise<void>,
  boolean,
  boolean
] {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function login(mail: string, pass: string) {
    setLoading(true);
    setLoggedIn(true);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    });
    setLoading(false);
  }

  return [login, loggedIn, loading];
}

export default useLogin;
