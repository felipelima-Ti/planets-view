export type PlanetData = {
  id: string;
  name: string;
  textureUrl: string;
  ringUrl?: string;
  radius: number; // visual size
  orbit: number; // distance from sun
  speed: number; // orbital angular speed
  rotationSpeed: number;
  axialTilt: number; // radians
  type: string;
  diameter: string;
  distance: string;
  day: string;
  year: string;
  moons: string;
  temperature: string;
  gravity: string;
  description: string;
  color: string; // accent for UI
};

const TEX = "https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images";


export const SUN = {
  id: "sun",
  name: "Sol",
  textureUrl: `${TEX}/sunmap.jpg`,
  radius: 7,

};

export const PLANETS: PlanetData[] = [
  {
    id: "mercury",
    name: "Mercúrio",
    textureUrl: `${TEX}/mercurymap.jpg`,
    radius: 0.55,
    orbit: 12,
    speed: 0.42,
    rotationSpeed: 0.004,
    axialTilt: 0.01,
    type: "Planeta rochoso",
    diameter: "4.879 km",
    distance: "57,9 milhões km do Sol",
    day: "58,6 dias terrestres",
    year: "88 dias terrestres",
    moons: "0",
    temperature: "-173°C a 427°C",
    gravity: "3,7 m/s²",
    color: "30 30% 70%",
    description:
      "O menor planeta do Sistema Solar e o mais próximo do Sol. Sua superfície craterada lembra a Lua e suas temperaturas oscilam de forma extrema entre dia e noite.",
  },
  {
    id: "venus",
    name: "Vênus",
    textureUrl: `${TEX}/venusmap.jpg`,
    radius: 0.95,
    orbit: 17,
    speed: 0.32,
    rotationSpeed: -0.002,
    axialTilt: 3.09,
    type: "Planeta rochoso",
    diameter: "12.104 km",
    distance: "108,2 milhões km do Sol",
    day: "243 dias terrestres",
    year: "225 dias terrestres",
    moons: "0",
    temperature: "465°C (média)",
    gravity: "8,87 m/s²",
    color: "40 80% 70%",
    description:
      "Coberto por densas nuvens de ácido sulfúrico, Vênus é o planeta mais quente do Sistema Solar devido a um efeito estufa descontrolado.",
  },
  {
    id: "earth",
    name: "Terra",
    textureUrl: `${TEX}/earthmap1k.jpg`,
    radius: 1,
    orbit: 23,
    speed: 0.25,
    rotationSpeed: 0.01,
    axialTilt: 0.41,
    type: "Planeta rochoso",
    diameter: "12.742 km",
    distance: "149,6 milhões km do Sol",
    day: "24 horas",
    year: "365,25 dias",
    moons: "1 (Lua)",
    temperature: "-88°C a 58°C",
    gravity: "9,81 m/s²",
    color: "210 80% 60%",
    description:
      "O único planeta conhecido com vida. 71% de sua superfície é coberta por água líquida, e sua atmosfera rica em oxigênio sustenta uma biosfera diversa.",
  },
  {
    id: "mars",
    name: "Marte",
    textureUrl: `${TEX}/marsmap1k.jpg`,
    radius: 0.75,
    orbit: 20,
    speed: 0.2,
    rotationSpeed: 0.009,
    axialTilt: 0.44,
    type: "Planeta rochoso",
    diameter: "6.779 km",
    distance: "227,9 milhões km do Sol",
    day: "24h 37min",
    year: "687 dias terrestres",
    moons: "2 (Fobos, Deimos)",
    temperature: "-87°C a -5°C",
    gravity: "3,71 m/s²",
    color: "10 75% 55%",
    description:
      "O Planeta Vermelho deve sua cor ao óxido de ferro. Abriga o maior vulcão do Sistema Solar (Olympus Mons) e evidências de água líquida no passado.",
  },
  {
    id: "jupiter",
    name: "Júpiter",
    textureUrl: `${TEX}/jupitermap.jpg`,
    radius: 3.2,
    orbit: 42,
    speed: 0.12,
    rotationSpeed: 0.022,
    axialTilt: 0.05,
    type: "Gigante gasoso",
    diameter: "139.820 km",
    distance: "778,5 milhões km do Sol",
    day: "9h 56min",
    year: "11,86 anos terrestres",
    moons: "95 conhecidas",
    temperature: "-145°C (topo das nuvens)",
    gravity: "24,79 m/s²",
    color: "30 60% 60%",
    description:
      "O maior planeta do Sistema Solar. Sua Grande Mancha Vermelha é uma tempestade que dura há séculos, maior que a própria Terra.",
  },
  {
    id: "saturn",
    name: "Saturno",
    textureUrl: `${TEX}/saturnmap.jpg`,
    ringUrl: `${TEX}/saturnringcolor.jpg`,
    radius: 2.7,
    orbit: 55,
    speed: 0.09,
    rotationSpeed: 0.02,
    axialTilt: 0.47,
    type: "Gigante gasoso",
    diameter: "116.460 km",
    distance: "1,43 bilhão km do Sol",
    day: "10h 42min",
    year: "29,46 anos terrestres",
    moons: "146 conhecidas",
    temperature: "-178°C",
    gravity: "10,44 m/s²",
    color: "45 70% 70%",
    description:
      "Famoso por seu deslumbrante sistema de anéis compostos por bilhões de partículas de gelo e rocha. Sua densidade é menor que a da água.",
  },
  {
    id: "uranus",
    name: "Urano",
    textureUrl: `${TEX}/uranusmap.jpg`,
    radius: 1.8,
    orbit: 65,
    speed: 0.06,
    rotationSpeed: -0.014,
    axialTilt: 1.71,
    type: "Gigante de gelo",
    diameter: "50.724 km",
    distance: "2,87 bilhões km do Sol",
    day: "17h 14min",
    year: "84 anos terrestres",
    moons: "27 conhecidas",
    temperature: "-224°C",
    gravity: "8,87 m/s²",
    color: "180 70% 70%",
    description:
      "Gira praticamente deitado sobre seu próprio eixo. Sua cor azul-esverdeada vem do metano em sua atmosfera, que absorve luz vermelha.",
  },
  {
    id: "neptune",
    name: "Netuno",
    textureUrl: `${TEX}/neptunemap.jpg`,
    radius: 1.75,
    orbit: 74,
    speed: 0.05,
    rotationSpeed: 0.015,
    axialTilt: 0.49,
    type: "Gigante de gelo",
    diameter: "49.244 km",
    distance: "4,5 bilhões km do Sol",
    day: "16h 6min",
    year: "165 anos terrestres",
    moons: "14 conhecidas",
    temperature: "-218°C",
    gravity: "11,15 m/s²",
    color: "220 85% 60%",
    description:
      "O planeta mais distante do Sol. Possui os ventos mais fortes do Sistema Solar, ultrapassando 2.000 km/h, e uma intensa cor azul.",
  },
  {
      id: "sun",
  name: "Sol",
  textureUrl: `${TEX}/sunmap.jpg`,
  radius: 6,
  orbit: 0,
  speed: 0.05,
  rotationSpeed: 0.0015,
   axialTilt: 0.49,
  type: "Estrela Sol",
  diameter: "1.392.700 km",
  distance: "Centro do sistema",
  day: "25–35 dias",
  year: "4,6 bilhões de anos terrestres",
  moons: "0",
  temperature: "5.500°C",
  gravity: "274 m/s²",
  color: "0 0% 0%",
  description: "A estrela central do Sistema Solar.",
  },
   {
  id: "moon",
  name: "Lua",
  textureUrl: `${TEX}/moonmap1k.jpg`,
  radius: 0.50,
  orbit: 15.2,
  speed: 0,
  rotationSpeed: 0.004,
  axialTilt: 0.01,
  type: "Satélite natural da Terra",
  diameter: "3.474 km",
  distance: "384.400 km da Terra",
  day: "27,3 dias terrestres",
  year: "27,3 dias (em torno da Terra)",
  moons: "1",
  temperature: "-173°C a 127°C",
  gravity: "1,62 m/s²",
  color: "0 0% 80%",
  description:
    "A Lua é o único satélite natural da Terra e o quinto maior do Sistema Solar. Influencia as marés e estabiliza o eixo de rotação do nosso planeta.",
}
  
];

export const BLACK_HOLE: PlanetData = {
  id: "blackhole",
  name: "Buraco Negro Sagittarius A*",
  textureUrl: "",
  radius: 2,
  orbit: 205,
  speed: 0.02,
  rotationSpeed: 0.001,
  axialTilt: 30,
  type: "Buraco negro supermassivo",
  diameter: "~24 milhões km (horizonte de eventos)",
  distance: "~26.000 anos-luz da Terra",
  day: "Rotação extrema próxima à velocidade da luz",
  year: "Orbita o centro galáctico",
  moons: "0",
  temperature: "Disco de acreção: milhões de °C",
  gravity: "Escape > velocidade da luz",
  color: "20 90% 55%",
  description:
    "Um buraco negro é uma região do espaço-tempo onde a gravidade é tão intensa que nada — nem mesmo a luz — consegue escapar. Sagittarius A* é o buraco negro supermassivo no centro da Via Láctea, com massa equivalente a cerca de 4 milhões de sóis. Em torno do horizonte de eventos forma-se um disco de acreção brilhante de gás superaquecido e um anel de fótons curvado pela gravidade.",
};

export const MOON = {
  id: "moon",
  name: "Lua",
  textureUrl: `${TEX}/moonmap1k.jpg`,
  radius: 0.27,
  orbit: 2.2,
  speed: 1.2,
  rotationSpeed: 0.004,
  type: "Satélite natural da Terra",
  diameter: "3.474 km",
  distance: "384.400 km da Terra",
  day: "27,3 dias terrestres",
  year: "27,3 dias (em torno da Terra)",
  moons: "1",
  temperature: "-173°C a 127°C",
  gravity: "1,62 m/s²",
  color: "0 0% 80%",
  description:
    " A Lua é o único satélite natural da Terra e o quinto maior do Sistema Solar. Influencia as marés e estabiliza o eixo de rotação do nosso planeta.",
};
