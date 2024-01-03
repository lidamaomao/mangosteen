import { Link, useLocation, useOutlet } from "react-router-dom";
import { useTransition, animated } from "@react-spring/web";
import { ReactNode, useRef } from "react";
import logo from "../assets/images/logo.svg";

const pageMap: Record<string, string> = {
  "/welcome/1": "/welcome/2",
  "/welcome/2": "/welcome/3",
  "/welcome/3": "/welcome/4",
  "/welcome/4": "/welcome/xxxx",
};

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

  return (
    <>
      <header>
        <img src={logo} alt="mangosteen logo" />
        <h1>山竹记账</h1>
      </header>
      <main>
        {transitions((style, pathname) => {
          return (
            <animated.div key={pathname} style={style}>
              {map.current[pathname]}
            </animated.div>
          );
        })}
      </main>
      <footer>
        <Link to={pageMap[location.pathname]}>下一页</Link>
        <Link to="/welcome/xxx">跳过</Link>
      </footer>
    </>
  );
};

export default WelcomeLayout;
