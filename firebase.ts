import {getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getFunctions} from 'firebase/functions'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBKL2xySgTXyl0DTjwBBqRrj9DFGDxdvOE",
    authDomain: "dropbox-2-114f7.firebaseapp.com",
    projectId: "dropbox-2-114f7",
    storageBucket: "dropbox-2-114f7.appspot.com",
    messagingSenderId: "350889219693",
    appId: "1:350889219693:web:eaa44f032cc548b1605164",
    measurementId: "G-T0325PQMCR"
  };

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const storage = getStorage(app)

  export {db, storage}