import { Link, useLocation, useOutlet } from "react-router-dom";
import { useTransition, animated } from "@react-spring/web";
import { ReactNode, useRef } from "react";
import logo from "../assets/images/logo.svg";

const linkMap: Record<string, string> = {
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
    <div className="bg-#5f34bf h-screen flex flex-col items-stretch pb-16px">
      <header className="shrink-0 text-center pt-64px">
        <img src={logo} className="w-4rem" />
        <h1 className="text-#D4D4EE text-2rem">山竹记账</h1>
      </header>
      <main
        className="shrink-1
        grow-1
        bg-white
        m-16px
        rounded-8px
        flex
        justify-center
        items-center"
      >
        {transitions((style, pathname) => {
          return (
            <animated.div key={pathname} style={style}>
              {map.current[pathname]}
            </animated.div>
          );
        })}
      </main>
      <footer className="shrink-0 text-center text-24px text-white grid grid-cols-3 grid-rows-1">
        <Link
          style={{ gridArea: "1 / 2 / 2 / 3" }}
          to={linkMap[location.pathname]}
        >
          下一页
        </Link>
        <Link style={{ gridArea: "1 / 3 / 2 / 4" }} to="/welcome/xxx">
          跳过
        </Link>
      </footer>
    </div>
  );
};

export default WelcomeLayout;
