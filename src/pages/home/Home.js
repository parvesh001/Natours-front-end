import { useState } from "react";
import Hero from "../../components/hero/Hero";
import Transition from "react-transition-group/Transition";
import Tours from "../../components/tour/tours/Tours";

export default function Home() {
  const [swipped, setSwipped] = useState(false);
  const swipUpHandler = () => {
    setSwipped(true);
  };
  const transitionStyles = {
    exiting: { opacity: 0, transform: "translateY(-100%)" },
  };

  return (
    <>
      <Transition
        in={swipped === false}
        mountOnEnter
        unmountOnExit
        timeout={2000}
      >
        {(state) => (
          <Hero
            onSwipeUp={swipUpHandler}
            style={{
              ...transitionStyles[state],
            }}
          />
        )}
      </Transition>
      {swipped && <Tours managing="false" className="home-tours" />}
    </>
  );
}
