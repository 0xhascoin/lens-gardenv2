import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, getDoc, doc } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyDFnbhZ2njAHiBrS0UtEOXxBxJJvRXo-nI",
    authDomain: "lens-garden.firebaseapp.com",
    projectId: "lens-garden",
    storageBucket: "lens-garden.appspot.com",
    messagingSenderId: "1045737166163",
    appId: "1:1045737166163:web:e2eeed7d4b84864084fda6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Check if the user exists in the db
// If they do return the data
// If they don't, create them in the db and then return the data

export const getUser = async (address, obj) => {
    const docRef = doc(db, "users", address);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        await setDoc(doc(db, "users", address), obj, {merge: true});
    } else {
        await setDoc(doc(db, "users", address), obj, {merge: true});
    }

    const ref = doc(db, "users", address);
    const snap = await getDoc(ref);


    console.log("DATATATATTATA: ", snap.data())

    return snap.data();
}


export const checkIfMinted = async (address) => {
    const docRef = doc(db, "users", address);
    const docSnap = await getDoc(docRef);

    console.log("Address: ", address);

    if(docSnap.exists()) {
        const data = docSnap.data();
        console.log("DocSnap.Data()", data);
    } else {
        console.log("DOESNT EXIST")
        return false;
    }
}