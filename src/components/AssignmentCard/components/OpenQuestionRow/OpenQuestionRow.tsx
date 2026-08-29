import { Box, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { AssignmentQuestion } from "../../../../types";
import { QuestionTitle } from "../QuestionTitle/QuestionTitle";

interface OpenQuestionRowProps {
  question: AssignmentQuestion;
  index: number;
  disabled: boolean;
}

export const OpenQuestionRow = ({
  question,
  index,
  disabled,
}: OpenQuestionRowProps) => {
  const { control } = useFormContext();
  return (
    <Box sx={{ py: 1.5 }}>
      <QuestionTitle question={question} index={index} />
      <Controller
        name={question.id.toString()}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            disabled={disabled}
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
