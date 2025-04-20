import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const LessonHeader = styled.div`
  margin-bottom: 2rem;
`;

export const LessonMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

export const LessonContent = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const ContentSection = styled.section`
  margin-bottom: 2rem;

  h2 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

export const PracticeProblem = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1.5rem;
  margin-top: 2rem;

  h3 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
  }
`;

export const QuestionText = styled.div`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

export const AnswerInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const SubmitButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-size: 1rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FeedbackMessage = styled.div`
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  margin-top: 1rem;
  background: ${props => props.isCorrect ? props.theme.colors.success + '20' : props.theme.colors.error + '20'};
  color: ${props => props.isCorrect ? props.theme.colors.success : props.theme.colors.error};
  border: 1px solid ${props => props.isCorrect ? props.theme.colors.success : props.theme.colors.error};
`;

export const TipBox = styled.div`
  background: ${props => props.theme.colors.warning + '20'};
  border: 1px solid ${props => props.theme.colors.warning};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  margin-top: 1rem;
  color: ${props => props.theme.colors.warning};
`; 