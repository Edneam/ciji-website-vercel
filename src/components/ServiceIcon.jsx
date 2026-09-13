import {
  GridFour,
  Crosshair,
  Polygon,
  Cube,
  Stack,
  Columns,
  Rows,
  Ruler,
  Door,
  Umbrella,
  Sliders,
  SquaresFour,
} from '@phosphor-icons/react'

// One icon family, one stroke weight, site-wide.
// Glyphs describe the assembly itself rather than a mood: a mullion grid for
// curtain walling, a point fixing for spider glazing, a lattice for space frames.
// Order matches src/data/services.js exactly.
const icons = [
  GridFour, // 0  Structural Glazing & Curtain Walling - mullion/transom grid
  Crosshair, // 1  Spider Glazing - point fixing
  Polygon, // 2  Skylights - angled roof glazing plane
  Cube, // 3  Space Frames - three-dimensional lattice
  Stack, // 4  Aluminium Cladding - layered panel build-up
  Columns, // 5  Glass Partitions - vertical divisions
  Rows, // 6  Stainless Steel Handrails & Balustrades - rail and infill
  Ruler, // 7  Aluminium Handrails & Balustrades - extruded profile
  Door, // 8  Gates
  Umbrella, // 9  Canopies - overhead shelter
  Sliders, // 10 Automatic Doors - sliding leaf
  SquaresFour, // 11 Doors & Windows - framed openings
]

export const ICON_WEIGHT = 'regular'

export default function ServiceIcon({ index, size = 24, className = '' }) {
  const Icon = icons[index % icons.length]
  return <Icon size={size} weight={ICON_WEIGHT} className={className} aria-hidden="true" />
}
