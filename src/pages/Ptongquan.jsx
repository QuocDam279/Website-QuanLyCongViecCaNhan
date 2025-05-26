import React from 'react'
import Menutrai from '../components/Menutrai'
import Tongquan from '../components/Tongquan'

const Ptongquan = () => {
  return (
    <div className='flex flex-col-2'>
        <div className='w-[20%]'>
            <Menutrai />
        </div>
        <div className='w-[79.5%]'>
            <Tongquan />
        </div>

    </div>
  )
}

export default Ptongquan