// useLogout.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function useLogout() {
    const router = useRouter();

    useEffect(() => {
        // Remove user data from local storage
        localStorage.removeItem('e-learning-user');

        // Redirect to the login page
        router.replace('/login');
    }, []);

    // You can also add additional cleanup logic if needed

    return null; // Custom hooks must return something
}

export default useLogout;
