import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack, Chip, Box } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, MenuBookOutlined as MenuBookOutlinedIcon } from '@mui/icons-material';
import type { ParagraphItem } from '../types';
import { FONT_DISPLAY } from '../theme';

interface ParagraphBlockProps {
  paragraph: ParagraphItem;
  accent: string;
  defaultExpanded?: boolean;
}

/** Reusable expandable reading block, shared by every unit's paragraph section. */
export const ParagraphBlock = ({ paragraph, accent, defaultExpanded = false }: ParagraphBlockProps) => {
  return (
    <Accordion defaultExpanded={defaultExpanded} disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <MenuBookOutlinedIcon sx={{ color: accent, fontSize: 20 }} />
          <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700 }}>{paragraph.title}</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {paragraph.content}
        </Typography>
        {paragraph.keyTerms.length > 0 && (
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              מונחי מפתח
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {paragraph.keyTerms.map((term) => (
                <Chip key={term} label={term} size="small" sx={{ backgroundColor: `${accent}1F`, color: accent, fontWeight: 700 }} />
              ))}
            </Stack>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

