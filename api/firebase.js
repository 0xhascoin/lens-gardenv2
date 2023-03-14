import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, getDoc, doc } from 'firebase/firestore/lite';
import { images, names } from "../constants/nftMetadata";

const firebaseConfig = {
    apiKey: "AIzaSyCUl-hZ4c9KDVzDxNq2VG6i90nvw5xABuY",
    authDomain: "lens-garden-t.firebaseapp.com",
    projectId: "lens-garden-t",
    storageBucket: "lens-garden-t.appspot.com",
    messagingSenderId: "540800889238",
    appId: "1:540800889238:web:fc36fc7bbf324c3b00edb7",
    measurementId: "G-0NQF0QBLC5"
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
        // Exists in DB already
        console.log("User already Exists Not creating them in DB.")
        let data = { ...obj };
        // await setDoc(doc(db, "users", address),  {mintedLevelNFTS: [false, false, true, true, false, false, false, false, false]}, { merge: true });

    } else {
        // Doesn't exist in DB
        // Create it and set alreadyMinted to false
        let data = { ...obj, alreadyMinted: false, mintedLevelNFTs: [false, false, false, false, false, false, false, false, false], bonusXP: 0,  };
        console.log("Doesn't exist. Adding to DB.")
        console.log("Obj Data: ", data);

        await setDoc(doc(db, "users", address), data, { merge: true });
    }
}

export const checkIfUserMinted = async (address) => {

    address = address.toUpperCase()

    const ref = doc(db, "users", address);
    const snap = await getDoc(ref);
    const { alreadyMinted } = snap.data();


    console.log("checkIfUserMinted? : ", alreadyMinted)

    return alreadyMinted;

}

export const checkIfUserMintedLevelNFTs = async (address) => {

    address = address.toUpperCase()

    const ref = doc(db, "users", address);
    const snap = await getDoc(ref);
    const { mintedLevelNFTs } = snap.data();


    console.log("mintedLevelNFTs? : ", mintedLevelNFTs)

    return mintedLevelNFTs;

}

export const mintNFT = async (address) => {
    address = address.toUpperCase();
    const docRef = doc(db, "users", address);
    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()) {
        await setDoc(doc(db, "users", address), {alreadyMinted: true}, { merge: true });
        console.log("Set AlreadyMinted TO TRUE")
    }
}
export const mintLevelNFT = async (address, index) => {
    address = address.toUpperCase();

    const ref = doc(db, "users", address);
    const snap = await getDoc(ref);
    const { mintedLevelNFTs } = snap.data();
    mintedLevelNFTs[index] = true;

    await setDoc(doc(db, "users", address), {mintedLevelNFTs}, { merge: true });

}

const calculateExperience = (following, followers, posts, collects, mirrors, comments) => {
    // Following, Followers, Posts, Collects, Mirrors, Comments
    return (following * 10) + (followers * 50) + (posts * 30) + (collects * 20) + (mirrors * 30) + (comments * 20);
}

const calculateLevel = (experience) => {
    let level = 1;
    let threshold = 100;
    let experienceToNextLevel = threshold;
    while (experience >= threshold) {
        level += 1;
        threshold *= 1.5;
    }
    experienceToNextLevel = Math.floor(threshold - experience);

    return { level, experienceToNextLevel };
}

const calculateStats = async (data) => {
    const { totalFollowing, totalFollowers, totalPosts, totalCollects, totalMirrors, totalComments } = data.stats;
    const exp = calculateExperience(totalFollowing, totalFollowers, totalPosts, totalCollects, totalMirrors, totalComments);
    const level = calculateLevel(exp);


    // profile.ownedBy, profile, level
    // let obj = {...profile, NFT: { xp: exp, ...level, name: "Lens Garden NFT"}};
    let obj = {
        ...data,
        attributes: [
            {
                trait_type: "Level",
                value: level.level.toString()
            },
            {
                trait_type: "Experience to Next Level",
                value: level.experienceToNextLevel.toString()
            },
            {
                trait_type: "Total XP",
                value: exp.toString()
            }
        ],
        name: "Lens Garden NFT",
        description: "Lens Garden NFT is a dynamic NFT collection that reflects your usage of the Lens Protocol in your NFT."
    }


    let image1 = images[0]; // < 7
    let image2 = images[1]; // 7 => && < 12
    let image3 = images[2]; // 12 => && < 17
    let image4 = images[3]; // 17 => && < 22
    let image5 = images[4]; // 22 => && < 27
    let image6 = images[5]; // 27 => && < 32
    let image7 = images[6]; // 32 => && < 35
    let image8 = images[7]; // 35 => && < 37
    let image9 = images[8]; // 37 =>


    if (obj.attributes[0].value < 7) {
        obj = { ...obj, image: image1, name: names[0] }
    } else if (obj.attributes[0].value <= 7 || obj.attributes[0].value < 12) {
        obj = { ...obj, image: image2, name: names[1] }
    } else if (obj.attributes[0].value <= 12 || obj.attributes[0].value < 17) {
        obj = { ...obj, image: image3, name: names[2] }
    } else if (obj.attributes[0].value <= 17 || obj.attributes[0].value < 22) {
        obj = { ...obj, image: image4, name: names[3] }
    } else if (obj.attributes[0].value <= 22 || obj.attributes[0].value < 27) {
        obj = { ...obj, image: image5, name: names[4] }
    } else if (obj.attributes[0].value <= 27 || obj.attributes[0].value < 32) {
        obj = { ...obj, image: image6, name: names[5] }
    } else if (obj.attributes[0].value <= 32 || obj.attributes[0].value < 35) {
        obj = { ...obj, image: image7, name: names[6] }
    } else if (obj.attributes[0].value <= 35 || obj.attributes[0].value < 37) {
        obj = { ...obj, image: image8, name: names[7] }
    } else if (obj.attributes[0].value >= 37) {
        obj = { ...obj, image: image9, name: names[8] }
    }

    return obj;

}
