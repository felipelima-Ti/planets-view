"use client";

import {
  X,
} from "lucide-react";

import type { PlanetData } from "../../data/planets";
import "./style.css";
type Props = {
  planet: PlanetData;
  onClose: () => void;
};

const Row = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="title">
    <div className="flex-1">
      <div className="text-[9px] text-white/50 uppercase">{label}</div>
      <div className="text-[10px] text-white font-medium leading-tight">
        {value}
      </div>
    </div>
  </div>
);

export const PlanetInfoPanel = ({ planet, onClose }: Props) => {
  return (
    <div className="mdiv">
        <button
          onClick={onClose}
          className="exit"
        >
          <X className="w-3 h-3 text-white" />Sair
        </button>
      {/* HEADER */}
      <div
        className="px-3 py-2 flex items-center justify-between border-b border-white/10"
        style={{
          background: `linear-gradient(135deg, hsl(${planet.color} / 0.25), transparent)`,
        }}
      >
        <div>
          <div className="name">
            {planet.type}
          </div>

          <h2
            className="name"
            style={{ color: `hsl(${planet.color})` }}
          >
            {planet.name}
          </h2>
        </div>
      </div>

      {/* BODY */}
      <div className="">
        <p className="description">
          {planet.description}
        </p>

        <div className="icon">
          <Row  label="Diâmetro" value={planet.diameter} />
          <Row  label="Distância" value={planet.distance} />
          <Row  label="Dia" value={planet.day} />
          <Row  label="Ano" value={planet.year} />
          <Row  label="Luas" value={planet.moons} />
          <Row  label="Temp." value={planet.temperature} />
          <Row  label="Grav." value={planet.gravity} />
          <Row  label="Tipo" value={planet.type} />
        </div>
      </div>
    </div>
  );
};