import React, { useEffect, useState } from 'react';
import arrowRight from './arrow-right.png'
import correct from './correct.png'

function Select({ options, startValue, onChange } : { options: string[], startValue: string, onChange: (value : string) => void }) {
  let [value, setValue] = useState(startValue)
  let [isExpanded, setIsExpanded] = useState(false)
  let [id, setId] = useState('')

  function selectValue(val : string) {
    setValue(val)
    onChange(val)
    setIsExpanded(false)
  }

  useEffect(() => {
    let tempId = (Math.random() * 1000000 + 100000).toString().substring(0, 6)
    setId(tempId)

    function handleDocumentClick(event: MouseEvent) {
      const target = event.target as Element;
      // Make sure the click event was outside the dropdown
      if (target && !target.closest(".dropdown-" + tempId)) {
        setIsExpanded(false);
      }
    }

    function handleDocumentKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }

      const target = event.target as Element;

      if (event.key === "Enter" && target && !target.closest(".dropdown-" + tempId)) {
        setIsExpanded(false);
      }
    }
  
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeydown);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleDocumentKeydown);
    };
  }, []);  

    

  return (
    <div className={'w-full h-full relative dropdown-' + id}>
      <div className={"w-full px-4 py-2 md:py-4 bg-gray-100 text-black items-center flex flex-row justify-between rounded-lg font-semibold cursor-pointer hover:bg-gray-300 duration-200"
       + (value === startValue ? '' : ' bg-gray-200')} 
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setIsExpanded(!isExpanded)
          }
        }}
        tabIndex={120}
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
        {options.map((option, i, arr) => (
          <div className='w-full m-1'>
            <div key={i} className="w-full px-3 py-3 items-center flex flex-row justify-between rounded-lg cursor-pointer hover:bg-gray-300 duration-200 font-semibold" 
              onClick={() => selectValue(option)} 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  selectValue(option)
                }
              }}
              tabIndex={120}
            >
              <p>{option}</p>
              {option === value && 
                <img src={correct} alt='correct' className='w-4 h-4' />
              }
            </div>
            {i !== arr.length - 1 && 
                <hr className='mx-3 mt-1' />
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default Select;