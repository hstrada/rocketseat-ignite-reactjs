import { useSession, signIn } from 'next-auth/react';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function Subscribe({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  const handleSubscription = () => {
    if (!session) {
      signIn();
      return;
    }
  };

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscription}
    >
      Subscribe Now
    </button>
  );
}
