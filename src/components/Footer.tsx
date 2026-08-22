import { Box, Container, Typography, Stack } from '@mui/material';
import { Explore as ExploreIcon } from '@mui/icons-material';
import { COLORS, FONT_DISPLAY } from '../theme';

export const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: COLORS.ink, color: 'rgba(255,255,255,0.75)', mt: 8 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          sx={{ py: 4 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <ExploreIcon sx={{ color: COLORS.brass, fontSize: 20 }} />
            <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: '#fff' }}>
              אטלס · קורס גאוגרפיה
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            כל התוכן באתר חינמי לשימוש ולמידה - שישה יחידות, סרטונים, טקסטים ומטלות.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

