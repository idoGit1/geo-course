import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import ExploreOffIcon from '@mui/icons-material/ExploreOff';
import HomeIcon from '@mui/icons-material/Home';
import TopoPattern from '../components/TopoPattern';
import { COLORS, FONT_DISPLAY } from '../theme';

export default function NotFound() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: COLORS.ink,
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      <TopoPattern color={COLORS.brass} opacity={0.18} />
      <Container maxWidth="sm" sx={{ position: 'relative', textAlign: 'center' }}>
        <Stack spacing={3} alignItems="center">
          <ExploreOffIcon sx={{ fontSize: 64, color: COLORS.brass }} />
          <Typography variant="h3" sx={{ fontFamily: FONT_DISPLAY, fontWeight: 800 }}>
            נראה שסטיתם מהמסלול
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.72)' }}>
            העמוד שחיפשתם לא נמצא על המפה שלנו. אולי הקישור השתנה, או שהיחידה עדיין לא קיימת.
          </Typography>
          <Button component={RouterLink} to="/" variant="contained" color="primary" startIcon={<HomeIcon />} size="large">
            חזרה לעמוד הראשי
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
