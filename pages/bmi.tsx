import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { setUserData } from '../utils/set';
import { useAuthContext } from '../utils/AuthContext';
import Form from '../moleculs/bmi';

const BMI: NextPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const onClick = async (height: number, weight: number, percentage: number) => {
    if (user?.email) {
      await setUserData(user.email, weight, height, percentage);
      router.push('/ideal');
    }
  } ;

  return (
    <Form onClick={onClick} />
  );
};

export default BMI;