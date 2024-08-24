"use client"
// pages/success.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import useLocalStorage from '@/helpers/useLocalStorage.js';

const Success = ({ params }) => {
  const router = useRouter();
  const [data, setData] = useLocalStorage('e-learning-user', '');
  //const { session_id } = router.query;
  // const searchParams = useSearchParams();
  // const session_id = searchParams.get('session_id');

  const courseId = params.courseId;

  useEffect(() => {
    
      const updatePurchase = async () => {
        try {

          await axios.post('/api/update', {
            userId: data._id,
            courseId: courseId,
            isPurchased: true
          });
          router.push(`/course/videos/${courseId}`);
          // Redirect to the home page or course page
        //  router.push('/');
        } catch (error) {
          console.error('Error updating purchase:', error);
        }
      };

      updatePurchase();
    
  }, [courseId]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Redirecting you to your course...</p>
    </div>
  );
};

export default Success;
