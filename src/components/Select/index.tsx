import React, { useEffect, useState } from 'react';
import arrowRight from './arrow-right.png'
import correct from './correct.png'

function Select({ options, startValue, onChange } : { options: string[], startValue: string, onChange: (value : string) => void }) {
  let [value, setValue] = useState(startValue)
  let [isExpanded, setIsExpanded] = useState(false)

  function selectValue(val : string) {
    setValue(val)
    onChange(val)
    setIsExpanded(false)
  }

  useEffect(() => {
    function handleDocumentClick() {
      setIsExpanded(false)
    }

    document.addEventListener('click', handleDocumentClick, true)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

    

  return (
    <div className="w-full h-full relative">
      <div className={"w-full px-4 py-2 md:py-4 bg-gray-100 text-black focus:outline focus:outline-0 items-center flex flex-row justify-between rounded-lg font-semibold"
       + (value === startValue ? '' : ' bg-gray-200')} 
        onClick={() => setIsExpanded(true)} 
      >
        <p>{value}</p>
        <img src={arrowRight} alt={isExpanded ? 'expanded' : 'collapsed'} className='w-4 h-4' style={{
          transform: isExpanded ? 'rotate(90deg)' : 'rotate(-90deg)',
        }} />
      </div>
      <div className="absolute p-1 w-full bg-gray-100 text-black items-center flex flex-col justify-between rounded-lg" style={{
        top: '120%',
        left: 0,
        zIndex: 20,
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        display: isExpanded ? 'flex' : 'none',
      }}>
        {options.map((option, i) => (
          <div key={i} className="w-full m-1 px-3 py-3 items-center flex flex-row justify-between rounded-lg hover:bg-gray-300 font-semibold" 
            onClick={() => selectValue(option)} 
          >
            <p>{option}</p>
            {option === value && 
              <img src={correct} alt='correct' className='w-4 h-4' />
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default Select;