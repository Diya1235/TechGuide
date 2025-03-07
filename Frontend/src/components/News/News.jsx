import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import Newscard from './Newscard';
import axios from 'axios';

const News = () => {
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('technology'); // Default to technology news
  const [newsdata, setNewsdata] = useState([]);

  const API_KEY = 'c28915e91de84a11a00e87f71faace56';

  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const location = 'Mumbai';

  // Fetch Weather Data
  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = '52c28463ec4b4bfa8de163958241112';
      const city = 'Mumbai';

      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );
        setTemperature(response.data.current.temp_c);
        setWeatherIcon(response.data.current.condition.icon);
      } catch (err) {
        setError('Failed to fetch weather data');
      }
    };

    fetchWeather();
  }, []);

  // Fetch News Data
  const getData = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&sortBy=publishedAt&apiKey=${API_KEY}`
      );
      const jsonData = await response.json();

      if (jsonData.status !== 'ok') {
        console.error('Error fetching news data:', jsonData.message);
        return;
      }

      // Filter out old news (past 3-4 days) and duplicates
      const currentDate = new Date();
      const cutoffDate = new Date();
      cutoffDate.setDate(currentDate.getDate() - 4);

      const uniqueArticles = [];
      const seenTitles = new Set();

      jsonData.articles.forEach((article) => {
        const publishedDate = new Date(article.publishedAt);

        if (
          publishedDate >= cutoffDate &&
          !seenTitles.has(article.title) // Check for duplicates
        ) {
          uniqueArticles.push(article);
          seenTitles.add(article.title);
        }
      });

      setNewsdata(uniqueArticles); // Update state with filtered news
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  // Fetch data when search term changes
  useEffect(() => {
    getData();
  }, [search]);

  // Handle input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Trigger search
  const handleSearchClick = () => {
    setSearch(searchTerm); // Update search state and fetch news
  };

  // Handle category badge click
  const handleCategoryClick = (category) => {
    setSearch(category); // Update search term and fetch news
  };

  // Function to open weather forecast in a new tab
  const goToWeatherForecast = () => {
    const city = 'Mumbai';
    const url = `https://www.google.com/search?q=weather+${city}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <Navbar />
      <div className="bg-blue-950 text-white py-2 px-4 flex flex-col sm:flex-row justify-between items-center shadow-lg">
        <div className="flex justify-between items-center w-full sm:w-auto sm:flex-row sm:space-x-4">
          <div className="text-sm font-medium sm:flex sm:items-baseline sm:space-x-2 sm:w-auto w-full text-center sm:text-left">
            <div>
              {currentDate} |{' '}
              <a href="https://www.google.com/search?q=weather+Mumbai" className="underline">
                {location}{' '}
              </a>
              <div className="inline-block">
                {error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <p>
                    {temperature ? `${temperature}°C` : 'Loading...'}
                    <a href="https://www.google.com/search?q=weather+Mumbai">
                      <img
                        src={`https:${weatherIcon}`}
                        alt="Weather Icon"
                        className="inline-block ml-2 rounded-full shadow-md"
                        style={{ width: '24px', height: '24px' }}
                        onClick={goToWeatherForecast}
                      />
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="sm:text-center text-center mt-2 sm:mt-0">
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="text-blue-800">TECH</span> TRENDS
            </h1>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
        <div className="bg-blue-500 py-4 shadow-md flex justify-center items-center">
          <p className="text-lg font-semibold text-white text-center">
            Stay updated with the latest Technology Trends!
          </p>
        </div>

        <div className="flex justify-center mt-4 sm:mt-8 py-4 w-full">
  <div className="flex items-center gap-4 p-4 rounded-lg ">
    <input
      type="text"
      className="px-6 py-3 rounded-full border-2 border-blue-500 focus:ring-2 focus:ring-blue-500 w-40 md:w-60 text-lg placeholder-gray-500 bg-transparent"
      placeholder="Search Technology, Science, Business..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
    <button
      onClick={handleSearchClick}
      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full hover:scale-105 transition-all duration-300 ease-in-out"
    >
      Search
    </button>
  </div>
</div>




        <div className="flex justify-center gap-4 my-6">
          {['Business', 'Technology', 'Science'].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category.toLowerCase())}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="px-4 py-6">
          {newsdata ? <Newscard data={newsdata} /> : <p>Loading news...</p>}
        </div>
      </div>
    </>
  );
};

export default News;
