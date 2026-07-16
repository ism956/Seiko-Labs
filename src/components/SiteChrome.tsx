import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";

export function SiteChrome({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
