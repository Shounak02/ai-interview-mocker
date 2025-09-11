"use client";
import { db } from "@/utils/db";
import { UserAnswer, MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { useUser } from "@clerk/nextjs";

function Feedback() {
  const params = useParams();
  const interviewId = params.interviewId;
  const [feedbackList, setFeedbackList] = useState([]);
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    fetchFeedback();
    fetchInterviewInfo();
  }, []);

  const fetchFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(result);
  };

  const fetchInterviewInfo = async () => {
    const info = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));
    if (info.length > 0) {
      const i = info[0];
      setJobRole(i.jobPosition || "N/A");
      setJobDescription(i.jobDesc || "N/A");
      setInterviewDate(
        i.createdAt ? new Date(i.createdAt).toLocaleDateString() : "N/A"
      );
      setCandidateName(i.createdBy || user?.fullName || "N/A");
    }
  };

  const avgRating =
    feedbackList.length > 0
      ? feedbackList.reduce((acc, item) => acc + Number(item.rating), 0) /
        feedbackList.length
      : 0;

  const ratingColor =
    avgRating <= 3
      ? "text-red-500"
      : avgRating <= 7
      ? "text-yellow-500"
      : "text-green-500";

  // Helper to wrap long text nicely
  const addWrappedText = (
    doc,
    text,
    x,
    y,
    maxWidth,
    lineHeight,
    color = [0, 0, 0]
  ) => {
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line) => {
      doc.text(line, x, y);
      y += lineHeight;
    });
    return y;
  };

  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    // ===== HEADER =====
    doc.setFillColor(46, 204, 113);
    doc.rect(0, 0, 595, 80, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("Interview Feedback", 40, 45);

    // ---- Candidate & Job Info ----
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let y = 100;
    y = addWrappedText(doc, `Candidate: ${candidateName}`, 40, y, 520, 16);
    y = addWrappedText(doc, `Job Role: ${jobRole}`, 40, y, 520, 16);
    y = addWrappedText(doc, `Job Description: ${jobDescription}`, 40, y, 520, 16);
    y = addWrappedText(doc, `Interview Date: ${interviewDate}`, 40, y, 520, 16);
    y += 10;

    const ratingColorPDF =
      avgRating <= 3 ? [231, 76, 60] : avgRating <= 7 ? [241, 196, 15] : [39, 174, 96];
    doc.setTextColor(...ratingColorPDF);
    doc.setFont("helvetica", "bold");
    doc.text(`Overall Rating: ${avgRating.toFixed(1)}/10`, 40, y);
    y += 20;

    // ===== FEEDBACK BODY =====
    const lineHeight = 18;
    const maxWidth = 520;
    feedbackList.forEach((item, idx) => {
      doc.setFillColor(240);
      doc.roundedRect(30, y - 10, 535, 28, 4, 4, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(44, 62, 80);
      y = addWrappedText(doc, `${idx + 1}. ${item.question}`, 40, y + 8, maxWidth, lineHeight);
      y += 6;

      doc.setFont("helvetica", "bold");
      y = addWrappedText(doc, `Rating: ${item.rating}`, 40, y, maxWidth, lineHeight, [231, 76, 60]);
      y = addWrappedText(doc, "Your Answer:", 40, y + 4, maxWidth, lineHeight, [192, 57, 43]);
      doc.setFont("helvetica", "normal");
      y = addWrappedText(doc, item.userAns || "-", 60, y, maxWidth - 20, lineHeight);
      doc.setFont("helvetica", "bold");
      y = addWrappedText(doc, "Correct Answer:", 40, y + 4, maxWidth, lineHeight, [39, 174, 96]);
      doc.setFont("helvetica", "normal");
      y = addWrappedText(doc, item.correctAns || "-", 60, y, maxWidth - 20, lineHeight);
      doc.setFont("helvetica", "bold");
      y = addWrappedText(doc, "Feedback:", 40, y + 4, maxWidth, lineHeight, [41, 128, 185]);
      doc.setFont("helvetica", "normal");
      y = addWrappedText(doc, item.feedback || "-", 60, y, maxWidth - 20, lineHeight);
      y += 20;

      if (y > 750) {
        doc.addPage();
        y = 50;
      }
    });

    doc.save(`Feedback_${interviewId}.pdf`);
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      {feedbackList.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500 mt-10">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-green-600">🎉 Congratulations!</h2>
              <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
              <p className={`text-lg mt-2 ${ratingColor}`}>
                Overall Rating: <strong>{avgRating.toFixed(1)}/10</strong>
              </p>
            </div>
            <Button
              variant="outline"
              onClick={downloadPDF}
              className="flex items-center gap-2 border-green-600 text-green-700 hover:bg-green-50 
                          hover:scale-120 cursor-pointer hover:text-green-900"
            >
              <DownloadIcon className="w-4 h-4 " /> Download PDF
            </Button>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Below are your interview questions with correct answers, your responses, and feedback.
          </p>

          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-4">
              <CollapsibleTrigger className="flex justify-between p-3 bg-gray-50 rounded-lg text-left gap-4 hover:bg-gray-100 transition">
                {item.question} <ChevronsUpDownIcon className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2 p-3">
                  <p className="bg-red-50 text-red-900 p-2 rounded-md text-sm">
                    <strong>Rating:</strong> {item.rating}
                  </p>
                  <p className="bg-red-50 text-red-900 p-2 rounded-md text-sm">
                    <strong>Your Answer:</strong> {item.userAns}
                  </p>
                  <p className="bg-green-50 text-green-900 p-2 rounded-md text-sm">
                    <strong>Correct Answer:</strong> {item.correctAns}
                  </p>
                  <p className="bg-blue-50 text-blue-900 p-2 rounded-md text-sm">
                    <strong>Feedback:</strong> {item.feedback}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}

          <Button
            className="mt-6 bg-green-600 hover:bg-green-700 text-white hover:scale-110 cursor-pointer"
            onClick={() => router.replace("/dashboard")}
          >
            Go Home
          </Button>
        </>
      )}
    </div>
  );
}

export default Feedback;
