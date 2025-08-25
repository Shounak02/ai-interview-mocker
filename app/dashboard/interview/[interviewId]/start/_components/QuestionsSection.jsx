import { Lightbulb, Volume2, Square } from 'lucide-react'
import React, { useEffect } from 'react'

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
    
    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            // stop any ongoing speech before starting new one
            window.speechSynthesis.cancel();

            if (text) {
                const speech = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(speech);
            }
        } else {
            alert('Sorry, Your browser does not support text to speech');
        }
    };

    const stopSpeech = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    };

    // stop speech when question changes
    useEffect(() => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }, [activeQuestionIndex]);

    return mockInterviewQuestion && (
        <div className='p-5 border rounded-lg my-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewQuestion.map((question, index) => (
                    <h2 
                        key={index}
                        className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer
                        ${activeQuestionIndex === index ? 'bg-black text-white' : 'bg-secondary'}`}
                    >
                        Question #{index + 1}
                    </h2>
                ))}
            </div>

            <h2 className='my-5 text-md md:text-lg'>
                {mockInterviewQuestion[activeQuestionIndex]?.Question}
            </h2>

            <div className="flex items-center gap-3">
                <Volume2 
                    className='cursor-pointer' 
                    onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)} 
                />
                <Square 
                    className='cursor-pointer text-red-600' 
                    onClick={stopSpeech} 
                />
            </div>

            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
                <h2 className='flex gap-2 items-center text-blue-700'>
                    <Lightbulb />
                    <strong>Note:</strong>
                </h2>
                <h2 className='text-sm text-blue-800 my-2'>
                    {process.env.NEXT_PUBLIC_QUESTION_NOTE}
                </h2>
            </div>
        </div>
    )
}

export default QuestionsSection;
