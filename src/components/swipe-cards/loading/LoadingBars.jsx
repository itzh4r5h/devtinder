import { BAR_COUNT,BAR_HEIGHTS } from './animation/constants'

export const LoadingBars = ({loaderRefs})=> {
  return (
    <div className="flex items-end justify-center gap-3">
      {Array.from({ length: BAR_COUNT }).map((_, index) => (
        <div
          key={index}
          ref={(el)=>{
            loaderRefs.current.bars[index] = el
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
}
