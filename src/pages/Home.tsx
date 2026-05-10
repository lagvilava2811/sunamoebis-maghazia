import { useLenis } from '@/hooks/useLenis';
import TopNav from '@/components/TopNav';
import NoiseOverlay from '@/components/NoiseOverlay';
import SectionDivider from '@/components/SectionDivider';
import HeroSection from '@/sections/HeroSection';
import FragranceCollectionSection from '@/sections/FragranceCollectionSection';
import MoodChamberSection from '@/sections/MoodChamberSection';
import CollectionGridSection from '@/sections/CollectionGridSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import Footer from '@/components/Footer';

export default function Home() {
  useLenis();

  return (
    <>
      <TopNav />
      <NoiseOverlay />

      <main>
        <HeroSection />

        <SectionDivider dark />
        <FragranceCollectionSection />

        <SectionDivider dark />
        <MoodChamberSection />

        <SectionDivider dark={false} />
        <CollectionGridSection />

        <SectionDivider dark={false} />
        <TestimonialsSection />
      </main>

      <Footer />
    </>
  );
}
