import { AssignmentOutlined as AssignmentOutlinedIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { COLORS, FONT_DISPLAY } from "../../theme";
import type { AssignmentItem, Difficulty } from "../../types";
import { ClosedQuestionRow } from "./components/ClosedQuestionRow/ClosedQuestionRow";
import { OpenQuestionRow } from "./components/OpenQuestionRow/OpenQuestionRow";
import { sumBy } from "lodash";
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

export const AssignmentCard = ({ assignment, accent }: AssignmentCardProps) => {
  const methods = useForm<Record<string, string>>();
  const score = assignment.isSubmitted
    ? sumBy(assignment.questions, (question) => question.score ?? 0)
    : undefined;
  const possiblePoints = sumBy(assignment.questions, "possiblePoints");
  function onSubmit(data: Record<string, string>) {
    console.log(data);
  }

  const DIFFICULTY_LABELS: Record<Difficulty, string> = {
    easy: "קל",
    medium: "בינוני",
    hard: "מאתגר",
    extreme: "מאד מאתגר",
  };

  return (
    <Card sx={{ p: 3, transition: "opacity 0.15s ease" }}>
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

          <Chip
            size="small"
            label={
              score ? `${score}/${possiblePoints}` : `${possiblePoints} נקודות`
            }
          />
        </Stack>
        <Chip
          size="small"
          label={DIFFICULTY_LABELS[assignment.difficulty]}
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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {assignment.questions.map((q, i) =>
            q.type === "open" ? (
              <Box key={q.id}>
                <OpenQuestionRow
                  disabled={assignment.isSubmitted}
                  index={i + 1}
                  question={q}
                />
                {i < assignment.questions.length - 1 && <Divider />}
              </Box>
            ) : (
              <Box key={q.id}>
                <ClosedQuestionRow
                  disabled={assignment.isSubmitted}
                  question={q}
                  index={i + 1}
                />
                {i < assignment.questions.length - 1 && <Divider />}
              </Box>
            ),
          )}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              disabled={assignment.isSubmitted}
              type="submit"
              variant="contained"
              color="primary"
            >
              {assignment.isSubmitted ? "המטלה הוגשה" : "הגש"}
            </Button>
          </Box>
        </form>
      </FormProvider>

      <Divider sx={{ my: 1.5 }} />
    </Card>
  );
};
