'use client';
import { useEffect, useRef, useState } from 'react';
import 'animate.css'; // Import Animate.css

const AnimateCard = ({ children, animationClass = 'animate__fadeInUp', threshold = 0.3, className = '' }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${visible ? `animate__animated ${animationClass}` : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimateCard;
