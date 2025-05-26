import React from 'react'
import Lich from './Lich'

const Tongquan = () => {
  return (
    <div className='w-100%]' >
        <div className='text-[20px] ml-2 mt-2 h-[25px] font-bold  text-blue-700'>
            TỔNG QUAN
        </div>
        <hr className="border-t-2 border-gray-300/30 my-4 ml-4 mr-4" />
        <div className='flex space-x-50 justify-center'>
            <nav className='w-[200px] h-[80px] bg-red-600/80 flex justify-center items-center rounded-[15px] shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer'>
                <div className='flex flex-col items-center'>
                    <p className='text-[18px] text-white'>Loại công việc</p>
                    <p className='text-[28px] font-bold text-white'>4</p>
                </div>
            </nav>

            <nav className='w-[200px] h-[80px] bg-blue-600/80 flex justify-center items-center rounded-[15px] shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer'>
                <div className='flex flex-col items-center'>
                    <p className='text-[18px] text-white'>Số lượng công việc</p>
                    <p className='text-[28px] font-bold text-white'>10</p>
                </div>
            </nav>
        </div>
        <div className='mt-10'>
            <Lich />
        </div>

    </div>
  )
}

export default Tongquan