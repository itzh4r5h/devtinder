import gsap from "gsap";

export const createProgressEngine = (loaderRefs) => {
  let current = 0;

  const update = (value) => {
    current = value;

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