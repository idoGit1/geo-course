import { AssignmentOutlined as AssignmentOutlinedIcon } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Card,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { COLORS, FONT_DISPLAY } from "../theme";
import type { AssignmentItem, Difficulty } from "../types";

interface AssignmentCardProps {
  assignment: AssignmentItem;
  accent: string;
}

const difficultyColor: Record<Difficulty, string> = {
  easy: COLORS.forest,
  medium: COLORS.brass,
  hard: COLORS.clay,
  extreme: COLORS.red,
};

const QuestionRow = ({ question }: { question: string }) => {
  return (
    <Box sx={{ py: 1.5 }}>
      <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
        {question}
      </Typography>
    </Box>
  );
}

/** Reusable card for a single assignment, shared by every unit's assignments section. */
export const AssignmentCard = ({
  assignment,
  accent,
}: AssignmentCardProps) => {
  const [done, setDone] = useState(false);

  return (
    <Card
      sx={{ p: 3, opacity: done ? 0.75 : 1, transition: "opacity 0.15s ease" }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ mb: 1 }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <AssignmentOutlinedIcon sx={{ color: accent }} />
          <Typography
            variant="h6"
            sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700 }}
          >
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
          <QuestionRow question={`${i + 1}. ${q.text}`} />
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
            {done ? "סומן כהושלם" : "סמנו כהושלם"}
          </Typography>
        }
      />
    </Card>
  );
};

