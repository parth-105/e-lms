'use client'
import axios from 'axios';

import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import useLocalStorage from '@/helpers/useLocalStorage.js';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CourseCard = ({ title, thumbnail, price, courseId,instructor ,userId }) => {

  const route = useRouter();
  const [data, setData] = useLocalStorage('e-learning-user', '');
  // when user id store
  // const userId = Cookies.get('userId');
  // console.log("+++++++++++++++",userId);

 
  
  const handleCourseClick = async (courseId) => {

    //route.push(`/course/videos/${courseId}`);courseId, userId

    if(data._id === instructor || userId )
    {
      route.push(`/course/videos/${courseId}`);
    }
    else{
   const res = await axios.post("/api/course/checkpurchase", { userId: data._id, courseId: courseId });


   console.log(res.data.purchased);

    if (res.data.purchased === false) {
      console.log("this is stripe1");
      
        const check = async () => {
        const stripe = await stripePromise;
        console.log("this is stripe2");

          console.log(price);
          
        const response = await fetch("/api/checkout", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({price,courseId}),
        });

        const session = await response.json();
        const sessionId = session.sessionId.id; // Access the id here
        
        const result = await stripe.redirectToCheckout({
          sessionId: session.sessionId,
        });

        //update database 
        // if(session){
        //   console.log('update',session)
        //   const update = await axios.post('/api/update',{user:"66bf6d68f1cc39527b8403f4",course:courseId,purchased:true})
        // }

        if (result.error) {
          console.error(result.error.message);
        }else{
          const update = await axios.post('/api/update',{user:data._id,course:courseId,purchased:true})
          console.log('payment')
        }
      };
      check()
    } else {
      route.push(`/course/videos/${courseId}`);
    }
  }
  };
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm">
      <img
        className="w-full h-48 object-cover"
        src={thumbnail}
        alt={title}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">${price}</p>
        <button onClick={() => handleCourseClick(courseId)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"  >
         {data._id === instructor || userId ? "Watch" : "Enroll Now"} 
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
