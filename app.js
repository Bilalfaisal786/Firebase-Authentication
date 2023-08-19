
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCqK_aT8QPerObBSDckWQs-AKW75XlnKkU",
    authDomain: "thread-project-app.firebaseapp.com",
    projectId: "thread-project-app",
    storageBucket: "thread-project-app.appspot.com",
    messagingSenderId: "626923507591",
    appId: "1:626923507591:web:c3c5ebefad13b231368d22"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();
let register_btn = document.getElementById("register_btn")
register_btn.addEventListener("click", function
    () {
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            // console.log("user==>",user)

            set(ref(db, `users/${user.uid}`), {
                emaill: email.value, password: password.value
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error==>", errorMessage)
            // ..
        });

})

let login_btn = document.getElementById("login_btn")
login_btn.addEventListener("click", function
    () {
    let login_email = document.getElementById("login_email");
    let login_password = document.getElementById("login_password");

    signInWithEmailAndPassword(auth, login_email.value, login_password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            // console.log("user==>",user)
            // onValue(ref(db,`users/${user.uid}`),(data) => {console.log ("data ==>",data.val()) ;}  )
            get(ref(db, `users/${user.uid}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val());
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });


        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error==>", errorMessage)

        });

});
