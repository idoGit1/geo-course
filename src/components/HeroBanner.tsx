import type { ReactNode } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';
import TopoPattern from './TopoPattern';
import CoordinateChip from './CoordinateChip';
import { COLORS, FONT_DISPLAY } from '../theme';

interface HeroBannerProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  description?: string;
  accent?: string;
  Icon?: SvgIconComponent;
  chips?: string[];
  actions?: ReactNode;
  compact?: boolean;
}

/**
 * Reusable hero header. Renders the course intro on the home page
 * and, with different props, the per-unit header on every unit page -
 * same visual language (ink background, topo contour lines, brass
 * coordinate chip), different content.
 */
export default function HeroBanner({
  eyebrow,
  title,
  subtitle,
  description,
  accent = COLORS.brass,
  Icon,
  chips,
  actions,
  compact = false,
}: HeroBannerProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: COLORS.ink,
        backgroundImage: `linear-gradient(135deg, ${COLORS.ink} 0%, #1E3346 100%)`,
        color: '#fff',
        py: compact ? { xs: 5, md: 7 } : { xs: 7, md: 10 },
      }}
    >
      <TopoPattern color={accent} opacity={0.16} />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: -60,
          insetInlineEnd: -60,
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}33 0%, transparent 70%)`,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Stack spacing={2.5} sx={{ maxWidth: 720 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            {Icon && (
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: `${accent}26`,
                  border: `1px solid ${accent}66`,
                }}
              >
                <Icon sx={{ color: accent }} />
              </Box>
            )}
            {eyebrow && <CoordinateChip label={eyebrow} color={accent} />}
          </Stack>

          <Typography
            variant={compact ? 'h3' : 'h2'}
            sx={{ fontFamily: FONT_DISPLAY, lineHeight: 1.15, fontSize: compact ? { xs: '1.9rem', md: '2.5rem' } : { xs: '2.2rem', md: '3.2rem' } }}
          >
            {title}
          </Typography>

          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.82)', fontWeight: 400, fontFamily: FONT_DISPLAY }}>
            {subtitle}
          </Typography>

          {description && (
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.68)', maxWidth: 640 }}>
              {description}
            </Typography>
          )}

          {chips && chips.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {chips.map((c) => (
                <CoordinateChip key={c} label={c} color={accent} />
              ))}
            </Stack>
          )}

          {actions && <Box sx={{ pt: 1 }}>{actions}</Box>}
        </Stack>
      </Container>
    </Box>
  );
}
