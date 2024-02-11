import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyA4CoCQ385bIAezBetPybL39ouU_KUDLkQ",
	authDomain: "clean-task-43018.firebaseapp.com",
	projectId: "clean-task-43018",
	storageBucket: "clean-task-43018.appspot.com",
	messagingSenderId: "510800792581",
	appId: "1:510800792581:web:7402e6aecc5392e678606c",
	measurementId: "G-9N8BNZQG11",
};

export const app = initializeApp(firebaseConfig, "clean-task");
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
