import { initializeApp} from "firebase/app";

import { 
  getAuth, 
  signInWithPopup, 
  signInWithRedirect, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  setPersistence, 
  browserSessionPersistence} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc, // sets doc data
  updateDoc,
  onSnapshot
  
}from 'firebase/firestore'

import { message } from "antd";
import getPlaylistItems from "../../apis/getVideos";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJsv0O_4VXXkF2yMbzsDpiHQpzsXYr5rY",
  authDomain: "acadboost-db.firebaseapp.com",
  projectId: "acadboost-db",
  storageBucket: "acadboost-db.appspot.com",
  messagingSenderId: "690733356991",
  appId: "1:690733356991:web:2177ef2bbb2846c182f30a"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();
export const singnInWithGooglePopup = ()=>signInWithPopup(auth, provider);
export const singnInWithGoogleRedirect = ()=>signInWithRedirect(auth, provider);

export const createAuthUserWithEmailAndPassword = async (email, password)=>{
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}
export const signInAuthUserWithEmailAndPassword = async (email, password)=>{
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const db  = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {})=>{
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  // console.log(userDocRef);
  
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot.data());
  // console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    const myCourses=[];
    try {
      setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        myCourses,
        ...additionalInformation,
      })
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
}






export const signOutUser = async ()=> signOut(auth);

//Adding to my courses

export const handleAddToBookmarks = async (userAuth, course)=>{

  if(!userAuth) {
    
    alert("Please sign In to add this course to my courses");
    return;
  }
  const {id, thumbnail, title} = course;
  const videosRes = await getPlaylistItems(id);
  // console.log(videos);
  console.log(id);
  const videos = [];
  videosRes.forEach((video)=>{
    videos.push({videoId:video.snippet.resourceId.videoId, watched:false});

  })
  console.log(videos);
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  const myCourses = await userSnapshot.data().myCourses;
  console.log(myCourses);
  if(myCourses === undefined){
    updateDoc(userDocRef, {
      myCourses:[{...course, videos}]
    })
  }
  else{
    const isPlaylistInMyCourse =  myCourses.find((myCourse=>myCourse.id === id));
    
    console.log(isPlaylistInMyCourse);
    if(isPlaylistInMyCourse){
   
      alert('This course is already present in my courses.');  
    }
    else{
      myCourses.push({...course, videos});
      console.log(myCourses);
    
      updateDoc(userDocRef, {
        myCourses:myCourses
      })
      alert("Course added successfully");
    }
  }
}

export const data = async (userAuth)=>{
  if(!userAuth) {
    return;
  }
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  const myCourses = await userSnapshot.data().myCourses;
  return myCourses;
}

export const deleteCourse = async (userAuth, id) =>{
  if(!userAuth) {
    
    alert("Please sign In to delete this course to my courses");
    return;
  }
  console.log("deleteCourse trigerred") 
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  const myCourses = await userSnapshot.data().myCourses;
  const newMyCourses=myCourses.filter(myCourse => myCourse.id!==id);
  
  
    updateDoc(userDocRef, {
      myCourses:newMyCourses
    })
    // console.log("render1");
  
    
  
  
}