'use client' 
// why 'use client'?
//https://nextjs.org/docs/app/building-your-application/rendering/client-components#using-client-components-in-nextjs
//https://react.dev/reference/rsc/use-client#use-client

// imports
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app"
import { getFirestore, doc, onSnapshot} from 'firebase/firestore';

// create connection with firestore
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
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
                Banners
            </th>
            <th scope="col" className="px-6 py-3">
                ID
            </th>
            <th scope="col" className="px-6 py-3">
                Placed
            </th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner, index) => (
            <tr className="bg-white dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {banner.name}
            </th>
            <td className="px-6 py-4">
              {banner.id}
            </td>
            <td className="px-6 py-4">
              {banner.placed ? "Yes" : "No"}
            </td>
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  </main>
  );
}
