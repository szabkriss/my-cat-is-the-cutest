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

// USER CLASS & RELATED FUNCTIONS

export class User {
    constructor(email, uid){
        this.email = email
        this.uid = uid
        this.voted = false
    }
}

export function getUsers () {
    return fetch(`https://my-cat-is-the-cutest-default-rtdb.europe-west1.firebasedatabase.app/users.json`)
    .then(response => response.json())
    .then(users => {
        return Object.keys(users).map((key) => {
        return users[key];
    })
})
}

function saveUserToDatabase (email, uid, vote) {
    return fetch(`https://my-cat-is-the-cutest-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`, {
        body: JSON.stringify({"email": email, "uid":uid, "voted":vote}),
        method: "PUT"
    })
}

export function registerAndSaveToDatabase (email) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(
        auth,
        email,
        "myCatIsTheCutest"
    )
    .then((userCredentials) => {
        return saveUserToDatabase(email, userCredentials.user.uid, false) 
    })
}

// VOTE FUNCTIONS

export function getVotes (cat) {
    return fetch(`https://my-cat-is-the-cutest-default-rtdb.europe-west1.firebasedatabase.app/${cat}.json`)
    .then(response => response.json())
}

function increaseVotes(cat, count){
    return fetch(`https://my-cat-is-the-cutest-default-rtdb.europe-west1.firebasedatabase.app/${cat}.json`, {
        body: JSON.stringify({votes: count + 1}),
        method: "PUT"
    })
}

function switchUserVotedToTrue(uid){
    return fetch(`https://my-cat-is-the-cutest-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`, {
        body: JSON.stringify({voted: true}),
        method: "PATCH"
    })
}

export function vote (cat, user){
    getVotes(cat)
    .then(count => increaseVotes(cat, count.votes))
    .then(() => {
        switchUserVotedToTrue(user.uid)
    })
}

function increaseMyCatsVotes (count){
    return fetch(`https://my-cat-is-the-cutest-default-rtdb.europe-west1.firebasedatabase.app/my-cat.json`, {
        body: JSON.stringify({votes: count + 20}),
        method: "PUT"
    })
}

export function makeMyCatTheMostGlorious() {
    getVotes("my-cat")
    .then(count => increaseMyCatsVotes(count.votes))
}