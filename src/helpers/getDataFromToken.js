import { jwtVerify } from 'jose';
import { getCookie } from 'cookies-next';

export const getDataFromToken = async () => {
    try {
        // const token = cookies.get('e-learninigtoken')?.value || '';

        const token = getCookie('e-learninigtoken');

        console.log('too',token)
   
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        //
        console.log('pay', payload);

        return payload

    } catch (error) {
        throw new Error(error.message);
    }

}