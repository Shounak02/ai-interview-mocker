"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { CalendarDays, Repeat, Award } from "lucide-react";
import CountUp from "react-countup";

function AnalyticsCard() {
  const { user } = useUser();
  const [totalInterviews, setTotalInterviews] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchInterviews = async () => {
      const interviews = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.createdAt));

      if (!interviews.length) {
        setTotalInterviews(0);
        setCurrentStreak(0);
        setLongestStreak(0);
        return;
      }

      setTotalInterviews(interviews.length);

      // Normalize dates to midnight and sort ascending
      const sortedDates = interviews
        .map((i) => new Date(i.createdAt).setHours(0, 0, 0, 0))
        .sort((a, b) => a - b);

      // Longest streak
      let longest = 1;
      let tempStreak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        if (sortedDates[i] - sortedDates[i - 1] === 86400000) {
          tempStreak++;
        } else if (sortedDates[i] !== sortedDates[i - 1]) {
          tempStreak = 1;
        }
        if (tempStreak > longest) longest = tempStreak;
      }

      // Current streak ending today or last interview
      let current = 1;
      for (let i = sortedDates.length - 1; i > 0; i--) {
        if (sortedDates[i] - sortedDates[i - 1] === 86400000) {
          current++;
        } else {
          break;
        }
      }

      setLongestStreak(longest);
      setCurrentStreak(current);
    };

    fetchInterviews();
  }, [user]);

  return (
    <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 shadow-md">
      <div className="flex flex-col gap-6 p-6">
        <h2 className="font-bold text-2xl text-gray-800 mb-2">Analytics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Total Interviews */}
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CalendarDays className="w-6 h-6 text-indigo-500" />
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Total Interviews</span>
              <span className="font-bold text-lg">
                <CountUp end={totalInterviews} duration={1.5} />
              </span>
            </div>
          </div>

          {/* Current Streak */}
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
            <Repeat className="w-6 h-6 text-green-500" />
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Current Streak</span>
              <span className="font-bold text-lg">
                <CountUp end={currentStreak} duration={1.5} /> days
              </span>
            </div>
          </div>

          {/* Longest Streak */}
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
            <Award className="w-6 h-6 text-yellow-500" />
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Longest Streak</span>
              <span className="font-bold text-lg">
                <CountUp end={longestStreak} duration={1.5} /> days
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard;
