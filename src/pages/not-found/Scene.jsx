import React from "react";
import { Circle } from "./Circle";
import { Layer } from "./Layer";
import { ErrorCode } from "./ErrorCode";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ErrorText } from "./ErrorText";

export const Scene = () => {
    const sm = useMediaQuery("(min-width:640px)")

    const breakPoints = {sm}

  return (
    <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2">
      <Circle breakPoints={breakPoints}/>
      <Layer breakPoints={breakPoints} variant="one" />
      <Layer breakPoints={breakPoints} variant="two" />
      <Layer breakPoints={breakPoints} variant="three" />
      <ErrorCode breakPoints={breakPoints} />
      <ErrorText/>
    </div>
  );
};
