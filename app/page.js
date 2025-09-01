// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div>
//       <h2>Hello</h2>
//     </div>
//   );
// }


// "use client";
// import { useUser } from '@clerk/nextjs';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Home() {
//   const { isSignedIn } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     if (isSignedIn) router.replace('/dashboard');
//     else router.replace('/sign-in');
//   }, [isSignedIn]);

//   return null;
// }



"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/dashboard"); 
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return <LandingPage />; 
  }

  return null;
}
