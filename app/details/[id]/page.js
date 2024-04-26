import EventDetails from "@/components/details/EventDetails";
import EventVanue from "@/components/details/EventVanue";
import HeaderSection from "@/components/details/HeaderSection";
import { getEventById } from "@/db/queries";
import React from "react";

export async function generateMetadata({ params: { id } }) {
  const eventInfo = await getEventById(id);

  return {
    title: `Eventry - ${eventInfo?.name}`,
    description: eventInfo?.details,
    openGraph: {
      images: [eventInfo?.imageUrl],
    },
  };
}

async function EventDetailsPage({ params: { id } }) {
  const eventDetails = await getEventById(id);

  return (
    <>
      <HeaderSection eventDetails={eventDetails} />
      <section className="container">
        <div className="grid grid-cols-5 gap-12 my-12">
          <EventDetails
            details={eventDetails?.details}
            swags={eventDetails?.swags}
          />
          <EventVanue location={eventDetails?.location} />
        </div>
      </section>
    </>
  );
}

export default EventDetailsPage;
