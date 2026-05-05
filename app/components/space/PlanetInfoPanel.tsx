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
  <div className="af">
  <div className="ad">
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
    <div className="fixed top-4 right-4 w-[200px] h-[200px] bg-black/80 backdrop-blur-md border border-white/10 rounded-lg shadow-xl text-white overflow-hidden z-50">
      
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

        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/10 transition"
        >
          <X className="w-3 h-3 text-white" />
        </button>
      </div>

      {/* BODY */}
      <div className="px-3 py-2 h-[150px] overflow-y-auto">
        <p className="text-[10px] text-white/70 mb-2 leading-relaxed">
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