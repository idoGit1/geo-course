import { Box, Typography } from '@mui/material';
import { FONT_MONO } from '../../theme';

interface CoordinateChipProps {
  label: string;
  color?: string;
  variant?: 'solid' | 'outline';
}

/**
 * Small cartography-flavoured badge (e.g. a unit number or map
 * scale) set in monospace, like an annotation printed in the margin
 * of a survey map. Reused across unit cards and unit hero headers.
 */
export const CoordinateChip = ({ label, color = '#B98A3D', variant = 'outline' }: CoordinateChipProps) => {
  const isSolid = variant === 'solid';
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: 1.1,
        py: 0.4,
        borderRadius: '4px',
        border: `1px solid ${color}`,
        backgroundColor: isSolid ? color : 'transparent',
        lineHeight: 1,
      }}
    >
      <Typography
        component="span"
        sx={{
          fontFamily: FONT_MONO,
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.03em',
          color: isSolid ? '#FFFFFF' : color,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

