"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registramos el plugin ScrollTrigger de GSAP
// Este plugin es esencial para crear animaciones basadas en scroll
gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  children: React.ReactNode;
  direction?: "left" | "right";
}

export default function HorizontalScroll({
  children,
  direction = "left",
}: HorizontalScrollProps) {
  // Refs para acceder a los elementos del DOM
  const containerRef = useRef<HTMLDivElement>(null); // Contenedor principal que se mantiene fijo
  const contentRef = useRef<HTMLDivElement>(null); // Contenedor del contenido que se moverá horizontalmente

  useEffect(() => {
    // Verificamos que los refs estén disponibles
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    // CÁLCULO DEL ANCHO TOTAL
    // ----------------------
    // Necesitamos calcular el ancho total de todas las secciones
    // para saber cuánto espacio ocupará todo el contenido horizontal
    const sections = content.children;
    let totalWidth = 0;
    Array.from(sections).forEach((section) => {
      totalWidth += section.clientWidth;
    });

    // CONFIGURACIÓN DEL CONTENEDOR
    // ---------------------------
    // Establecemos el ancho del contenedor de contenido
    // Esto es crucial para que el scroll horizontal funcione correctamente
    // ya que necesitamos que el contenedor sea más ancho que la ventana
    content.style.width = `${totalWidth}px`;

    // Posicionamos inicialmente el contenido según la dirección
    if (direction === "right") {
      content.style.transform = `translateX(${-(
        totalWidth - window.innerWidth
      )}px)`;
    }

    // CONFIGURACIÓN DE GSAP
    // --------------------
    // gsap.to() crea una animación que va desde el estado actual
    // hasta los valores especificados
    gsap.to(content, {
      // PROPIEDADES DE ANIMACIÓN
      // ----------------------
      // x: Movimiento horizontal
      // El valor negativo es porque queremos mover el contenido hacia la izquierda
      // window.innerWidth es el ancho de la ventana
      // La fórmula totalWidth - window.innerWidth nos da la distancia total a mover
      x: () => (direction === "left" ? -(totalWidth - window.innerWidth) : 0),

      // ease: Tipo de interpolación de la animación
      // 'none' significa movimiento lineal, sin aceleración ni desaceleración
      ease: "none",

      // CONFIGURACIÓN DE SCROLLTRIGGER
      // ----------------------------
      scrollTrigger: {
        // trigger: El elemento que activará la animación
        // En este caso, el contenedor principal
        trigger: container,

        // start: Cuándo comienza la animación
        // 'top top' significa cuando el borde superior del trigger
        // toca el borde superior de la ventana
        start: "top top",

        // end: Cuándo termina la animación
        // `+=${totalWidth - window.innerWidth}` significa que la animación
        // terminará cuando hayamos scrolleado la distancia total menos el ancho de la ventana
        end: () => `+=${totalWidth - window.innerWidth}`,

        // pin: Fija el contenedor mientras se hace scroll
        // Esto evita que el contenido se mueva verticalmente
        pin: true,

        // scrub: Controla cómo la animación sigue al scroll
        // 1 = movimiento suave que sigue el scroll
        // Valores más altos = más retraso en el seguimiento
        // Valores más bajos = seguimiento más inmediato
        scrub: 1,

        // invalidateOnRefresh: Recalcula los valores cuando la ventana cambia de tamaño
        // Esto es importante para mantener la animación funcionando correctamente
        // después de redimensionar la ventana
        invalidateOnRefresh: true,

        // anticipatePin: Anticipa el pin para evitar saltos
        // Esto hace que la transición entre secciones sea más suave
        anticipatePin: 1,
      },
    });

    // LIMPIEZA
    // -------
    // Es importante limpiar los ScrollTriggers cuando el componente se desmonta
    // para evitar memory leaks y comportamientos inesperados
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [direction]);

  return (
    // Contenedor principal con overflow hidden para evitar scroll horizontal nativo
    <div
      ref={containerRef}
      className="w-screen h-screen overflow-hidden bg-transparent"
    >
      {/* Contenedor del contenido que se moverá horizontalmente */}
      <div
        ref={contentRef}
        className={`flex h-full [&>*]:flex-shrink-0 ${
          direction === "right" ? "flex-row-reverse" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
