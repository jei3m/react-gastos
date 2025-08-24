import Navbar from "@/components/custom/navbar";
import { Dock } from "@/components/custom/dock";

export default function TransactionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar/>
      {children}
      <Dock 
        variant='default'
        className='w-full sticky bottom-0'
        showLabels={false}
      />
    </>
  );
};