"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import React, { useEffect, useState } from 'react'
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Webcam from "react-webcam";  
import Link from 'next/link';

function Interview({params}) {
    
    const [interviewData,setInterviewData]=useState();
    const [webcamEnabled,setWebCamEnabled]=useState(false);

    useEffect(()=>{
        console.log(params.interviewId)
        GetInterviewDetails();
    },[])

    // used to get Interview details by mockid/intrview id
    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))
        setInterviewData(result[0]);
    }

    return (
    <div className='my-10'>
        <h2 className='font-bold text-2xl'>Let's Get Started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10' >
            <div className='flex flex-col my-5 gap-5 '>
                <div className='flex flex-col p-5 rounded-lg border'>
                    <h2 className='text-lg'><strong>Job Role/Job Position : </strong>{interviewData?.jobPosition}</h2>
                    <h2 className='text-lg'><strong>Job Description/Tech Stack : </strong>{interviewData?.jobDesc}</h2>
                    <h2 className='text-lg'><strong>Years of Experience : </strong>{interviewData?.jobExperience}</h2>
                </div>   
                <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                    <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
                    <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                </div>
            </div>

            <div>
                {webcamEnabled ? (
                    <Webcam
                        audio={true}
                        onUserMedia={() => setWebCamEnabled(true)}
                        onUserMediaError={() => setWebCamEnabled(false)}
                        mirrored={true}
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: 400,  
                            borderRadius: '0.5rem',
                        }}
                    />
                ) : (
                    <>
                        <WebcamIcon className='h-70 w-full my-7 p-20 bg-secondary rounded-lg border'/>
                        <Button 
                            variant="destructive" 
                            className="w-full"
                            onClick={()=>setWebCamEnabled(true)}
                        >
                            Enable Web Cam and Microphone
                        </Button>
                    </>
                )}
            </div>
        </div>

        <div className='pt-5 flex justify-end items-end'>
            <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                <Button className={webcamEnabled ? "bg-green-600 hover:bg-green-700" : ""}>
                    Start Interview
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default Interview
