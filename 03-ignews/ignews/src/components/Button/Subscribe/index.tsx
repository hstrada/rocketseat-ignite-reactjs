import { useSession, signIn } from 'next-auth/react';
import { api } from '../../../services/api';
import { getStripeJS } from '../../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function Subscribe({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  const handleSubscription = async () => {
    if (!session) {
      signIn();
      return;
    }

    try {
      const response = await api.post('/subscribe');
      
      const { sessionId } = response.data;
     
      const stripe = await getStripeJS();
      
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.log(error)
      // alert(error.message);
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
