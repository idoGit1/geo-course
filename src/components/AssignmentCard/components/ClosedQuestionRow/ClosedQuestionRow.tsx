import {
    Box,
    FormControlLabel,
    Radio,
    RadioGroup
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { AssignmentQuestion } from "../../../../types";
import { QuestionTitle } from "../QuestionTitle/QuestionTitle";

interface ClosedQuestionRowProps {
  question: AssignmentQuestion;
  index: number;
  disabled: boolean;
}

export const ClosedQuestionRow = ({
  question,
  index,
  disabled,
}: ClosedQuestionRowProps) => {
  const { control } = useFormContext();
  return (
    <Box sx={{ py: 1.5 }}>
      <QuestionTitle question={question} index={index} />
      <Controller
        name={question.id.toString()}
        control={control}
        render={({ field }) => (
          <RadioGroup {...field} value={field.value ?? ""}>
            {question.options?.map((option) => (
              <FormControlLabel
                disabled={disabled}
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
