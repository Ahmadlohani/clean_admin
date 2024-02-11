import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: process.env.NEXT_APIKEY,
	authDomain: process.env.NEXT_AUTHDOMAIN,
	projectId: process.env.NEXT_PROJECTID,
	storageBucket: process.env.NEXT_STORAGEBUCKET,
	messagingSenderId: process.env.NEXT_MESSAGINGSENDERID,
	appId: process.env.NEXT_APPID,
	measurementId: process.env.NEXT_MEASUREMENTID,
};

export const app = initializeApp(firebaseConfig, "clean-task");
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
