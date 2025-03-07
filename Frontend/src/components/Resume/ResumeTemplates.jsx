import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Core styles
import 'swiper/css/navigation'; // For navigation buttons
import 'swiper/css/pagination'; // For pagination dots
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access Redux store
import useGetAllResumeTemplates from '@/hooks/useGetAllResumeTemplates';
import { setresumetemplateId } from '@/redux/templateSlice';
import { useNavigate } from 'react-router-dom';

const ResumeTemplates = () => {
  // Fetch resume templates data from Redux store using the selector
  const { resumeTemplates } = useSelector((store) => store.templates);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use the custom hook to load all resume templates (though it's not actively used here)
  useGetAllResumeTemplates();
  const handleStartWithTemplate = (templateId) => {
     dispatch(setresumetemplateId(templateId));
      navigate(`/user/createResume`);
    };

  return (
    <div className="px-5 py-10 bg-gradient-to-b from-gray-100 to-blue-50 relative">
      <h2 className="text-center text-3xl font-bold mt-2">Choose Your Template</h2>
      <div className="relative max-w-7xl mx-auto mt-5">
        {/* Custom Navigation Buttons */}
        <div className="custom-prev absolute -left-12 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-700 z-20">
          &lt;
        </div>
        <div className="custom-next absolute -right-12 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-700 z-20">
          &gt;
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="p-4"
        >
          {/* Render templates from Redux store */}
          {resumeTemplates.map((template) => (
            <SwiperSlide key={template.id} className="flex justify-center">
              {/* Transparent Card */}
              <div className="w-[320px] h-[480px] bg-white/30 shadow-lg rounded-lg relative flex items-center justify-center">
                {/* Image with Gaps */}
                <img
                  src={template.image} // Template image from Redux store
                  alt={template.title} // Template title from Redux store
                  className="w-[280px] h-[400px] object-cover rounded-md"
                />
                {/* Hover Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-gray-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-gray-400" onClick={() => handleStartWithTemplate(template._id)}>
                    Start With This Template
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ResumeTemplates;
