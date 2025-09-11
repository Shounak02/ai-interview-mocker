"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircleIcon, AlertCircleIcon } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

function AddNewInterview({ interviewList = [], onInterviewAdded }) {
  const [openDailog, setOpenDailog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLimitAlert, setShowLimitAlert] = useState(false); // show alert
  const router = useRouter();
  const { user } = useUser();

  const maxFreeInterviews = 7;

  const handleAddInterviewClick = () => {
    if (interviewList.length >= maxFreeInterviews) {
      setShowLimitAlert(true);
      return;
    }

    setOpenDailog(true);
  };

  const redirectToUpgrade = () => {
    router.push("/dashboard/upgrade");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const InputPrompt =
        "Job Position: " +
        jobPosition +
        ", Job Description: " +
        jobDesc +
        ", Years of Experience:" +
        jobExperience +
        " , Depends on this information please give me " +
        process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
        " Interview question with Answered in Json Format, Give Question and Answered as field in JSON";

      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      if (!MockJsonResp) throw new Error("Failed to generate interview JSON");

      const resp = await db.insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: new Date().toISOString(),
        })
        .returning({ mockId: MockInterview.mockId });

      if (resp && resp[0]?.mockId) {
        setOpenDailog(false);
        if (onInterviewAdded) onInterviewAdded(); // refresh dashboard
        router.push("/dashboard/interview/" + resp[0].mockId);
      }
    } catch (error) {
      console.error(error);
      setShowLimitAlert(true);
    }

    setLoading(false);
  };

  // auto-hide alert after 4s
  useEffect(() => {
    if (showLimitAlert) {
      const timer = setTimeout(() => setShowLimitAlert(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showLimitAlert]);

  return (
    <div>
      {/* Limit Alert */}
      {showLimitAlert && (
        <Alert variant="destructive" className="mb-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <AlertCircleIcon />
            <AlertTitle>Free Tier Limit Reached!</AlertTitle>
          </div>
          <AlertDescription>
            Free users can create only {maxFreeInterviews} interviews. Upgrade to continue.
          </AlertDescription>
          <Button
            variant="destructive"
            size="sm"
            className="mt-2 self-start"
            onClick={redirectToUpgrade}
          >
            Upgrade Now
          </Button>
        </Alert>
      )}

      <div
        className={`relative w-90 h-50 flex items-center justify-center 
          rounded-3xl border border-primary/30 
          bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5
          shadow-[0_0_12px_var(--tw-shadow-color)] 
          hover:shadow-[0_0_28px_var(--tw-shadow-color)]
          shadow-primary/20
          transition-all duration-300 ease-in-out cursor-pointer 
          hover:scale-105 p-10`}
        onClick={handleAddInterviewClick}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-30 blur-lg animate-pulse" />
        <h2 className="relative font-bold text-2xl text-center text-primary z-10">
          + Add New
        </h2>
      </div>

      <Dialog open={openDailog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, Job description
                    and years of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/ Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="mt-5 my-3">
                    <label>Job Description/ Tech Stack (In Short)</label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJs, MySql etc"
                      required
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="mt-5 my-3">
                    <label>Years of experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max="50"
                      required
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDailog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="hover:shadow-md cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <LoaderCircleIcon className="animate-spin mr-2" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
