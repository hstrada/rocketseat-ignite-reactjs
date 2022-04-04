import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function Subscribe({ priceId }: SubscribeButtonProps) {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe Now
    </button>
  );
}
