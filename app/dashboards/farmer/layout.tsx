import Navbar from '@/app/components/Navbar';

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
