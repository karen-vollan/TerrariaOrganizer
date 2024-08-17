
'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link'
import { initializeApp } from "firebase/app"
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

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

export default function Dashboard(
) {
  const [banners, setBanners] = useState("")
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "banners", "all"), (doc) => {
      const updateBanners = doc.data()?.list[0]?.name ?? "";
      setBanners(updateBanners);
    });
    return () => unsub();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-8"> 
    <p>banners: {banners}</p> 
      <div className="mb-8 text-2xl font-semibold">
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/9d5129b7-ce49-47de-9432-43876d118928/d6r6e7d-3aa7ddfc-7628-4442-8541-1fe1dc3844c2.png/v1/fit/w_750,h_224/terraria_logo_hd_by_dragondeplatino_d6r6e7d-375w-2x.png"
          alt="Terraria Header"
        />
      </div>

      <div className="mb-32 grid gap-4 text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        <a
          href="https://terraria.wiki.gg/wiki/Terraria_Wiki"
          className="group rounded-lg border px-4 py-8 transition-colors border-neutral-400 hover:border-neutral-600 hover:bg-neutral-600/20 dark:border-neutral-700 dark:hover:border-neutral-500 dark:hover:bg-neutral-500/20"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="text-xl font-semibold">
            Terraria-wiki{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </a>

        <a
          href="https://docs.google.com/document/d/1oURMd6MMpedXncMpJtXIyKHOhzExry8Rr5kDYzKe_T4/edit?pli=1"
          className="group rounded-lg border px-4 py-8 transition-colors border-neutral-400 hover:border-neutral-600 hover:bg-neutral-600/20 dark:border-neutral-700 dark:hover:border-neutral-500 dark:hover:bg-neutral-500/20"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="text-xl font-semibold">
            Chest sorting doc{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </a>

        <a
          href="https://docs.google.com/document/d/1U43ENhGg1YnrYumURubGUELqbQX0B1EG0rTJ2ISfK90/edit?usp=sharing"
          className="group rounded-lg border px-4 py-8 transition-colors border-neutral-400 hover:border-neutral-600 hover:bg-neutral-600/20 dark:border-neutral-700 dark:hover:border-neutral-500 dark:hover:bg-neutral-500/20"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="text-xl font-semibold">
            Banners doc{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </a>
        <Link 
          href="/banners"
          className="group rounded-lg border px-4 py-8 transition-colors border-neutral-400 hover:border-neutral-600 hover:bg-neutral-600/20 dark:border-neutral-700 dark:hover:border-neutral-500 dark:hover:bg-neutral-500/20"
          rel="noopener noreferrer">
        <h2 className="text-xl font-semibold">
            Banners{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </Link>
      </div>
    </main>
  );
}
