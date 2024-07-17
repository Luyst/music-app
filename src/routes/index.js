import Home from '~/pages/Home';

const config = {
    home: '/',
};

const publicRoutes = [
    {
        path: config.home,
        component: Home,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
