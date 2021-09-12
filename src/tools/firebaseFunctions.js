import { initializeApp } from 'firebase/app';
import "firebase/auth"
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDC2lch6qJzHN489xm1IOn8yzyqn6N-qVw",
    authDomain: "my-cat-is-the-cutest.firebaseapp.com",
    databaseURL: "https://my-cat-is-the-cutest-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "my-cat-is-the-cutest",
    storageBucket: "my-cat-is-the-cutest.appspot.com",
    messagingSenderId: "119485908154",
    appId: "1:119485908154:web:7c878075a20a934f85ee83"
};

const app = initializeApp(firebaseConfig);

function saveUserToDatabase (email, uid, vote) {
    return fetch(`https://my-cat-is-the-cutest-default-rtdb.europe-west1.firebasedatabase.app/users/${email}.json`, {
        body: JSON.stringify({email: email, uid:uid, vote:vote}),
        method: "PUT"
    })
}

export function registerAndSaveToDatabase (email) {
    const auth = getAuth();
    createUserWithEmailAndPassword(
        auth,
        email,
        "myCatIsTheCutest"
    )
    .then((userCredentials) => {
        saveUserToDatabase(email, userCredentials.user.uid, false)
    })
}

