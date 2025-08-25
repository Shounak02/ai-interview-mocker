"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


function Feedback() {

    const params = useParams();
    const interviewId = params.interviewId; 
    const [feedbackList,setFeedbackList]=useState([]);
    const router=useRouter();
    useEffect(()=>{
        GetFeedback();
    },[])

    const GetFeedback=async()=>{
        const result=await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef,interviewId))
        .orderBy(UserAnswer.id);

        console.log(result);
        setFeedbackList(result);
    }

    const avgRating = feedbackList.length > 0
      ? feedbackList.reduce((acc, item) => acc + item.rating / feedbackList.length, 0)
      : 0;

    const ratingColor =
      avgRating <= 3 ? "text-red-500" :
      avgRating <= 7 ? "text-yellow-500" :
      "text-green-500";


  return (
    <div className='p-10'>
        

        {feedbackList?.length==0?
        <h2 className='font-bold text-xl text-gray-500 mb-5 mt-5'>No Interview Feedback Record Found</h2>
        :
        <>
        <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
        <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
        
        <h2 className='text-primary text-lg my-3'>
          Your overall interview rating:{" "}
          <strong className={ratingColor}>{avgRating.toFixed(1)}/10</strong>
        </h2>

        <h2 className='text-sm text-gray-500'>Find below interview question with correct answer, Your answer and feedback for improvement</h2>
        {feedbackList&&feedbackList.map((item,index)=>(
            <Collapsible key={index} className='mt-6'>
            <CollapsibleTrigger className='flex justify-between p-2 bg-secondary rounded-lg my-2 text-left gap-7 w-full'>
            {item.question} <ChevronsUpDownIcon className='h-5 w-5'/>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
                    <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                    <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'><strong>Feedback: </strong>{item.feedback}</h2>
                </div>
            </CollapsibleContent>
            </Collapsible>
        ))}
      </>}

        <Button className="mt-5" onClick={()=>router.replace('/dashboard')}>Go Home</Button>

    </div>
  )
}

export default Feedback