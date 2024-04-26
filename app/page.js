import Image from "next/image";
import Header from "../components/landing/Header";
import EventList from "../components/landing/EventList";
import { Suspense } from "react";
import EventListLoader from "@/components/ui/loaders/EventListLoader";

export default function Home({ searchParams: { query } }) {
  return (
    <section className="container">
      <Header />
      <Suspense key={query} fallback={<EventListLoader />}>
        <EventList query={query} />
      </Suspense>
    </section>
  );
}
