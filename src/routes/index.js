import Home from '~/pages/Home';
import PlayList from '~/pages/PlayList';
import Song from '~/pages/Song';
import Search from '~/pages/Search';
import Artist from '~/pages/Artist';
import Topic from '~/pages/Topic';
import Support from '~/pages/Support';
import Collecition from '~/pages/Collection';
import Error from '~/pages/Error';

const config = {
    home: '/',
    playlist: '/playlist/:playlistKey',
    song: '/song/:key',
    artist: '/artist/:key',
    topic: '/topic/:key',
    search: '/search',
    searchValue: '/search/:key',
    collection: '/collection',
    support: '/support',
    error: '/*',
};

const publicRoutes = [
    { path: config.home, component: Home },
    { path: config.song, component: Song },
    { path: config.playlist, component: PlayList },
    { path: config.artist, component: Artist },
    { path: config.topic, component: Topic },
    { path: config.search, component: Search },
    { path: config.searchValue, component: Search },
    { path: config.support, component: Support },
    { path: config.collection, component: Collecition },
    { path: config.error, component: Error },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
