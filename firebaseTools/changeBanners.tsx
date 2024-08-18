// imports
import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc, updateDoc} from 'firebase/firestore';
import * as fs from 'fs';

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

interface Banner {
  id: string;
  name: string;
  placed: boolean;
}

// update firestore with the new banners
async function changeBanners() {
  // get banners from the list allBanners in 
  // collection "banners" - document "all" - field "allBanners"
  const docRef = doc(db, "banners", "all")
  const docSnap = await getDoc(docRef)
  const allBanners: Banner[] = docSnap.data()?.allBanners ?? []

  allBanners.forEach(banner => {
    console.log(banner)
  })

  // get list of placed banners from a text file
  const placedBanners = fs.readFileSync('firebaseTools/placedBanners.text', 'utf-8');
  const placeBannersList: string[]= placedBanners.split('\r\n')
  
  allBanners.forEach(banner => {
    const bannerName = banner.name.toLowerCase()
    placeBannersList.forEach(placedBanner => {
      const placedBannerName = placedBanner.toLowerCase() + " banner"
      if (bannerName == placedBannerName) {
        banner.placed = true
    }
    })
  });
  // update document - remove comment if you want to update banners
  // await updateDoc(docRef, {allBanners})
  
}
changeBanners()