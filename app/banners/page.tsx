'use client'
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app"
import { getFirestore, doc, onSnapshot} from 'firebase/firestore';

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

export default function Banners() {
  const [banners, setBanners] = useState<Banner[]>([])
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "banners", "all"), (docRef) => {
      const updateBanners = docRef.data()?.allBanners ?? [] // const updateBanners = doc.data()?.list[0]?.name ?? "";
      setBanners(updateBanners);
    });
    return () => unsub();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">  
    <div className="mb-3 text-2xl font-semibold">
      Banners
    <ul>
        {banners.map((banner, index) => (
          <li key={index}>
            {banner.name} - Placed: {banner.placed ? "Yes" : "No"}
          </li>
        ))}
      </ul>
      </div>
    </main>
  );
}
