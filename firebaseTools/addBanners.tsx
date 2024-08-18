// Script for adding new banners - run with "npx tsx firebaseTools/addBanners.tsx"

interface Banner {
  id: string;
  name: string;
  placed: boolean;
}
// syntax-example:  { "id": "2928", "name": "Green Slime Banner", "placed": false },
// NOTE: Ferdig med Slimes og Environments
const newBanners: Banner[] = [];

import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc, updateDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBtBcTLSpWUCVDaLJdjM8PF1KkrZQ9Ubqs",
  authDomain: "terraria-organizer.firebaseapp.com",
  projectId: "terraria-organizer",
  storageBucket: "terraria-organizer.appspot.com",
  messagingSenderId: "906331412619",
  appId: "1:906331412619:web:06e25af3df0c0f4b85dc8e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function updateBanners() {
  // get banners from firestore
  const docRef = doc(db, "banners", "all")
  const docSnap = await getDoc(docRef)
  console.log(docSnap.data())
  const oldBanners = docSnap.data()?.allBanners ?? []

  // add new banners to firestore
  const allBanners = oldBanners.concat(newBanners)
  console.log("NEW", {allBanners})
  await updateDoc(docRef, {allBanners})
  
}
updateBanners()