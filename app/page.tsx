import Board from './components/Board';
import styles from './page.module.css';
import StoreProvider from '@/app/StoreProvider';

export default function Home() {
  return (
    <div className={styles.page}>
      <StoreProvider>
        <Board />
      </StoreProvider>
    </div>
  );
}
