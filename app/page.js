import Image from "next/image";
import Header from "./components/landing/Header";
import EventList from "./components/landing/EventList";

export default function Home() {
  return (
    <section className="container">
      <Header />
      <EventList />
    </section>
  );
}
