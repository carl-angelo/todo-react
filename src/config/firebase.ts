import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBrQF_tKzKCan8PJ5DD_dIKwjYFNAX5Blw",
    authDomain: "todo-react-api-b786e.firebaseapp.com",
    projectId: "todo-react-api-b786e",
    storageBucket: "todo-react-api-b786e.appspot.com",
    messagingSenderId: "105006752785",
    appId: "1:105006752785:web:30a4ba4893af237d0f7db0",
    measurementId: "G-GNCJ68HCNV"
};

firebase.initializeApp(firebaseConfig)
export default firebase
