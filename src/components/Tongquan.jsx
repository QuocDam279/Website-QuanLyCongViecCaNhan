import React from 'react';
import Lich from './Lich';
import CountUp from 'react-countup';

const Tongquan = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Phần thống kê trên */}
      <div className="p-4">
        <div className="text-xl ml-2 mt-2 font-bold text-blue-700">
          TỔNG QUAN
        </div>
        <hr className="border-t-2 border-gray-300/30 my-4 mx-4" />

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 items-center">
          {/* Card 1 */}
          <nav className="w-36 sm:w-44 h-18 bg-red-600/80 flex justify-center items-center rounded-xl shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex flex-col items-center">
              <p className="text-sm sm:text-base text-white">Loại công việc</p>
              <p className="text-xl sm:text-2xl font-bold text-white">
                <CountUp end={4} duration={3} />
              </p>
            </div>
          </nav>

          {/* Card 2 */}
          <nav className="w-36 sm:w-44 h-18 bg-blue-600/80 flex justify-center items-center rounded-xl shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex flex-col items-center">
              <p className="text-sm sm:text-base text-white">Số lượng công việc</p>
              <p className="text-xl sm:text-2xl font-bold text-white">
                <CountUp end={10} duration={3} />
              </p>
            </div>
          </nav>

          {/* Card 3 */}
          <nav className="w-32 h-16 bg-red-800/80 flex justify-center items-center rounded-xl shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex flex-col items-center">
              <p className="text-xs sm:text-sm text-white">Chưa thực hiện</p>
              <p className="text-lg sm:text-xl font-bold text-white">
                <CountUp end={4} duration={3} />
              </p>
            </div>
          </nav>

          {/* Card 4 */}
          <nav className="w-32 h-16 bg-yellow-600/80 flex justify-center items-center rounded-xl shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex flex-col items-center">
              <p className="text-xs sm:text-sm text-white">Đang thực hiện</p>
              <p className="text-lg sm:text-xl font-bold text-white">
                <CountUp end={4} duration={3} />
              </p>
            </div>
          </nav>

          {/* Card 5 */}
          <nav className="w-32 h-16 bg-green-600/80 flex justify-center items-center rounded-xl shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex flex-col items-center">
              <p className="text-xs sm:text-sm text-white">Đã hoàn thành</p>
              <p className="text-lg sm:text-xl font-bold text-white">
                <CountUp end={2} duration={3} />
              </p>
            </div>
          </nav>
        </div>
      </div>

      {/* Phần Lịch - tự chiếm phần còn lại */}
      <div className="flex-1 overflow-auto">
        <Lich />
      </div>
    </div>
  );
};

export default Tongquan;
