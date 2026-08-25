import {
  PanelTop,
  Grid3x3,
  Sun,
  Boxes,
  Layers,
  Frame,
  Fence,
  Ruler,
  Construction,
  Umbrella,
  DoorClosed,
  AppWindow,
} from 'lucide-react'

const icons = [PanelTop, Grid3x3, Sun, Boxes, Layers, Frame, Fence, Ruler, Construction, Umbrella, DoorClosed, AppWindow]

export default function ServiceIcon({ index, size = 24, className = '' }) {
  const Icon = icons[index % icons.length]
  return <Icon size={size} className={className} />
}
