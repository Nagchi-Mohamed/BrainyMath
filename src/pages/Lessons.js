import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LessonsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
`;

const LessonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const LessonCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const LessonImage = styled.div`
  height: 150px;
  background-color: #4a6bff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const LessonContent = styled.div`
  padding: 1.5rem;
`;

const LessonTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
`;

const LessonDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const LessonMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ecf0f1;
`;

const LessonLevel = styled.span`
  background-color: #e0f7fa;
  color: #00acc1;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const StartButton = styled(Link)`
  display: inline-block;
  background-color: #4a6bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a5bef;
  }
`;

const Lessons = () => {
  const lessons = [
    {
      id: 1,
      title: 'Basic Addition',
      description: 'Learn the fundamentals of addition with interactive exercises.',
      level: 'Beginner',
      icon: '➕',
      path: '/lessons/addition'
    },
    {
      id: 2,
      title: 'Subtraction Basics',
      description: 'Master subtraction with fun and engaging problems.',
      level: 'Beginner',
      icon: '➖',
      path: '/lessons/subtraction'
    },
    {
      id: 3,
      title: 'Multiplication Tables',
      description: 'Memorize multiplication tables through interactive games.',
      level: 'Intermediate',
      icon: '✖️',
      path: '/lessons/multiplication'
    },
    {
      id: 4,
      title: 'Division Fundamentals',
      description: 'Understand division concepts with visual aids.',
      level: 'Intermediate',
      icon: '➗',
      path: '/lessons/division'
    },
    {
      id: 5,
      title: 'Fractions Introduction',
      description: 'Learn about fractions with hands-on activities.',
      level: 'Intermediate',
      icon: '½',
      path: '/lessons/fractions'
    },
    {
      id: 6,
      title: 'Basic Algebra',
      description: 'Introduction to algebraic concepts and equations.',
      level: 'Advanced',
      icon: 'x²',
      path: '/lessons/algebra'
    }
  ];

  return (
    <LessonsContainer>
      <PageTitle>Math Lessons</PageTitle>
      <LessonsGrid>
        {lessons.map(lesson => (
          <LessonCard key={lesson.id}>
            <LessonImage>{lesson.icon}</LessonImage>
            <LessonContent>
              <LessonTitle>{lesson.title}</LessonTitle>
              <LessonDescription>{lesson.description}</LessonDescription>
              <LessonMeta>
                <LessonLevel>{lesson.level}</LessonLevel>
                <StartButton to={lesson.path}>Start Lesson</StartButton>
              </LessonMeta>
            </LessonContent>
          </LessonCard>
        ))}
      </LessonsGrid>
    </LessonsContainer>
  );
};

export default Lessons; 