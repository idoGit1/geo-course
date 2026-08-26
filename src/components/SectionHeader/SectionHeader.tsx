import { Box, Typography, Stack } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';
import { FONT_DISPLAY } from '../../theme';

interface SectionHeaderProps {
  Icon: SvgIconComponent;
  title: string;
  description: string;
  color: string;
}

/** Reusable header used above the video / reading / assignment sections. */
export const SectionHeader = ({ Icon, title, description, color }: SectionHeaderProps) => {
  return (
    <Stack spacing={1} sx={{ mb: 3 }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `${color}1F`,
          }}
        >
          <Icon sx={{ color, fontSize: 20 }} />
        </Box>
        <Typography variant="h5" sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700 }}>
          {title}
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 620 }}>
        {description}
      </Typography>
      <Box
        aria-hidden
        sx={{
          height: 0,
          borderTop: '2px dashed',
          borderColor: `${color}55`,
          width: '100%',
          maxWidth: 220,
        }}
      />
    </Stack>
  );
};

