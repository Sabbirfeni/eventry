"use client";

import { updateEventInterested } from "@/actions";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";

function ActionButtons({
  eventId,
  interestedUserIds,
  goingUserIds,
  fromDetails,
}) {
  const { auth } = useAuth();
  const router = useRouter();
  const isInterested = interestedUserIds.find((id) => id === auth?.id);
  const isGoing = goingUserIds.find((id) => id === auth?.id);

  const [interested, setInterested] = useState(isInterested);
  const [going, setGoing] = useState(isGoing);

  const [isPending, startTransition] = useTransition();

  const toggleInterest = async () => {
    if (auth) {
      await updateEventInterested(eventId, auth?.id);
      setInterested(!interested);
    } else {
      router.push("/login");
    }
  };
  const makeGoing = () => {
    if (auth) {
      router.push(`/payment/${eventId}`);
    } else {
      router.push("/login");
    }
  };
  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button
        onClick={() => startTransition(() => toggleInterest())}
        className={`w-full ${
          interested ? "bg-indigo-600 hover:bg-indigo-800" : "bg-[#313131]"
        } `}
      >
        {isPending ? "Loading..." : "Interested"}
      </button>

      <button
        disabled={auth && going}
        onClick={makeGoing}
        className={`w-full  ${
          auth && going ? "bg-green-400 disabled:bg-green-400" : "bg-[#313131]"
        } rounded-md flex items-center justify-center`}
      >
        Going
      </button>
    </div>
  );
}

export default ActionButtons;
