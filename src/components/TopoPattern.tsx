import { Box } from '@mui/material';

interface TopoPatternProps {
  color?: string;
  opacity?: number;
  /** flips the contour set horizontally for visual variety */
  flip?: boolean;
}

/**
 * Reusable decorative background: concentric, hand-drawn-feeling
 * contour lines evoking a topographic elevation map. Used behind
 * hero banners across the site so every unit reads as its own
 * "region" while sharing one visual language.
 */
export default function TopoPattern({ color = '#FFFFFF', opacity = 0.14, flip = false }: TopoPatternProps) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        transform: flip ? 'scaleX(-1)' : 'none',
      }}
    >
      <svg
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0 }}
      >
        <g fill="none" stroke={color} strokeWidth="1.4" opacity={opacity}>
          <path d="M -50 260 C 120 200, 220 320, 340 240 S 560 140, 700 220 S 900 260, 950 200" />
          <path d="M -50 300 C 130 250, 230 360, 360 290 S 570 190, 710 270 S 900 300, 950 250" />
          <path d="M -50 340 C 140 300, 240 400, 380 340 S 580 240, 720 320 S 900 340, 950 300" />
          <path d="M -50 220 C 110 160, 210 270, 320 190 S 550 90, 690 170 S 900 220, 950 150" />
          <path d="M -50 180 C 100 120, 200 220, 300 140 S 540 40, 680 120 S 900 180, 950 100" />
          <path d="M -50 380 C 150 350, 250 400, 400 380 S 590 300, 730 360 S 900 380, 950 340" />
        </g>
        <g fill={color} opacity={opacity * 1.4}>
          <circle cx="120" cy="90" r="2" />
          <circle cx="640" cy="60" r="2" />
          <circle cx="420" cy="150" r="2" />
          <circle cx="760" cy="180" r="2" />
        </g>
      </svg>
    </Box>
  );
}
