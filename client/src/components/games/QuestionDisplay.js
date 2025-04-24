import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const QuestionDisplay = ({ question, questionNumber, totalQuestions, selectedAnswer, onAnswerSelect }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Question {questionNumber} of {totalQuestions}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {question.text}
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Choose an answer:</FormLabel>
        <RadioGroup
          value={selectedAnswer}
          onChange={(e) => onAnswerSelect(parseInt(e.target.value, 10))}
        >
          {question.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={index}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default QuestionDisplay;