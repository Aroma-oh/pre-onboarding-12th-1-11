import App from 'App';
import Detail from 'pages/Detail';
import List from 'pages/List';
import NotFound from 'pages/NotFound';
import {createBrowserRouter} from 'react-router-dom';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/list',
                element: <List />,
            },
            {
                path: '/detail',
                element: <Detail />,
            },
        ],
        errorElement: <NotFound />,
    },
]);
