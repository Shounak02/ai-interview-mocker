"use client"
import React from 'react'
import { useState } from "react";
import { Button } from "@/components/ui/button";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircleIcon } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDailog, setOpenDailog]=useState(false)
    const [jobPosition, setJobPosition]=useState();
    const [jobDesc, setJobDesc]=useState();
    const [jobExperience, setJobExperience]=useState();
    const [loading,setLoading]=useState(false);
    const [jsonResponse, setJsonResponse]=useState([]);
    const router=useRouter();
    const {user}=useUser();
    const onSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault()
        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt="Job Position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience:"+jobExperience+" , Depends on this information please give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +" Interview question with Answered in Json Format, Give Question and Answered as field in JSON"
        const result=await chatSession.sendMessage(InputPrompt);
        const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);

        if(MockJsonResp){

        const resp=await db.insert(MockInterview)
        .values({
            mockId:uuidv4(),
            jsonMockResp:MockJsonResp,
            jobPosition:jobPosition,
            jobDesc:jobDesc,
            jobExperience:jobExperience,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-yyyy')
        }).returning({mockId:MockInterview.mockId})

        console.log("Inserted ID:", resp)
        if(resp){
            setOpenDailog(false);
            router.push('/dashboard/interview/'+resp[0]?.mockId)
        }
    }else{
        console.log("Error");
    }
        setLoading(false);
    }

  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary hover:scale-105 
        hover:shadow-md cursor-pointer transition-all'
        onClick={()=>setOpenDailog(true)}
        >
            <h2 className='font-bold text-lg text-center'>+ Add New</h2>
        </div>
        <Dialog open={openDailog}>
        <DialogContent className="max-w-3xl">
            <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
            <DialogDescription>
                <form onSubmit={onSubmit}>
                <div>
                    <h2>Add Details about your job position/role, Job description and years of experience</h2>
                    <div className='mt-7 my-3'>
                        <label>Job Role/ Job Position</label>
                        <Input placeholder="Ex. Full Stack Developer" required
                        onChange={(event)=>setJobPosition(event.target.value)}
                        />
                    </div>
                    <div className='mt-5 my-3'>
                        <label>Job Description/ Tech Stack (In Short)</label>
                        <Textarea placeholder="Ex. React, Angular, NodeJs, MySql etc" required
                        onChange={(event)=>setJobDesc(event.target.value)}
                        />
                    </div>
                    <div className='mt-5 my-3'>
                        <label>Years of experience</label>
                        <Input placeholder="Ex. 5" type="number" max="50" required
                        onChange={(event)=>setJobExperience(event.target.value)}
                        />
                    </div>
                </div>
                <div className='flex gap-5 justify-end '>
                    <Button type="button" variant="ghost" onClick={()=>setOpenDailog(false)}>Cancel</Button>
                    <Button type="submit"className="hover:shadow-md cursor-pointer" disabled={loading}>
                        {loading?
                        <>
                        <LoaderCircleIcon className='animate-spin'/>Generating from AI
                        </>:'Start Interview'
                    }
                        </Button>
                </div>
                </form>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddNewInterview