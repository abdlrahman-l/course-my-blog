import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA63cUNDmvxKR-Vw10DRCE__PrBchan7S4",
  authDomain: "my-react-blog-f5c1e.firebaseapp.com",
  projectId: "my-react-blog-f5c1e",
  storageBucket: "my-react-blog-f5c1e.appspot.com",
  messagingSenderId: "566718979528",
  appId: "1:566718979528:web:0dfe5dcee1e9f61ff1b4fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
