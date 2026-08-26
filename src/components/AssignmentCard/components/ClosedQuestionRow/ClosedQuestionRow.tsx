import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { AssignmentQuestion } from "../../../../types";

interface ClosedQuestionRowProps {
  question: AssignmentQuestion;
  index: number;
}

export const ClosedQuestionRow = ({
  question,
  index,
}: ClosedQuestionRowProps) => {
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
          <RadioGroup {...field} value={field.value ?? ""}>
            {question.options?.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.text}
                control={<Radio />}
                label={option.text}
              />
            ))}
          </RadioGroup>
        )}
      ></Controller>
    </Box>
  );
};
