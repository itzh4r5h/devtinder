import { Scene } from "./Scene";

export const NotFound = () => {
  return (
    <section className="touch-none fixed main-bg top-0 right-0 left-0 bottom-0 z-1000 grid h-full items-center justify-center overflow-hidden select-none">
      <div className="relative flex items-center justify-center">
        <Scene />
      </div>
    </section>
  );
};
