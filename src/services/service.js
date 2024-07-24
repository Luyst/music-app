import { db } from './firebase';
import {
    collection,
    doc,
    updateDoc,
    deleteDoc,
    addDoc,
    serverTimestamp,
    where,
    getDocs,
    query,
} from 'firebase/firestore';

export const addDocument = async (collectionName, data) => {
    const collectionRef = collection(db, collectionName);

    try {
        await addDoc(collectionRef, {
            ...data,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error adding document: ', error);
    }
};

export const updateDocument = async (collectionName, dataId, data) => {
    try {
        const users = await queryForDocuments(collectionName, {
            fieldName: 'uid',
            operator: '==',
            compareValue: dataId,
        });

        if (users.length === 0) {
            throw new Error(`No document found with uid: ${dataId}`);
        }

        const user = users[0];
        const documentRef = doc(db, collectionName, user.id);

        await updateDoc(documentRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error updating document: ', error);
    }
};

//how to use
// const condition = {
//     fieldName: 'displayName',
//     operator: '==',
//     compareValue: 'Đức Huy',
// };
// const showData = () => {
//     queryForDocument('user', condition);
// };
export const queryForDocuments = async (collectionName, condition) => {
    try {
        const q = query(
            collection(db, collectionName),
            where(condition.fieldName, condition.operator, condition.compareValue),
        );
        const querySnapshot = await getDocs(q);
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });
        return documents;
    } catch (error) {
        console.error('Error fetching documents: ', error);
        return [];
    }
};
