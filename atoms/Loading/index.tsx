import type { NextPage } from 'next';
import styles from './Loading.module.css';

const Loading: NextPage<{}> = ({ }) => {
    return (
        <div className={styles.wrapper}></div>
    );
};

export default Loading;
