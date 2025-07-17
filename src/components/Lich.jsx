import React, { useState, useEffect } from 'react';

const Lich = () => {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const COLORS = {
    'Chưa thực hiện': '#FF9800',
    'Đang thực hiện': '#2196F3',
    'Hoàn thành': '#E91E63'
  };

  const months = [
    'Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6',
    'Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'
  ];
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const days = [];

  let week = [];
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) week.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    week.push(i);
    if (week.length === 7) {
      days.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    days.push(week);
  }

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Thiết kế Dashboard',
      startDate: '2025-07-30',
      endDate: '2025-08-05',
      description: 'Thiết kế giao diện trang tổng quan',
      status: 'Chưa thực hiện',
      category: 'Thiết kế',
      file: null
    },
    {
      id: 2,
      name: 'API Backend',
      startDate: '2025-07-10',
      endDate: '2025-07-12',
      description: 'Xây dựng API cho Dashboard',
      status: 'Đang thực hiện',
      category: 'Lập trình',
      file: null
    },
    {
      id: 3,
      name: 'Viết tài liệu',
      startDate: '2025-07-10',
      endDate: '2025-07-10',
      description: 'Hoàn thiện tài liệu kỹ thuật',
      status: 'Hoàn thành',
      category: 'Tài liệu',
      file: null
    },
  ]);

  // Lọc task theo ngày
  const getTasksForDay = (day) => {
    if (!day) return [];
    const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(task =>
      new Date(task.startDate) <= new Date(dayStr) && new Date(task.endDate) >= new Date(dayStr)
    );
  };
 
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="px-2 py-1 bg-gray-200 rounded">←</button>
        <div className="text-xl font-bold">{months[currentMonth]} - {currentYear}</div>
        <button onClick={handleNextMonth} className="px-2 py-1 bg-gray-200 rounded">→</button>
      </div>

      <div className="grid grid-cols-7 border border-gray-400">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-2 text-center font-semibold bg-gray-200">{day}</div>
        ))}

        {days.map((week, wi) => (
          <React.Fragment key={wi}>
            {week.map((day, di) => (
              <div key={di} className="border border-gray-400 h-[80px] p-1 relative text-sm flex flex-col gap-0.5">
                {day && <div className="text-center text-xs font-medium">{day}</div>}

                {/* Hiện task trong từng ô */}
                <div className="flex flex-col gap-0.5 mt-1 overflow-hidden">
                  {getTasksForDay(day).map((task) => (
                    <div
                      key={task.id}
                      className="text-[10px] text-white px-1 rounded truncate"
                      style={{ backgroundColor: COLORS[task.status] }}
                    >
                      {task.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Lich;
