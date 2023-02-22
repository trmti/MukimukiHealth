import type { NextPage } from 'next';
import styles from './Logo.module.css';

const Logo: NextPage<{}> = ({ }) => {
    return (
        <div className={styles.wrapper}>
            <h1>ムキムキヘルス</h1>
            <img src="logo2.png" alt="logo" />
        </div>
    );
};

export default Logo;
