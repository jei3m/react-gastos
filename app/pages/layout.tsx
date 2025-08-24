import Navbar from "@/components/custom/navbar";

export default function TransactionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar/>
      {children}
    </>
  );
};