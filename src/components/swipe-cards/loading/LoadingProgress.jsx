

export const LoadingProgress = ({loaderRefs}) =>{
  return (
     <div
      ref={(el) => {
        loaderRefs.current.progress.container = el;
      }}
      className="
        mt-5
        flex
        w-full
        max-w-sm
        items-center
        gap-1
      "
    >
      {/* Track */}
      <div
        ref={(el) => {
        loaderRefs.current.progress.track = el;
      }}
        className="
          relative
          h-1
          flex-1
          overflow-hidden
          rounded-full
          bg-muted
        "
      >
        {/* Fill */}
        <div
          ref={(el) => {
        loaderRefs.current.progress.fill = el;
      }}
          className="
            absolute
            inset-y-0
            left-0
            w-0
            rounded-full
            button-bg
            will-change-[width]
          "
        />
      </div>

      {/* Percentage */}
      <span
        ref={(el) => {
        loaderRefs.current.progress.percentage = el;
      }}
        className="
          min-w-12
          text-right
          text-md
          font-medium
          tabular-nums
          text-foreground
          select-none
        "
      >
        0%
      </span>
    </div>
  )
}
