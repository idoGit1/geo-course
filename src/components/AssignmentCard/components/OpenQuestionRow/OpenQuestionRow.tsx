import { Box, TextField, Typography } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { AssignmentQuestion } from "../../../../types";

interface OpenQuestionRowProps {
  question: AssignmentQuestion
  index: number;
}

export const OpenQuestionRow = ({ question, index }: OpenQuestionRowProps) => {
  const { control } = useFormContext();
  return (
    <Box sx={{ py: 1.5 }}>
      <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
        {`${index}. ${question.text}`}
      </Typography>
      <Controller
        name={question.id.toString()}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
          />
        )}
      ></Controller>
    </Box>
  );
};
