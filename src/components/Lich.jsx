import React, { useState } from 'react'

const Lich = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

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

  const months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  return (
    <div className="p-4 rounded border">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="px-2 py-1 bg-gray-200 rounded cursor-pointer">←</button>
        <div className="text-xl font-bold">{months[currentMonth]} / {currentYear}</div>
        <button onClick={handleNextMonth} className="px-2 py-1 bg-gray-200 rounded cursor-pointer">→</button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
          <div key={day} className="font-semibold text-gray-600">{day}</div>
        ))}

        {/* Ô trống đầu tháng */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={'empty-' + i}></div>
        ))}

        {/* Các ngày */}
        {days.map((day) => (
          <div
            key={day}
            className="border rounded h-[50px] flex items-center justify-center hover:bg-blue-100 cursor-pointer"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Lich