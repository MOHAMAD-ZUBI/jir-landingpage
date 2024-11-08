import Providers from "@/app/components/Providers";
import Header from "@/app/components/main/Header";
import Footer from "@/app/components/main/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Header />
      <main>{children}</main>
      <Footer />
    </Providers>
  );
}
