import { useState } from 'react'

function Config() {
  const [toggleSwitch, setToggleSwitch] = useState<boolean>(true)

  const handleClick = () => {
    setToggleSwitch(!toggleSwitch)
  }

  return (
    <div className='block h-screen text-white p-4 bg-[#14213d]'>
      <p className='text-[18px]'>
        Config
      </p>
      <div className='flex items-center gap-4'>
        <p>Enable resize</p>
        <button onClick={handleClick} className='p-0.5 bg-black rounded-md h-fit' style={{backgroundColor: `${toggleSwitch ? 'green' : 'red'}`}}>
          {toggleSwitch ? 'On' : 'Off'}
        </button>
      </div>
    </div>
  )
}

export default Config