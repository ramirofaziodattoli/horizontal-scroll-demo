import HorizontalScroll from "./components/HorizontalScroll";

// Array de gradientes de color para cada sección
// Cada string representa un gradiente de Tailwind CSS
const colors = [
  "from-blue-500 to-blue-500", // Gradiente de azul a morado
  "from-blue-500 to-pink-500", // Gradiente de morado a rosa
  "from-pink-500 to-red-500", // Gradiente de rosa a rojo
  "from-red-500 to-orange-500", // Gradiente de rojo a naranja
  "from-orange-500 to-orange-500", // Gradiente de naranja a amarillo
];

export default function Home() {
  return (
    <>
      {/* // Componente HorizontalScroll que maneja la lógica del scroll horizontal */}
      <div className="grid place-items-center h-[800px] bg-gradient-to-t from-blue-500 to-white w-full">
        <h1 className="text-5xl uppercase font-normal">
          Horizontal Scroll Demo
        </h1>
      </div>
      <HorizontalScroll>
        {/* Mapeamos los colores para crear cada sección */}
        {colors.map((gradient, index) => (
          // Cada sección ocupa el ancho completo de la ventana
          <div
            key={index}
            // Clases de Tailwind:
            // w-screen: ancho completo de la ventana
            // h-screen: alto completo de la ventana
            // flex: display flex
            // items-center: centrado vertical
            // justify-center: centrado horizontal
            // bg-gradient-to-r: gradiente de izquierda a derecha
            className={`min-w-screen w-screen h-screen flex items-center justify-center bg-gradient-to-r ${gradient}`}
            // Aseguramos que cada sección tenga un ancho mínimo de 100vw
          >
            {/* Contenido de cada sección */}
            <div
              // Clases de Tailwind:
              // text-white: texto blanco
              // text-6xl: tamaño de texto grande
              // font-bold: texto en negrita
              // transform: permite transformaciones
              // transition-transform: transición suave en transformaciones
              // duration-500: duración de 500ms
              // hover:scale-110: se agranda al 110% cuando el mouse pasa por encima
              className="text-white text-6xl font-bold transform transition-transform duration-500 hover:scale-110"
            >
              Sección {index + 1}
            </div>
          </div>
        ))}
      </HorizontalScroll>
      <div className="grid place-items-center !h-[800px] bg-gradient-to-b from-orange-500 to-white w-full"></div>
    </>
  );
}
