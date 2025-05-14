'use client'
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Counter = ({ end, suffix = "", decimals = 0 }) => {
  const [hasViewed, setHasViewed] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      setHasViewed(true);
    }
  }, [inView]);

  return (
    <div ref={ref}>
      {hasViewed && (
        <CountUp end={end} duration={3} decimals={decimals} suffix={suffix} />
      )}
    </div>
  );
};

export default Counter;
