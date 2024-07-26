import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '~/services/firebase';
import { queryForDocuments } from '~/services/service';

export const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const fetchUserData = async (uid) => {
            const condition = {
                fieldName: 'uid',
                operator: '==',
                compareValue: uid,
            };
            const users = await queryForDocuments('user', condition);
            if (users.length > 0) {
                const fetchedUser = users[0];
                setUser(fetchedUser);
                localStorage.setItem('user', JSON.stringify(fetchedUser));
            } else {
                setUser(null);
            }
        };
        const userChange = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                if (!user || user.uid !== firebaseUser.uid) {
                    fetchUserData(firebaseUser.uid);
                }
                if (user !== null) {
                }
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
        });
        return () => userChange();
    }, [user]);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export default UserProvider;
