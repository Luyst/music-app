import Home from '~/pages/Home';
import PlayList from '~/pages/PlayList';
import Song from '~/pages/Song';
import Search from '~/pages/Search';

const config = {
    home: '/',
    playlist: '/playlist',
    song: '/song/:key',
    search: '/search',
    searchValue: '/search/:key',
};

const publicRoutes = [
    { path: config.home, component: Home },
    { path: config.song, component: Song },
    { path: config.playlist, component: PlayList },
    { path: config.search, component: Search },
    { path: config.searchValue, component: Search },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
