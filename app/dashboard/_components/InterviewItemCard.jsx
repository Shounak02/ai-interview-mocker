"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import React from "react";

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };

  return (
    <li className="min-h-[14rem] list-none">
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="space-y-2">
              <h2 className="font-bold text-primary text-xl capitalize">
                {interview?.jobPosition || "N/A"}
              </h2>
              <h2 className="text-base text-gray-600 capitalize">
                {interview?.jobExperience || 0} Years of Experience
              </h2>
              <h2 className="text-sm text-gray-500 capitalize">
                Created At:{" "}
                {interview?.createdAt
                  ? new Date(interview.createdAt).toLocaleDateString()
                  : "N/A"}
              </h2>
            </div>
            <div className="flex justify-between mt-2 gap-5 ">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 hover:cursor-pointer"
                onClick={onFeedbackPress}
                disabled={!interview?.mockId}
              >
                Feedback
              </Button>
              <Button
                size="sm"
                className="flex-1 hover:cursor-pointer"
                onClick={onStart}
                disabled={!interview?.mockId}
              >
                Start
              </Button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default InterviewItemCard;
