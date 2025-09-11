"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { act, useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
// import { Link } from 'lucide-react';
import Link from "next/link";


function StartInterview({params}) {

    const [interviewData,setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
    useEffect(()=>{
        GetInterviewDetails();
    },[]);

    // used to get Interview details by mockid/intrview id
        const GetInterviewDetails=async()=>{
    
            const result=await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId,params.interviewId))
    
            const jsonMockResp=JSON.parse(result[0].jsonMockResp);
            console.log(jsonMockResp)
            setMockInterviewQuestion(jsonMockResp);
            setInterviewData(result[0]);
        }
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* Questions */}
            <QuestionsSection 
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            />

            {/* Video/ Audio Recording */}
            <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
            />
        </div>
        <div className='flex justify-end gap-6 pb-6'>
            {activeQuestionIndex>0&&
            <Button className={"hover:scale-110 cursor-pointer"} onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
            {activeQuestionIndex!=mockInterviewQuestion?.length-1&&
            <Button className={"hover:scale-110 cursor-pointer"} onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1) }>Next Question</Button>}
            {activeQuestionIndex==mockInterviewQuestion?.length-1&&
            <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
            <Button className="bg-red-500 text-white hover:bg-red-600 hover:scale-110 cursor-pointer">End Interview</Button>
            </Link>}            
        </div>
    </div>
  )
}

export default StartInterview