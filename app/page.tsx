"use client";

import dynamic from "next/dynamic";
// importação dinâmica do componente Scene para evitar problemas de SSR com three.js
const Scene = dynamic(() => import("./components/Scene"), {
  ssr: false,
  loading: () => <div>Carregando...</div>,
});

export default function Page() {
  return <Scene />;
}