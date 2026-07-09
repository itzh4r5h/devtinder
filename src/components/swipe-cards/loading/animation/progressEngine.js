import gsap from "gsap";

export const createProgressEngine = (loaderRefs) => {

  const update = (value) => {

    const { progress } = loaderRefs.current;

    gsap.to(progress.fill, {
      width: `${value}%`,
      duration: 0.3,
      ease: "power1.out",
      overwrite: true,
    });

    gsap.to(progress.percentage, {
      innerText: `${value}%`,
      duration: 0.3,
      snap: {
        innerText: 1,
      },
      ease: "none",
      overwrite: true,
    });
  };

  return {
    update
  };
};