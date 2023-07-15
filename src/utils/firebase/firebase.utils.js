///
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import{
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs

} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDZzDT92_-RlH7fJu9jF4nEF4-LUz0AofU",
  authDomain: "crwn-clothing-db-fc35e.firebaseapp.com",
  projectId: "crwn-clothing-db-fc35e",
  storageBucket: "crwn-clothing-db-fc35e.appspot.com",
  messagingSenderId: "267695574755",
  appId: "1:267695574755:web:c83ee273776a811677bfd6"
};

const firebaseApp = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});


export const auth = getAuth();//Keeps track of whether the user has signed in or signed out and keep this thing in mind that it persists between page refreshes.
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) =>{
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })

  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async () =>{
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) =>{//querySnapshot.docs refers to an array of documents for the collection
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
}



export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) =>{
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    }
      catch(error){
        console.log('error creating the user', error.message);
      }
  }
  return userDocRef;
}
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password){
    return;
  }
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password){
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);

}




