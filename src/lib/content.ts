import type { MotifKey } from "@/components/motif-glyphs";

export const MOTIFS: {
  key: MotifKey;
  name: string;
  short: string;
  long: string;
  named: string[];
  swatchImage: string;
}[] = [
  {
    key: "buta",
    name: "Royal Buta",
    short: "The majestic, standalone floral motif.",
    long: "The prestige motif, historically reserved for royal cloth — a single large flowering form that stands alone and signals the carver's and patron's status. In Sanganeri tradition, its proud curvature typically leans gently to the right.",
    named: ["Bichoo Buta (scorpion-shaped)", "Katar Buta (dagger-shaped)", "Gulab Buta"],
    swatchImage: "/images/swatch-buta.jpg",
  },
  {
    key: "buti",
    name: "Sprigged Buti",
    short: "The smaller, scattered floral sprig motif.",
    long: "The everyday cousin of the buta — a fine floral sprig scattered rhythmically across a ground, the workhorse of village cloth. Delicate and hand-stamped across the full length of unbleached cotton mul.",
    named: ["Scattered floral sprigs", "Indigenous flora & fauna", "Morani (peacock) sprig"],
    swatchImage: "/images/swatch-buti.jpg",
  },
  {
    key: "bel",
    name: "Running Bel",
    short: "The continuous creeper / vine border motif.",
    long: "A running interlace of leaves and flowers drawn between two parallel boundary lines and repeated as a rhythmic unit along the border. Named variants take their character from indigenous wildlife and plants that grow along the Sahibi river.",
    named: ["Keri (mango) Bel", "Sugga (parrot) Bel", "Morani (peacock) Bel"],
    swatchImage: "/images/swatch-bel.jpg",
  },
  {
    key: "jaal",
    name: "Floral Jaal",
    short: "The all-over floral net / lattice.",
    long: "An all-over floral net covering the entire fabric rather than sitting as discrete units. Considered the most technically demanding motif for Chippa artisans, requiring seamless block registration without visible seams.",
    named: ["Continuous botanical lattice", "Full-surface vine repeat", "Vann Jaal"],
    swatchImage: "/images/swatch-jaal.jpg",
  },
  {
    key: "paisley",
    name: "Keri / Paisley",
    short: "The iconic curved mango botanical teardrop.",
    long: "Rooted in the ancient mango motif (Keri), the Sanganeri paisley is celebrated for its slender, elongated tip, delicate inner floral fillings (datta), and fine outline detailing (rekha).",
    named: ["Keri Buta", "Peacock Paisley", "Ambi Motif"],
    swatchImage: "/images/swatch-paisley.jpg",
  },
  {
    key: "geometric",
    name: "Jaali & Geometric",
    short: "Architectural lattice & geometric bands.",
    long: "Inspired by the perforated stone screens (jaali) and stepwells (baoris) of Jaipur and Amber palaces, these geometric motifs bring structured rhythm to borders and contrast trims.",
    named: ["Chowkadi (trellis grid)", "Leheriya bands", "Kikri borders"],
    swatchImage: "/images/swatch-jaal.jpg",
  },
];

export const PROCESS_STEPS = [
  {
    n: 1,
    code: "01",
    stage: "DESIGN",
    hindi: "Naksha",
    title: "Design & Tracing",
    body: "The master pattern is drawn on paper with precision, scaled for repeatable registration, and transferred onto smoothed blocks with zinc oxide paste.",
    image: "/images/fabric-macro.jpg",
  },
  {
    n: 2,
    code: "02",
    stage: "CARVE",
    hindi: "Ghadai",
    title: "Block Carving",
    body: "Seasoned sheesham and teak wood are soaked in mustard oil, then chiseled by hand. Outline blocks (rekha) define the shape, while fill blocks (datta) hold each pigment.",
    image: "/images/block-carve.jpg",
  },
  {
    n: 3,
    code: "03",
    stage: "DYE",
    hindi: "Rang Saazi",
    title: "Natural Dye Preparation",
    body: "Indigo vats ferment, madder roots simmer for earthy reds, and turmeric yields golden amber. Natural gums thicken the dye to prevent bleeding across cotton fibers.",
    image: "/images/sun-dry.jpg",
  },
  {
    n: 4,
    code: "04",
    stage: "PRINT",
    hindi: "Chhapaai",
    title: "Hand Block Printing",
    body: "On 60-foot padded tables, the printer dips the carved block into the dye tray and strikes it with firm, rhythmic pressure. One block, one colour, registration by eye.",
    image: "/images/craft-press.jpg",
  },
  {
    n: 5,
    code: "05",
    stage: "DRY",
    hindi: "Sukhaai",
    title: "Sun-Drying in Courtyards",
    body: "Freshly printed cloth is carried to open courtyards and hung over tall bamboo poles. Rajasthan's brilliant desert sun sets and deepens the natural pigments.",
    image: "/images/sun-dry.jpg",
  },
  {
    n: 6,
    code: "06",
    stage: "FINISH",
    hindi: "Dhulaai & Steam",
    title: "Fixing, Washing & Finishing",
    body: "Cloth is bathed in river tanks or mordant baths to bond dyes permanently to the cellulose fibers, removing excess pigments before tailored garment construction.",
    image: "/images/hero-sanganeri.jpg",
  },
];

export const TIMELINE = [
  {
    year: "16th–17th c.",
    text: "Chippa community artisans settle in Sanganer and Bagru on the fertile banks of the Sahibi river, bringing virtuoso block carving techniques under royal Mewar patronage.",
  },
  {
    year: "Founding",
    text: "Sanganer is fortified by Rana Sanga, becoming an internationally acclaimed art-printing centre celebrated for its pristine white cotton grounds and delicate floral butas.",
  },
  {
    year: "18th c.",
    text: "Sanganeri printed calicos and muslins become prized across Mughal court pavilions and are exported across the Indian Ocean to Europe.",
  },
  {
    year: "2010",
    text: "Sanganeri hand block printing is formally granted the Geographical Indication (GI) tag, legally protecting its authentic hand processes and artisan community.",
  },
];

export const NATURAL_DYES = [
  { name: "Indigo", tone: "Deep oceanic blue", color: "#2a3d63", source: "Fermented Indigofera tinctoria leaves" },
  { name: "Madder", tone: "Warm terracotta red", color: "#9c3b2e", source: "Rubia tinctorum dried roots" },
  { name: "Turmeric", tone: "Golden desert amber", color: "#c98a1e", source: "Curcuma longa rhizome powder" },
  { name: "Pomegranate", tone: "Soft olive & mustard", color: "#7e8a63", source: "Dardim dried fruit rind" },
  { name: "Iron rust", tone: "Charcoal & kohl black", color: "#23201b", source: "Aged scrap iron fermented in molasses" },
  { name: "Harda (Myrobalan)", tone: "Tannin mordant primer", color: "#c9bfa8", source: "Chebulic myrobalan nut infusion" },
];
