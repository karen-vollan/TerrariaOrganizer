'use client' 
// why 'use client'?
//https://nextjs.org/docs/app/building-your-application/rendering/client-components#using-client-components-in-nextjs
//https://react.dev/reference/rsc/use-client#use-client

// imports
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

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

// update firestore with the new banners
async function updateBanners(banner: Banner) {
  // get banners from the list allBanners in 
  // collection "banners" - document "all" - field "allBanners"
  const docRef = doc(db, "banners", "all")
  const docSnap = await getDoc(docRef)
  const allBanners = docSnap.data()?.allBanners ?? []

  // change banner
  allBanners.find((b: Banner) => b.id === banner.id)["placed"] = !banner.placed

  // update document
  await updateDoc(docRef, {allBanners})
  
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

  const handleClick = (banner: Banner) => {
    updateBanners(banner)
  }
  

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-300">
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
        {banners.sort((a: Banner, b: Banner) => a.name.localeCompare(b.name)).map((banner, index) => (
          <tr
            key={index}
            className="h-14 bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800"
          >
            {banner.placed ? (
              <td scope="row" className="px-6 font-medium text-gray-400 whitespace-nowrap dark:text-gray-500">
                <span style={{ textDecoration: 'line-through' }}>{banner.name}</span>
              </td>
            ) : (
              <td scope="row" className="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-gray-100">
                {banner.name}
              </td>
            )}

            <td className="px-6">
              {banner.id}
            </td>

            <td className="px-6" style={{ cursor: "pointer" }} onClick={() => handleClick(banner)}>
              <div className="flex items-center">
                <input 
                  className="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  id="default-checkbox"
                  type="checkbox"
                  style={{ width: "16px", height: "16px", cursor: "pointer" }}
                  value={index}
                  checked= {banner.placed}
                  onChange={() => handleClick(banner)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
