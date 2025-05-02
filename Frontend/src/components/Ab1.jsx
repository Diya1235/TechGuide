import React from "react";

const Ab1 = () => {
  return (
    <div className="bg-gray-100 p-8 space-y-16">
      {/* Mission Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <img
          src="https://img.freepik.com/premium-photo/businessman-hands-black-suit-sitting-pointing-chess-king-vintage-table-meaning-planning-strategy_44289-1461.jpg?uid=R160060484&ga=GA1.1.1042404616.1705058647&semt=ais_hybrid"
          alt="HubSpot Office"
          className="rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Our Mission: Helping Millions of Tech Seekers Grow Better
          </h2>
          <p className="mt-4 text-gray-600">
            We believe our growth is deeply tied to growing better and helping
            businesses build better relationships with their customers.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
          <p className="mt-4 text-gray-600">
  In 2024, a BSc IT student faced constant rejection while applying for jobs through popular job portals. Despite having the right skills, she noticed that her resume never made it past the initial screening stages. Frustrated by this recurring issue, she realized that traditional resumes were no longer effective in the evolving job market. After talking to peers, she found that many of her classmates and fellow job seekers were facing the same problem—automated resume screening systems were filtering them out. Determined to find a solution, she decided to take matters into her own hands. This marked the beginning of a journey that led to the creation of TechGuide—a platform designed to help IT aspirants craft ATS-friendly resumes, gain practical insights, and bridge the gap between academic knowledge and industry expectations. Over time, TechGuide expanded its offerings, becoming a trusted ally for IT seekers striving to break into the industry with confidence.
</p>

        </div>
        <img
          src="https://img.freepik.com/free-photo/man-using-laptop-office-doing-document-analysis_1150-26850.jpg?uid=R160060484&ga=GA1.1.1042404616.1705058647&semt=ais_hybrid"
          alt="Founders Discussion"
          className="rounded-lg shadow-lg"
        />
      </div>

      
      

     
    </div>
  );
};

export default Ab1;
