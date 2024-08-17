// // useFirebaseFileUpload.js

// import { useState, useEffect } from 'react';
// import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
// import { firebaseConfig } from '@/firebase'; // Your Firebase config

// const useFirebaseFileUpload = () => {
//   const [downloadUrl, setDownloadUrl] = useState(null);

//   useEffect(() => {
//     // Initialize Firebase
//     const storage = getStorage(firebaseConfig);

//     // Create a reference to the storage bucket
//     const storageRef = ref(storage, 'uploads'); // Change 'uploads' to your desired folder

//     // Upload the file (e.g., from an input field)
//     const uploadFile = async (file) => {
//       try {
//         await uploadBytes(storageRef, file);
//         const url = await getDownloadURL(storageRef);
//         setDownloadUrl(url);
//       } catch (error) {
//         console.error('Error uploading file:', error);
//       }
//     };

//     // Clean up (optional)
//     return () => {
//       // Unsubscribe or perform any cleanup
//     };
//   }, []); // Run only once during component mount

//   return { downloadUrl, uploadFile }; // Export the uploadFile function
// };

// export default useFirebaseFileUpload;
