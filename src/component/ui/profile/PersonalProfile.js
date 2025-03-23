// "use client"
// import React, { useEffect, useState } from 'react';
// import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
// import useLocalStorage from '@/helpers/useLocalStorage.js';

// export default function PersonalProfile() {
//     const [data, setData] = useLocalStorage('e-learning-user', '');
//     const [userData, setUserData] = useState(null);
//     useEffect(() => {
//         // This code will only run on the client side
//         const storedData = localStorage.getItem('e-learning-user');
       
//       //  setld(storedData);
//       if(storedData){
//         const parsedData = JSON.parse(storedData);
//       setUserData(parsedData);
  
//       }
     
//       }, []);

//       useEffect(() => {
//         // This will run whenever userData changes
//         if (userData) {
        
//         }
//       }, [userData]);
//   return (
//     <section className="vh-100" >
//       <MDBContainer className="py-5 h-100">
//         <MDBRow className="justify-content-center align-items-center h-100">
//           <MDBCol lg="6" className="mb-4 mb-lg-0">
//             <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
//               <MDBRow className="g-0">
//                 <MDBCol md="4" className="gradient-custom text-center text-black font-bold text-2xl flex flex-col"
//                   style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
//                     <div className='flex items-center justify-center flex-col' >
//                   <MDBCardImage src={userData?.photoURL}
//                     alt="Avatar" className="my-5 align-self:center mt-4 w-32 h-32 object-cover rounded-full " fluid />
//                   <MDBTypography tag="h5">{userData?.name}</MDBTypography>
//                   <MDBCardText className='font-semibold' >ROLE:{userData?.isInstructor ? "Instructor" :"Student"}</MDBCardText>
//                   <MDBIcon far icon="edit mb-5" />
//                   </div>
//                 </MDBCol>
//                 <MDBCol md="8">
//                   <MDBCardBody className="p-4 ">
//                     <MDBTypography tag="h6" className='font-bold text-2xl' >Information</MDBTypography>
//                     <hr className="mt-0 mb-4" />
//                     <MDBRow className="pt-1">
//                       <MDBCol size="6" className="mb-3">
//                         <MDBTypography tag="h6" className='font-semibold text-2xl'>Email</MDBTypography>
//                         <MDBCardText className=" text-black">{userData?.email}</MDBCardText>
//                       </MDBCol>
//                       {/* <MDBCol size="6" className="mb-3">
//                         <MDBTypography tag="h6" className='font-semibold text-2xl'>Phone</MDBTypography>
//                         <MDBCardText className="text-muted">123 456 789</MDBCardText>
//                       </MDBCol> */}
//                     </MDBRow>

//                     {/* <MDBTypography tag="h6">Information</MDBTypography>
//                     <hr className="mt-0 mb-4" />
//                     <MDBRow className="pt-1">
//                       <MDBCol size="6" className="mb-3">
//                         <MDBTypography tag="h6">Email</MDBTypography>
//                         <MDBCardText className="text-muted">info@example.com</MDBCardText>
//                       </MDBCol>
//                       <MDBCol size="6" className="mb-3">
//                         <MDBTypography tag="h6">Phone</MDBTypography>
//                         <MDBCardText className="text-muted">123 456 789</MDBCardText>
//                       </MDBCol>
//                     </MDBRow> */}

                  
//                   </MDBCardBody>
//                 </MDBCol>
//               </MDBRow>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </section>
//   );
// }



"use client"
import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import useLocalStorage from '@/helpers/useLocalStorage.js';

export default function PersonalProfile() {
  const [data, setData] = useLocalStorage('e-learning-user', '');
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // This code will only run on the client side
    const storedData = localStorage.getItem('e-learning-user');

    //  setld(storedData);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);

    }

  }, []);

  useEffect(() => {
    // This will run whenever userData changes
    if (userData) {

    }
  }, [userData]);
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Profile Sidebar */}
            <div className="md:w-1/3 bg-gradient-to-b from-indigo-500 to-purple-600 p-6 flex flex-col items-center justify-center text-center">
              <div className="mb-6 relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden">
                  <img
                    src={userData?.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{userData?.name}</h2>
              <div className="bg-white/20 rounded-full py-2 px-4 text-white font-medium mb-4">
                {userData?.isInstructor ? "Instructor" : "Student"}
              </div>
              {/* <button className="mt-2 text-white/70 hover:text-white transition duration-200 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>Edit</span>
              </button> */}
            </div>

            {/* Profile Info */}
            <div className="md:w-2/3 p-8">
              <div className="flex items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Profile Information</h3>
                <div className="ml-auto h-px w-32 bg-gray-200"></div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">EMAIL ADDRESS</h4>
                  <p className="text-gray-800 font-medium">{userData?.email}</p>
                </div>

                {/* Uncomment and modify when you want to add phone
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">PHONE NUMBER</h4>
              <p className="text-gray-800 font-medium">123 456 789</p>
            </div>
            */}

                <div className="pt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-gray-600">Account Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}