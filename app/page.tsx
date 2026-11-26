import { BookingForm } from "@/components/BookingForm";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { ExampleNotice } from "@/components/ExampleNotice";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PawField } from "@/components/PawField";
import { PetPicker } from "@/components/PetPicker";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";
import { Timeline } from "@/components/Timeline";
import { TrustCounter } from "@/components/TrustCounter";

export default function Home() {
  return (
    <>
      <ExampleNotice />
      <Header />
      <main id="contenido">
        <Hero />
        <PetPicker />
        <Services />
        <TrustCounter />
        <EmergencyBanner />
        <Team />
        <Timeline />
        <BookingForm />
        <Reviews />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <PawField />
    </>
  );
}
