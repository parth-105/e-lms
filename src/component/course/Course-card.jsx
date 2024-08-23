'use client'
import axios from 'axios';

import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CourseCard = ({ title, thumbnail, price, courseId }) => {

  const route = useRouter();
  // when user id store
  // const userId = Cookies.get('userId');
  // console.log("+++++++++++++++",userId);


  const handleCourseClick = async (courseId) => {

    
    console.log("****************", courseId);

    const res = await axios.post("/api/course/checkpurchase", { userId: "22338866755", courseId: courseId });


    console.log(res.data.purchased);

    if (res.data.purchased === false) {
      console.log("this is stripe1");
      
        const check = async () => {
        const stripe = await stripePromise;
        console.log("this is stripe2");

  
        const response = await fetch("/api/checkout", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({price}),
        });

        //const response = await axios.post('/api/create-checkout-session',{price:price})
        console.log(response.sessionId);


        const session = await response.json();
        console.log("}}}}}}}}}}}}}}}}]",session);
        
        const result = await stripe.redirectToCheckout({
          sessionId: session,
        });

        console.log("this is stripe3");

        // //update database 
        // if(session){
        //   const update = await axios.post('/api/update',{user:"from local",course:courseId,purchased:true})
        // }

        if (result.error) {
          console.error(result.error.message);
        }
      };
      check()
    } else {
      route.push(`/course/videos/${courseId}`);
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
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
