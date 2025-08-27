// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa4-8Z5FS2DesIhkvYcsXCbmv_6As_TlA",
  authDomain: "medisync-b4ad9.firebaseapp.com",
  projectId: "medisync-b4ad9",
  storageBucket: "medisync-b4ad9.firebasestorage.app",
  messagingSenderId: "587961131504",
  appId: "1:587961131504:web:7306e554f23a7bbc10bd35",
  measurementId: "G-LYE0HD2M1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app 