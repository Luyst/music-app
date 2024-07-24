import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layouts';
import { StreamProvider } from './context/Streaming';
import UserProvider from './context/UserProvider';

function App() {
    return (
        <UserProvider>
            <StreamProvider>
                <Router>
                    <div className="App">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Layout = route.layout || DefaultLayout;
                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </div>
                </Router>
            </StreamProvider>
        </UserProvider>
    );
}

export default App;
