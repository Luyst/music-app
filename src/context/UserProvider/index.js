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
            try {
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
                    // Nếu chưa có trong Firestore thì tạo user mới
                    setUser((prev) => ({ ...prev, uid })); // giữ tạm firebase user
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // 👉 Cập nhật ngay UI bằng firebaseUser
                setUser({
                    uid: firebaseUser.uid,
                    displayName: firebaseUser.displayName,
                    email: firebaseUser.email,
                    photoURL: firebaseUser.photoURL,
                });

                // Sau đó fetch Firestore để sync thông tin
                fetchUserData(firebaseUser.uid);
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
        });

        return () => unsubscribe();
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export default UserProvider;
