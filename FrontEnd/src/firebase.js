import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    serverTimestamp,
    setDoc,
    getDoc,
    updateDoc,
    doc,
    getFirestore
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            signupDate: serverTimestamp(),
            cpplevelCount: 0,
            javalevelCount: 0,
            pythonlevelCount: 0,
            jslevelCount: 0,
            gem: 0,
            isPro: false,
            lastClaimedMilestone: 0,
        });

        toast.success("You Signed Up Successfully !");
    } catch (error) {
        console.error("❌ Signup Error:", error);
        toast.error(error.code.replace("auth/", "").replace("-", " "));
    }
};



const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.log(error);
        toast.error(error.code.replace("auth/", "").replace('-', " "));
    }
};

const logout = () => {
    signOut(auth);
};


const updateLevelCount = async (section) => {
    console.log(`🔥 updateLevelCount CALLED with section: ${section}`);

    try {
        const user = auth.currentUser;
        if (!user) throw new Error("No authenticated user");

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            throw new Error("User document does not exist");
        }

        const data = userDocSnap.data();
        const fieldMap = {
            cpp: "cpplevelCount",
            java: "javalevelCount",
            python: "pythonlevelCount",
            javascript: "jslevelCount",
        };

        const field = fieldMap[section];
        if (!field) throw new Error("Invalid section");

        const currentCount = data[field] || 0;

        await updateDoc(userDocRef, {
            [field]: currentCount + 1,
        });

        console.log(`✅ ${field} updated to ${currentCount + 1}`);
    } catch (error) {
        console.error("❌ Failed to update level count:", error.message);
        toast.error(error.message);
    }
};


const addGemsToUser = async (userId, gemsToAdd) => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const currentGems = userSnap.data().gem || 0;
        await updateDoc(userRef, {
            gem: currentGems + gemsToAdd,
        });
    }
};

export { auth, db, login, signup, logout, updateLevelCount, addGemsToUser };

// All the Data of users are store in Firestore Database /// firestore console.
