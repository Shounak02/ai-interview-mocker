"use client";
import { useUser } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';
import AddNewInterview from './_components/AddNewInterview';
import AnalyticsCard from './_components/AnalyticsCard';
import InterviewList from './_components/InterviewList';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';

function Dashboard() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  // Typewriter words
  const words = [
    { text: "Create", className: "text-gray-500" },
    { text: "and", className: "text-gray-500" },
    { text: "Start", className: "text-gray-500" },
    { text: "your", className: "text-gray-500" },
    { text: "AI", className: "text-blue-500 dark:text-blue-400" },
    { text: "Mockup", className: "text-gray-500" },
    { text: "Interview", className: "text-gray-500" },
  ];

  // Fetch user interviews dynamically
  const fetchInterviews = async () => {
    if (!user) return;
    const result = await db.select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id));

    setInterviewList(result);
  };

  useEffect(() => {
    fetchInterviews();
  }, [user]);

  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl pt-5'>Dashboard</h2>

      <div className='mt-2'>
        <TypewriterEffectSmooth
          words={words}
          className="text-gray-500 text-base sm:text-lg md:text-xl font-medium"
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 my-5 pb-20'>
        <div className="md:col-span-2">
          <AddNewInterview 
            interviewList={interviewList} 
            maxFreeInterviews={7}          // <-- pass free-tier limit here
            onInterviewAdded={fetchInterviews} // refresh list after adding new
          />
        </div>

        <div className="md:col-span-2">
          <AnalyticsCard interviewList={interviewList} />
        </div>
      </div>

      <InterviewList interviewList={interviewList} />
    </div>
  );
}

export default Dashboard;
