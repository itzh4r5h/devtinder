import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { createAnimationEngine } from "./animationEngine";
import { createEqualizerEngine } from "./equalizerEngine";
import { createProgressEngine } from "./progressEngine";

gsap.registerPlugin(useGSAP);

export const useLoadingAnimation = (loaderRefs,{preloader,loadingFinish}) => {
  const progress = useRef(null)
  const equalizer = useRef(null)
  const animation = useRef(null)



  /**
   * Called when loading reaches 100%
   */
  const finish = () => {
    //todo here instead of stop i have to use exit
    equalizer.current?.stop();
    animation.current?.stop();
    loadingFinish()
  };


  useGSAP(
    () => {
      
      progress.current = createProgressEngine(loaderRefs);
      equalizer.current = createEqualizerEngine(loaderRefs);
      animation.current = createAnimationEngine(loaderRefs);
      preloader.setProgressEngine(progress.current)
      preloader.getLoader(finish);

      animation.current.setInitialState();
   
      animation.current.buildEntrance();
    
      animation.current.playEntrance();


      animation.current.onEntranceComplete(equalizer.current.start,preloader?.start)


      return () => {
        equalizer.current.stop();
        animation.current.stop();
      };
    },
    {
      scope: loaderRefs.current.overlay,
    },
  );
};
