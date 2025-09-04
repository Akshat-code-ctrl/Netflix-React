import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCZoL6exNbHnxpEjpml66wgAQx2FLualNc",
  authDomain: "netflix-clone-195e4.firebaseapp.com",
  projectId: "netflix-clone-195e4",
  storageBucket: "netflix-clone-195e4.firebasestorage.app",
  messagingSenderId: "79269165430",
  appId: "1:79269165430:web:963db036d0ad289fa92257"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful 🎉");
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth)
}

export {auth, db, login, signup, logout};