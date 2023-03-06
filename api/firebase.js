import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, getDoc, doc } from 'firebase/firestore/lite';
import { images, names } from "../constants/nftMetadata";

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
    // const docRef = doc(db, "users", address);
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //     await setDoc(doc(db, "users", address), obj, { merge: true });
    // } else {
    //     await setDoc(doc(db, "users", address), obj, { merge: true });
    // }

    const ref = doc(db, "users", address);
    const snap = await getDoc(ref);


    console.log("DATATATATTATA: ", snap.data())

    return snap.data();
}


// Check if the user exists in the db

export const checkIfUserExists = async (address, obj) => {
    address = address.toUpperCase();
    const docRef = doc(db, "users", address);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("User already exists.")
        let data = { ...obj };


    } else {
        // Doesn't exist in DB
        // Create it and set alreadyMinted to false
        let data = { ...obj, alreadyMinted: false, startingSnapshot: { ...obj.stats, snapshotDate: new Date().toLocaleDateString() }, bonusXP: 0,  };
        console.log("Doesn't exist.")
        console.log("Obj Data: ", data);

        await setDoc(doc(db, "users", address), data, { merge: true });
    }
}

export const checkIfUserMinted = async (address) => {

    address = address.toUpperCase()

    const ref = doc(db, "users", address);
    const snap = await getDoc(ref);
    const { alreadyMinted } = snap.data();

    return alreadyMinted;

}

export const mintNFT = async (address) => {
    address = address.toUpperCase();
    const docRef = doc(db, "users", address);
    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()) {
        await setDoc(doc(db, "users", address), {alreadyMinted: true}, { merge: true });
    }
}
