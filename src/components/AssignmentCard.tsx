import { useState } from 'react';
import {
  Card,
  Box,
  Typography,
  Stack,
  Chip,
  Divider,
  Collapse,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { AssignmentItem, Difficulty } from '../types';
import { COLORS, FONT_DISPLAY } from '../theme';

interface AssignmentCardProps {
  assignment: AssignmentItem;
  accent: string;
}

const difficultyColor: Record<Difficulty, string> = {
  קל: COLORS.forest,
  בינוני: COLORS.brass,
  מאתגר: COLORS.clay,
};

function QuestionRow({ id, question, answer, accent }: { id: string; question: string; answer: string; accent: string }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <Box sx={{ py: 1.5 }}>
      <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
        {question}
      </Typography>
      <Button
        size="small"
        variant="text"
        onClick={() => setRevealed((r) => !r)}
        startIcon={revealed ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
        sx={{ color: accent, px: 0 }}
        aria-expanded={revealed}
        aria-controls={`answer-${id}`}
      >
        {revealed ? 'הסתרת תשובה' : 'הצגת תשובה לדוגמה'}
      </Button>
      <Collapse in={revealed} id={`answer-${id}`}>
        <Box
          sx={{
            mt: 1,
            p: 1.5,
            borderRadius: 1.5,
            backgroundColor: `${accent}14`,
            borderInlineStart: `3px solid ${accent}`,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {answer}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
}

/** Reusable card for a single assignment, shared by every unit's assignments section. */
export default function AssignmentCard({ assignment, accent }: AssignmentCardProps) {
  const [done, setDone] = useState(false);

  return (
    <Card sx={{ p: 3, opacity: done ? 0.75 : 1, transition: 'opacity 0.15s ease' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <AssignmentOutlinedIcon sx={{ color: accent }} />
          <Typography variant="h6" sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700 }}>
            {assignment.title}
          </Typography>
        </Stack>
        <Chip
          size="small"
          label={assignment.difficulty}
          sx={{
            backgroundColor: `${difficultyColor[assignment.difficulty]}1F`,
            color: difficultyColor[assignment.difficulty],
            fontWeight: 700,
          }}
        />
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {assignment.description}
      </Typography>

      <Divider sx={{ my: 1.5 }} />

      {assignment.questions.map((q, i) => (
        <Box key={q.id}>
          <QuestionRow id={`${assignment.id}-${q.id}`} question={`${i + 1}. ${q.question}`} answer={q.answer} accent={accent} />
          {i < assignment.questions.length - 1 && <Divider />}
        </Box>
      ))}

      <Divider sx={{ my: 1.5 }} />

      <FormControlLabel
        control={
          <Checkbox
            checked={done}
            onChange={(e) => setDone(e.target.checked)}
            icon={<CheckCircleIcon sx={{ color: COLORS.line }} />}
            checkedIcon={<CheckCircleIcon sx={{ color: accent }} />}
          />
        }
        label={
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {done ? 'סומן כהושלם' : 'סמנו כהושלם'}
          </Typography>
        }
      />
    </Card>
  );
}
