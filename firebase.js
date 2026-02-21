// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbNAsb2kYTRHPR9vbiZ3eWqnK-Hkan3Q0",
  authDomain: "id-verification-fa673.firebaseapp.com",
  projectId: "id-verification-fa673",
  storageBucket: "id-verification-fa673.firebasestorage.app",
  messagingSenderId: "306500578530",
  appId: "1:306500578530:web:f4f6e22834a3257f4e02bb",
  measurementId: "G-TQ32MHTR3F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ✅ Declare db ONLY HERE
const db = firebase.firestore();

const storage = firebase.storage();
