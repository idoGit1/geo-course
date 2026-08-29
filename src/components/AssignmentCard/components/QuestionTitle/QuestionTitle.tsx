import { Box, Typography } from "@mui/material";
import { AssignmentQuestion } from "../../../../types";

export const QuestionTitle = ({
  question,
  index,
}: {
  question: AssignmentQuestion;
  index: number;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", mb: 1 }}>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {`${index}. ${question.text}`}
      </Typography>
      <Typography
        style={{ marginRight: "auto" }}
        sx={{ fontWeight: 300, fontSize: 14 }}
      >
        {question.score
          ? `ציון: ${question.score}/${question.possiblePoints}`
          : `${question.possiblePoints} נקודות`}
      </Typography>
    </Box>
  );
};
