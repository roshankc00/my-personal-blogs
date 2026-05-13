import { HomeContent } from "@/components/home/home-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background transition-colors">
      <SiteHeader />
      <HomeContent />
      <SiteFooter />
    </div>
  );
}
