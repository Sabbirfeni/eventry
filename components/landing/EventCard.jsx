import Image from "next/image";
import CardImg from "@/public/assets/events/google-io-2023-1.png";
import React from "react";
import ActionButtons from "../ActionButtons";
import Link from "next/link";
import EventSchemaScript from "@/meta/EventShemaScript";

function EventCard({ event }) {
  return (
    <div className="overflow-hidden rounded-md bg-[#242526]">
      <EventSchemaScript event={event} />
      <Image
        src={event?.imageUrl}
        alt={event?.name}
        className="w-full"
        width={500}
        height={500}
      />

      <div className="p-3">
        <Link href={`/details/${event?.id}`} className="font-bold text-lg">
          {event?.name}
        </Link>
        <p className="text-[#9C9C9C] text-sm mt-1">{event?.location}</p>
        <div className="text-[#737373] text-sm mt-1">
          <span>{event?.interested_ids?.length} Interested</span>
          <span className="mx-2">|</span>
          <span>{event?.going_ids?.length} Going</span>
        </div>

        <ActionButtons
          eventId={event?.id}
          interestedUserIds={event?.interested_ids}
          goingUserIds={event?.going_ids}
        />
      </div>
    </div>
  );
}

export default EventCard;
