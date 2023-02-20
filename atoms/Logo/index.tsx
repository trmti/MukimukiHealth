import type { NextPage } from 'next';
import styles from './Logo.module.css';

const Logo: NextPage<{}> = ({ }) => {
    return (
        <div className={styles.wrapper}>
            <h1>ムキムキヘルス</h1>
            <img src="https://i.imgur.com/rXa2ozA.png" alt="" />
        </div>
    );
};

export default Logo;
