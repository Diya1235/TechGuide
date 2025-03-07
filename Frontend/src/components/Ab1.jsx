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
            In 2024,One Bsc IT student find it difficult to get shortlisted while applying for job. She noticed that traditional resume  wasn’t as
            effective anymore. Along the way, TechGuide expanded its offerings to
            help this IT Seekers to make their path easier into the Industry.
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
