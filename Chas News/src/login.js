
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDpbyLddfx9M9rfXsdeR2RdYZuLvK62L1I",
    authDomain: "chas-news-697bd.firebaseapp.com",
    databaseURL: "https://chas-news-697bd-default-rtdb.firebaseio.com",
    projectId: "chas-news-697bd",
    storageBucket: "chas-news-697bd.appspot.com",
    messagingSenderId: "137415225220",
    appId: "1:137415225220:web:a3a6dc48cb504508a2b7d1",
    measurementId: "G-4ECMHSRMRT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const providerF = new FacebookAuthProvider();




// Function to redirect to another page
function redirectToPage(user) {
    // Redirect to another HTML page (replace 'dashboard.html' with the actual file name)
    window.location.href = 'http://localhost:5173/';

    // Optionally, you can pass user information to the new page
    // For example, you can use sessionStorage to store user information temporarily
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
}

// Sign Up
signUp.addEventListener('click', (e) => {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email,
                
                 

            });
            alert("Sign up successfuled! ")

            // Redirect to another HTML page after successful sign-up
            redirectToPage(user);

        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});


onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, you can retrieve user data from the database
        const userId = user.uid;
        const userRef = ref(database, 'users/' + userId);

        onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                // Use userData as needed
                console.log(userData);

                // Redirect to another HTML page after successful sign-up or login
                redirectToPage(user);
            } else {
                console.log('User data not found in the database.');
            }
        }, (error) => {
            console.error('Error retrieving user data:', error);
        });
    } else {
        // User is signed out
        console.log('User is signed out');
    }
});





// Google Sign In
google.addEventListener('click', (e) => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;

            // Redirect to another HTML page after successful sign-in
            redirectToPage(user);

        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

// Facebook Sign In
document.getElementById("facebook").addEventListener('click', (e) => {
    signInWithPopup(auth, providerF)
        .then((result) => {
            const user = result.user;
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            alert("Welcome" + user.displayName);
            console.log(user);

            // Redirect to another HTML page after successful sign-in
            redirectToPage(user);


        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

