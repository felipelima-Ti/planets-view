"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./components/Scene"), {
  ssr: false,
  loading: () => <div>Carregando...</div>,
});

export default function Page() {
  return <Scene />;
}