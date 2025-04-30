"use client";
import HorizontalScroll from "./components/HorizontalScroll";
import AnimatedText from "./components/AnimatedText";

export default function Home() {
  return (
    <>
      {/* // Componente HorizontalScroll que maneja la lógica del scroll horizontal */}
      <div className="grid place-items-center !h-screen w-full">
        <AnimatedText
          text="Horizontal Scroll Demo"
          className="text-3xl md:text-6xl text-white uppercase tracking-wider text-center"
        />
      </div>
      <HorizontalScroll direction="left">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`w-screen transition-all h-screen flex items-center justify-center snap-start overflow-hidden p-5 md:p-20`}
          >
            <div className="text-white text-5xl font-bold border-2 rounded-2xl border-cyan-500 w-full h-full grid place-items-center">
              <AnimatedText
                text={`Sección ${index + 1}`}
                className="text-3xl md:text-6xl"
              />
            </div>
          </div>
        ))}
      </HorizontalScroll>
      <HorizontalScroll direction="right">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`w-screen transition-all h-screen flex items-center justify-center snap-start overflow-hidden p-5 md:p-20`}
          >
            <div className="text-white text-5xl font-bold border-2 rounded-2xl border-red-500 w-full h-full grid place-items-center">
              <AnimatedText
                text={`Sección ${index + 1}`}
                className="text-3xl md:text-6xl"
              />
            </div>
          </div>
        ))}
      </HorizontalScroll>
      <div className="grid place-items-center !h-screen w-full">
        <AnimatedText
          text="Horizontal Scroll Demo"
          className="text-3xl md:text-6xl text-white uppercase tracking-wider text-center"
        />
      </div>
    </>
  );
}
