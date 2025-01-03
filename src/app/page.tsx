import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold mb-6">Welcome to Cake Pop Showcase</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* <img src="/cakepop1.jpg" alt="Cakepop 1" className="rounded-lg shadow-md" />
        <img src="/cakepop2.jpg" alt="Cakepop 2" className="rounded-lg shadow-md" />
        <img src="/cakepop3.jpg" alt="Cakepop 3" className="rounded-lg shadow-md" /> */}
      </div>
    </main>
    </div>
  );
};
