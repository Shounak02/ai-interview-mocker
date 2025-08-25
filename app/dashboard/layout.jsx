import React from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 mx-5 md:mx-20 lg:mx-36">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DashboardLayout;
