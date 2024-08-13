

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">  
    <div className="mb-3 text-2xl font-semibold">
      <img
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/9d5129b7-ce49-47de-9432-43876d118928/d6r6e7d-3aa7ddfc-7628-4442-8541-1fe1dc3844c2.png/v1/fit/w_750,h_224/terraria_logo_hd_by_dragondeplatino_d6r6e7d-375w-2x.png"
        alt="Terraria Header"
      />
    </div>
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://terraria.wiki.gg/wiki/Terraria_Wiki"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Terraria-wiki{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </a>
        <a
          href="http://localhost:3000/banners"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Banners{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </a>
      </div>
    </main>
  );
}
