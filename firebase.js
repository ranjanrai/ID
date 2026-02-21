// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbNAsb2kYTRHPR9vbiZ3eWqnK-Hkan3Q0",
  authDomain: "id-verification-fa673.firebaseapp.com",
  projectId: "id-verification-fa673",
  storageBucket: "id-verification-fa673.appspot.com",
  messagingSenderId: "306500578530",
  appId: "1:306500578530:web:f4f6e22834a3257f4e02bb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ✅ REQUIRED SERVICES
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
