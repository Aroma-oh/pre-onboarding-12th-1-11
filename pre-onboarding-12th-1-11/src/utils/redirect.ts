import {redirect} from 'react-router-dom';
import ROUTES from '../constants/routes';

export const redirectTodo = () => {
    const token = localStorage.getItem('access_token');

    if (token !== null) {
        return redirect(ROUTES.TODO);
    }

    return null;
};

export const redirectSignin = () => {
    const token = localStorage.getItem('access_token');

    if (token === null) {
        return redirect(ROUTES.SIGNIN);
    }

    return null;
};
