import React from 'react';

const Newscard = ({ data }) => {
  console.log(data);

  // Get the start of today and yesterday
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to midnight
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1); // One day before today

  // Filter articles with valid fields and from today or yesterday
  const filteredData =
    data?.filter((item) => {
      const publishedDate = new Date(item.publishedAt);
      return (
        item.title &&
        item.description &&
        item.urlToImage &&
        item.author &&
        /^[a-zA-Z\s]+$/.test(item.author) && // Valid English author names
        publishedDate >= yesterday && // Published after the start of yesterday
        publishedDate < new Date(today.getTime() + 24 * 60 * 60 * 1000) // Before the end of today
      );
    }) || [];

  // Debugging
  console.log('Filtered Data:', filteredData);

  if (filteredData.length === 0) {
    return <div className="text-center text-gray-500 py-10">No recent news available</div>;
  }

  const readmore = (url) => {
    window.open(url, "_blank"); // Opens the URL in a new tab
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6">
      {filteredData.map((curItem, index) => {
        const publishedDate = new Date(curItem.publishedAt);
        const formattedDate = publishedDate.toLocaleString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short', // Displays the time zone
        });

        return (
          <div
            key={index}
            className="flex flex-col bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Image */}
            <img
              src={curItem.urlToImage || 'https://via.placeholder.com/400'}
              alt="news"
              className="w-full h-64 object-cover rounded-t-xl"
            />
            {/* Card content with white background */}
            <div className="flex flex-col flex-1 p-6 bg-white rounded-b-xl">
              <a
                className="cursor-pointer hover:underline"
                onClick={() => readmore(curItem.url)}
              >
                <h3 className="text-2xl font-extrabold text-gray-800 mb-2 leading-tight hover:text-indigo-700 transition-all duration-300">
                  {curItem.title}
                </h3>
              </a>
              <p className="text-md text-gray-600 flex-grow">{curItem.description}</p>
              <div className="text-xs text-gray-500 flex justify-between items-center">
                <span className="italic">Author: {curItem.author}</span>
                <span className="italic">Published: {formattedDate}</span>
              </div>
              <button
                className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition duration-300 cursor-pointer"
                onClick={() => readmore(curItem.url)}
              >
                Read More
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Newscard;
