import EventDetails from "@/app/components/details/EventDetails";
import EventVanue from "@/app/components/details/EventVanue";
import HeaderSection from "@/app/components/details/HeaderSection";
import React from "react";

function page() {
  return (
    <>
      <HeaderSection />
      <section className="container">
        <div className="grid grid-cols-5 gap-12 my-12">
          <EventDetails />
          <EventVanue />
        </div>
      </section>
    </>
  );
}

export default page;
