import { Link as RouterLink } from 'react-router-dom';
import { Card, CardActionArea, Box, Typography, Stack, Chip } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Unit } from '../types';
import CoordinateChip from './CoordinateChip';
import { COLORS, FONT_DISPLAY } from '../theme';

interface UnitCardProps {
  unit: Unit;
}

/** Reusable tile representing one unit in the home-page "index" grid. */
export default function UnitCard({ unit }: UnitCardProps) {
  const Icon = unit.icon;
  const unitNumber = String(unit.id).padStart(2, '0');

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 24px -12px ${unit.accent}55`,
          borderColor: unit.accent,
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/unit/${unit.slug}`}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', p: 0 }}
      >
        <Box sx={{ height: 6, backgroundColor: unit.accent }} />
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1.5, flexGrow: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `${unit.accent}1F`,
              }}
            >
              <Icon sx={{ color: unit.accent }} />
            </Box>
            <Typography
              sx={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 800,
                fontSize: '1.6rem',
                color: COLORS.line,
                lineHeight: 1,
              }}
            >
              {unitNumber}
            </Typography>
          </Stack>

          <Typography variant="h6" sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700 }}>
            {unit.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
            {unit.subtitle}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ pt: 0.5 }}>
            <Chip
              size="small"
              icon={<PlayCircleOutlineIcon sx={{ fontSize: '16px !important' }} />}
              label={unit.videos.length}
              variant="outlined"
              sx={{ borderColor: COLORS.line }}
            />
            <Chip
              size="small"
              icon={<MenuBookOutlinedIcon sx={{ fontSize: '16px !important' }} />}
              label={unit.paragraphs.length}
              variant="outlined"
              sx={{ borderColor: COLORS.line }}
            />
            <Chip
              size="small"
              icon={<AssignmentOutlinedIcon sx={{ fontSize: '16px !important' }} />}
              label={unit.assignments.length}
              variant="outlined"
              sx={{ borderColor: COLORS.line }}
            />
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
            <CoordinateChip label={`קנ״מ ${unit.scale}`} color={unit.accent} />
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: unit.accent, fontWeight: 700, fontSize: '0.85rem' }}>
              כניסה ליחידה
              <ArrowBackIcon sx={{ fontSize: 16 }} />
            </Stack>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
}
