import Image from "next/image";
import React from "react";
import ActionButtons from "../ActionButtons";
import { getBlurData } from "@/utils/blur-generator";

async function HeaderSection({ eventDetails }) {
  const { base64 } = await getBlurData(eventDetails?.imageUrl);
  return (
    <section className="container">
      <div className="bg-gradient-to-b from-slate-200/20 to-slate-800/30">
        <Image
          src={eventDetails?.imageUrl}
          alt="Event 1"
          className="h-[450px] mx-auto"
          width={900}
          height={900}
          placeholder="blur"
          blurDataURL={base64}
        />
      </div>

      <div className="flex items-end">
        <div className="flex-auto py-4">
          <h1 className="font-bold text-2xl">Google I/O Extended</h1>
          <p className="text-[#9C9C9C] text-base mt-1">
            {eventDetails?.location}
          </p>
          <div className="text-[#737373] text-sm mt-1">
            <span>{eventDetails?.interested_ids?.length} Interested</span>
            <span>|</span>
            <span>{eventDetails?.going_ids?.length} Going</span>
          </div>
        </div>

        <ActionButtons
          eventId={eventDetails?.id}
          interestedUserIds={eventDetails?.interested_ids}
          goingUserIds={eventDetails?.going_ids}
          fromDetails={true}
        />
      </div>
    </section>
  );
}

export default HeaderSection;
