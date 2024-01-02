import { useLocation, useOutlet } from "react-router-dom";
import { useTransition, animated } from "@react-spring/web";
import { ReactNode } from "react";

const map: Record<string, ReactNode> = {};

const WelcomeLayout = () => {
  const location = useLocation();
  const outlet = useOutlet();
  map[location.pathname] = outlet;
  const transitions = useTransition(location.pathname, {
    from: { transform: "translateX(100%)" },
    enter: { transform: "translateX(0%)" },
    leave: { transform: "translateX(-100%)" },
    config: { duration: 1000 },
  });

  return transitions((style, pathname) => {
    return (
      <animated.div key={pathname} style={style}>
        <div style={{ textAlign: "center" }}>{map[pathname]}</div>
      </animated.div>
    );
  });
};

export default WelcomeLayout;
