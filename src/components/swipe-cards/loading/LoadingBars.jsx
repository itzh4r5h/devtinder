import { forwardRef } from 'react'
import { BAR_COUNT,BAR_HEIGHTS } from './constants'

export const LoadingBars = forwardRef((_, barsRef)=> {
  return (
    <div className="flex items-end justify-center gap-3">
      {Array.from({ length: BAR_COUNT }).map((_, index) => (
        <div
          key={index}
          ref={(el)=>{
            barsRef.current[index] = el
          }}
           style={{
            height: `${BAR_HEIGHTS[index]}px`,
          }}
          className="
            w-3
            rounded-full
            button-bg
            origin-bottom
          "
        />
      ))}
    </div>
  )
})
