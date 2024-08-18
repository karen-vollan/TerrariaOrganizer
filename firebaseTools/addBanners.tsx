// Script for adding new banners - run with "npx tsx firebaseTools/addBanners.tsx"

interface Banner {
  id: string;
  name: string;
  placed: boolean;
}// syntax-example:  { "id": "2928", "name": "Green Slime Banner", "placed": false },
// NOTE: Ferdig med Slimes og Environments
const newBanners: Banner[] = [
  //add new banners here...
];

// imports
import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc, updateDoc} from 'firebase/firestore';

// Set up connection to firestore
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

// update firestore with the new banners
async function updateBanners() {
  // get banners from the list allBanners in 
  // collection "banners" - document "all" - field "allBanners"
  const docRef = doc(db, "banners", "all")
  const docSnap = await getDoc(docRef)
  const oldBanners = docSnap.data()?.allBanners ?? []

  // add new banners
  const allBanners = oldBanners.concat(newBanners)

  // update document
  await updateDoc(docRef, {allBanners})
  
}
updateBanners()