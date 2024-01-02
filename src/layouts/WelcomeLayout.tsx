import { useLocation, useOutlet } from "react-router-dom";
import { useTransition, animated } from "@react-spring/web";
import { ReactNode, useRef } from "react";

const WelcomeLayout = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const map = useRef<Record<string, ReactNode>>({});
  map.current[location.pathname] = outlet;
  const transitions = useTransition(location.pathname, {
    from: {
      transform:
        location.pathname === "/welcome/1"
          ? "translateX(0%)"
          : "translateX(100%)",
    },
    enter: { transform: "translateX(0%)" },
    leave: { transform: "translateX(-100%)" },
    config: { duration: 300 },
  });

  return transitions((style, pathname) => {
    return (
      <animated.div key={pathname} style={style}>
        <div style={{ textAlign: "center" }}>{map.current[pathname]}</div>
      </animated.div>
    );
  });
};

export default WelcomeLayout;
