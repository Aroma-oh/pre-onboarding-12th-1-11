import {signAxios} from './axios';
import {SIGNIN_SUCCESS, SIGNUP_SUCCESS, SIGNIN_FAILED, SIGNUP_FAILED} from '../constants/message';

export const signinAPI = async (email: string, password: string) => {
    try {
        const response = await signAxios.post('/auth/signin', {email, password});

        localStorage.setItem('access_token', response.data.access_token);

        alert(SIGNIN_SUCCESS);
        return response;
    } catch {
        alert(SIGNIN_FAILED);
    }
};

export const signupAPI = async (email: string, password: string) => {
    try {
        const response = await signAxios.post('/auth/signup', {email, password});

        alert(SIGNUP_SUCCESS);
        return response;
    } catch {
        window.location.reload();
        alert(SIGNUP_FAILED);
    }
};
