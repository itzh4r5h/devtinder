import { motion } from "motion/react";
import { LAYERS } from "./constants";
import { Piece } from "./Piece";
import useParallax from "./useParallax";
import { LayerContent } from "./LayerContent";

export const Layer = ({ variant,breakPoints }) => {
  const layer = LAYERS[variant];

  const { x, y } = useParallax(0.5, true);

  const {sm} = breakPoints

  return (
    <motion.div
      style={{ x, y }}
      className="absolute left-1/2 top-1/2 h-[60%] w-[60%] min-h-100 min-w-100 -translate-x-1/2 -translate-y-1/2"
    >
      <LayerContent breakPoints={breakPoints}>
        {layer.circle && (
          <motion.div
            initial={{
              width: 0,
              height: 0,
              opacity: 0,
            }}
            animate={{
              width: sm?600:320,
              height: sm?600:320,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [1, 0.06, 0.25, 1],
            }}
            className="absolute h-80 w-80 sm:h-150 sm:w-150 rounded-full bg-[rgba(54,24,79,.3)] shadow-[inset_5px_20px_40px_rgba(54,24,79,.25),inset_5px_0_5px_rgba(50,36,62,.3),inset_5px_5px_20px_rgba(50,36,62,.25),2px_2px_5px_rgba(255,255,255,.2)]"
          />
        )}

        {layer.pieces.map((piece) => {
          return <Piece key={piece.delay} piece={piece} breakPoints={breakPoints} />;
        })}
      </LayerContent>
    </motion.div>
  );
};
