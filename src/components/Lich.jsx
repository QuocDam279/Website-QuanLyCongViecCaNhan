import React, { useState } from 'react';
import caycodon from '../assets/caycodon.jpg';
import gaumeo from '../assets/gaumeo.jpg';
import wd from '../assets/window.jpg';

const Lich = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const images = [caycodon, gaumeo, wd];
  const [bgIndex, setBgIndex] = useState(0);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const handleChangeBackground = () => {
    setBgIndex((prev) => (prev + 1) % images.length);
  };
  
  const months = [
    'Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6',
    'Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'
  ];

  return (
    <div
      className="h-full p-4 rounded border relative overflow-auto"
      style={{
        backgroundImage: `url(${images[bgIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handlePrevMonth}
          className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
        >
          ←
        </button>
        <div className='bg-teal-500 w-full h-[35px] items-center flex justify-center'>
          <div className="text-xl font-bold text-white">
            {months[currentMonth]} - {currentYear}
          </div>
        </div>
        <button 
          onClick={handleNextMonth}
          className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
        >
          →
        </button>
      </div>
      <div className="mb-3 flex justify-center">
        <button
          onClick={handleChangeBackground}
          className="bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700"
        >
          Đổi hình nền
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-blue-950 ">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
          <div className='bg-amber-300 h-[35px] items-center'>
              <div key={day} className="font-semibold text-blue-950 mt-1">{day}</div>
          </div>
        ))}

        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={'empty-' + i}></div>
        ))}

        {days.map((day) => (
          <div
            key={day}
            className="border rounded h-[50px] flex items-center justify-center hover:bg-blue-100 cursor-pointer"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(2px)',
            }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Lich;
