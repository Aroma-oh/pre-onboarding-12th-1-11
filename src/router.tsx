import {createBrowserRouter} from 'react-router-dom';
import {Signin} from './pages/Signin';
import {Signup} from './pages/Signup';
import {Todo} from './pages/Todo';
import {redirectTodo, redirectSignin} from './utils/redirect';
import ROUTES from './constants/routes';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Signin />,
        loader: redirectTodo,
    },
    {
        path: ROUTES.SIGNIN,
        element: <Signin />,
        loader: redirectTodo,
    },
    {
        path: ROUTES.SIGNUP,
        element: <Signup />,
        loader: redirectTodo,
    },
    {
        path: ROUTES.TODO,
        element: <Todo />,
        loader: redirectSignin,
    },
]);
