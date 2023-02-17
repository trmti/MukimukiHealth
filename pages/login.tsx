import type { NextPage } from 'next';
import useLogin from '../utils/useLogin';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
  const [login, loggedIn, loading] = useLogin();
  const router = useRouter();

  return (
    <>
      <button
        onClick={async () => {
          await login('test@sample.com', '1234567');
          router.push('/ideal');
        }}
      >
        Login
      </button>
      {loading ? <p>loading...</p> : <></>}
    </>
  );
};

export default Login;
