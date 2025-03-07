import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import Select from "react-select";
import "leaflet/dist/leaflet.css";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";

const MapClickHandler = ({ setMarker, setSelectedCity, setSelectedCountry, setShowCourseSelect }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setMarker([lat, lng]);
      setShowCourseSelect(true);
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        if (data.address) {
          const city = data.address.city || data.address.town || data.address.village || "Unknown City";
          const country = data.address.country || "Unknown Country";
          setSelectedCity(city);
          setSelectedCountry(country);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    },
  });
  return null;
};

const fetchColleges = async (city, country, course) => {
  try {
    let universities = [];

    // Fetch universities from Geonames API
    const geoResponse = await fetch(`http://api.geonames.org/searchJSON?q=university&country=${encodeURIComponent(country)}&maxRows=10&username=diya45`);
    const geoData = await geoResponse.json();

    if (geoData.geonames) {
      universities = geoData.geonames.map((uni) => ({
        name: uni.name,
        link: `https://www.google.com/search?q=${encodeURIComponent(uni.name)}`,
      }));
    }

    // Fetch additional details from Wikipedia API
    const query = `${course} Colleges/Universities in ${city ? city + ", " : ""}${country}`;
    const wikiResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${encodeURIComponent(query)}`);
    const wikiData = await wikiResponse.json();

    if (wikiData.query?.search) {
      universities = [
        ...universities,
        ...wikiData.query.search.map((item) => ({
          name: item.title,
          link: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
        })),
      ];
    }

    return universities.length > 0 ? universities : [];
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return [];
  }
};


const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const [marker, setMarker] = useState(null);
  const [showCourseSelect, setShowCourseSelect] = useState(false);
  const [mapActive, setMapActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const courseOptions = [
    { value: "Master of Computer Applications", label: "MCA" },
    { value: "Master of Business Administration", label: "MBA" },
    { value: "Master of Science in Information Technology", label: "MSc IT" },
  ];
  const fetchInstitutions = useCallback(async () => {
    if (!selectedCountry || !selectedCity || !selectedCourse) return;
    setLoading(true);
    setError(null);
    const colleges = await fetchColleges(selectedCity, selectedCountry, selectedCourse);
    setInstitutions(colleges.length > 0 ? colleges : []);
    setLoading(false);
  }, [selectedCity, selectedCountry, selectedCourse]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-4 w-full relative">
        <h1 className="text-2xl font-bold mb-4 text-center">Find Top Colleges & Institutions</h1>
        <div className="flex flex-wrap gap-4 mb-4 w-full max-w-xl relative z-50 bg-white p-4 shadow-lg rounded-md">
          <input
            type="text"
            placeholder="Enter Country"
            className="border px-4 py-2 rounded w-full"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter City"
            className="border px-4 py-2 rounded w-full"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setMarker(null);
            }}
          />
          <div className="relative z-50 w-full">
            <Select
              options={courseOptions}
              onChange={(selected) => setSelectedCourse(selected.value)}
              placeholder="Select a Course"
              className="z-50"
              classNamePrefix="select"
            />
          </div>
          <button onClick={fetchInstitutions} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            {loading ? "Searching..." : "Search Colleges"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => setMapActive(!mapActive)}>
          {mapActive ? "Close Map" : "Open Map"}
        </button>

        <div className="w-full h-[500px] md:h-[600px] relative z-40 overflow-visible transition-all duration-500">
          {mapActive && (
            <MapContainer center={[20, 0]} zoom={2} className="w-full h-full rounded-lg shadow-lg">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapClickHandler
                setMarker={setMarker}
                setSelectedCity={setSelectedCity}
                setSelectedCountry={setSelectedCountry}
                setShowCourseSelect={setShowCourseSelect}
              />
              {marker && (
                <Marker position={marker}>
                  <Popup>
                    <h3 className="font-bold">{selectedCity}, {selectedCountry}</h3>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          )}
        </div>

        {loading && <p className="text-center mt-4">Loading colleges...</p>}
        {institutions.length > 0 ? (
          <div className="mt-4 p-6 bg-gray-100 rounded-lg w-full max-w-lg shadow-md relative z-50">
            <h2 className="text-lg font-bold text-center">Top Colleges & Institutions for {selectedCourse}</h2>
            <div className="grid grid-cols-1 gap-4 mt-4">
              {institutions.map((institution, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-lg font-semibold">{institution.name}</h3>
                  <a href={institution.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm underline mt-2 inline-block">
                    Learn More
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center mt-4">No colleges found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WorldMap;
