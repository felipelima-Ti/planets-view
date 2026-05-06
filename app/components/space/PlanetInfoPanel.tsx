"use client";

import {
  X,
  Globe2,
  Ruler,
  Sun as SunIcon,
  Clock,
  CalendarDays,
  Moon as MoonIcon,
  Thermometer,
  ArrowDownToDot,
} from "lucide-react";

import type { PlanetData } from "../../data/planets";
import "./style.css";
type Props = {
  planet: PlanetData;
  onClose: () => void;
};

const Row = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="title">
  <div className="icon">
    <Icon className="w-3 h-3 text-black bg-black mt-0.5" />
    </div>
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
          <div className="text-[9px] uppercase tracking-widest text-white/60">
            {planet.type}
          </div>

          <h2
            className="text-sm font-bold"
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

        <div className="space-y-1 ml-20">
          <Row icon={Ruler} label="Diâmetro" value={planet.diameter} />
          <Row icon={SunIcon} label="Distância" value={planet.distance} />
          <Row icon={Clock} label="Dia" value={planet.day} />
          <Row icon={CalendarDays} label="Ano" value={planet.year} />
          <Row icon={MoonIcon} label="Luas" value={planet.moons} />
          <Row icon={Thermometer} label="Temp." value={planet.temperature} />
          <Row icon={ArrowDownToDot} label="Grav." value={planet.gravity} />
          <Row icon={Globe2} label="Tipo" value={planet.type} />
        </div>
      </div>
    </div>
  );
};