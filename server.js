import express from "express";
import bcrypt from "bcrypt";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc, getDoc, updateDoc, query, limit } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYBw2uBte7GgX1a7D9i_O5See-bYmrQeA",
    authDomain: "e-commerce-website-5d4fa.firebaseapp.com",
    projectId: "e-commerce-website-5d4fa",
    storageBucket: "e-commerce-website-5d4fa.appspot.com",
    messagingSenderId: "46391427065",
    appId: "1:46391427065:web:bfa0dcd840a8d31b01c728"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

//init server
const app = express();
//middlewares
app.use(express.static("public"));
app.use(express.json());  //enables form sharing 

//routes
//home route
app.get('/', (req, res) => {
    res.sendFile("index.html", { root: "public" })
})

//signup
app.get('/signup', (req, res) => {
    res.sendFile("signup.html", { root: "public" });
})

app.post('/signup', (req, res) => {
    const { name, email, password, number, tac } = req.body;

    //form validation
    if (name.length < 3) {
        res.json({ 'alert': 'name must be 3 letters long' });
    }
    else if (!email.length) {
        res.json({ 'alert': 'enter your email' });
    }
    else if (password.length < 8) {
        res.json({ 'alert': 'password must be 8 characters long' });
    }
    else if (!Number(number) || number.length < 10) {
        res.json({ 'alert': 'invalid phone number' });
    }
    else if (!tac) {
        res.json({ 'alert': 'you must agree to our terms and conditions' });
    }
    else {
        // store the data in the database
        const users = collection(db, "users");

        getDoc(doc(users, email)).then(user => {
            if (user.exists()) {
                return res.json({ 'alert': 'email already exists' })
            }
            else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;

                        //set the doc
                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                            })
                        })
                    })
                })
            }
        })
    }
})

app.get('/login', (req, res) => {
    res.sendFile("login.html", { root: "public" })
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;
    if (!email.length || !password.length) {
        res.json({ 'alert': 'fill all the inputs' });
    }
    const users = collection(db, "users");
    getDoc(doc(users, email))
        .then(user => {
            if (!user.exists()) {
                return res.json({ 'alert': 'email does not exists' });
            }
            else {
                bcrypt.compare(password, user.data().password, (err, result) => {
                    if (result) {
                        let data = user.data();
                        return res.json({
                            name: data.name,
                            email: data.email,
                        })
                    }
                    else {
                        return res.json({ 'alert': 'password is incorrect' });
                    }
                })
            }
        })

})

app.get('/home', (req, res) => {
    res.sendFile("index.html", { root: "public" });
})

app.get('/product', (req, res) => {
    res.sendFile("products.html", { root: "public" });
})

app.get('/product-detail', (req, res) => {
    res.sendFile("product-detail.html", { root: "public" });
})


app.get('/cart', (req, res) => {
    res.sendFile("cart.html", { root: "public" });
})

//404 route
app.get('/404', (req, res) => {
    res.sendFile("404.html", { root: "public" });
})

app.use((req, res) => {
    res.redirect('/404');
})
app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000');
})