import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: #4a6bff;
  }
`;

const Paragraph = styled.p`
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TeamMember = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
`;

const MemberImage = styled.div`
  height: 150px;
  background-color: #4a6bff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const MemberInfo = styled.div`
  padding: 1.5rem;
`;

const MemberName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
`;

const MemberRole = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const MemberBio = styled.p`
  color: #34495e;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #4a6bff;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #7f8c8d;
  font-size: 1rem;
`;

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Former math teacher with a passion for making mathematics accessible and enjoyable for everyone.',
      icon: '👩‍🏫'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Lead Developer',
      bio: 'Software engineer specializing in educational technology and interactive learning experiences.',
      icon: '👨‍💻'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Math Curriculum Designer',
      bio: 'PhD in Mathematics Education with expertise in creating engaging and effective learning materials.',
      icon: '👩‍🔬'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'UX Designer',
      bio: 'User experience specialist focused on creating intuitive and engaging educational interfaces.',
      icon: '👨‍🎨'
    }
  ];

  return (
    <AboutContainer>
      <PageTitle>About BrainyMath</PageTitle>

      <Section>
        <SectionTitle>Our Mission</SectionTitle>
        <Paragraph>
          At BrainyMath, we believe that mathematics is not just a subject to be learned, but a skill to be mastered through practice, engagement, and collaboration. Our mission is to make mathematics education accessible, enjoyable, and effective for learners of all ages and abilities.
        </Paragraph>
        <Paragraph>
          We combine interactive lessons, gamified exercises, and collaborative learning environments to create a comprehensive platform that adapts to each learner's pace and style. Our goal is to build confidence, foster curiosity, and develop problem-solving skills that extend beyond the classroom.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Our Impact</SectionTitle>
        <StatsContainer>
          <StatCard>
            <StatNumber>50,000+</StatNumber>
            <StatLabel>Active Learners</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>1,000+</StatNumber>
            <StatLabel>Study Groups</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>500+</StatNumber>
            <StatLabel>Interactive Lessons</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>95%</StatNumber>
            <StatLabel>Satisfaction Rate</StatLabel>
          </StatCard>
        </StatsContainer>
      </Section>

      <Section>
        <SectionTitle>Our Team</SectionTitle>
        <Paragraph>
          BrainyMath was founded by a team of educators, developers, and mathematicians who share a passion for making mathematics education more engaging and effective. Our diverse team brings together expertise in education, technology, and mathematics to create a platform that truly makes a difference.
        </Paragraph>
        <TeamGrid>
          {teamMembers.map(member => (
            <TeamMember key={member.id}>
              <MemberImage>{member.icon}</MemberImage>
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
                <MemberBio>{member.bio}</MemberBio>
              </MemberInfo>
            </TeamMember>
          ))}
        </TeamGrid>
      </Section>

      <Section>
        <SectionTitle>Our Story</SectionTitle>
        <Paragraph>
          BrainyMath was born out of a simple observation: traditional mathematics education often fails to engage students and doesn't adapt to individual learning needs. Our founder, Sarah Johnson, a former math teacher, experienced this challenge firsthand in her classroom.
        </Paragraph>
        <Paragraph>
          In 2020, Sarah teamed up with Michael Chen, a software engineer with a passion for educational technology, to create a platform that would make mathematics learning more interactive and personalized. What started as a small project has grown into a comprehensive learning platform used by thousands of students worldwide.
        </Paragraph>
        <Paragraph>
          Today, BrainyMath continues to evolve, incorporating feedback from our users and the latest research in mathematics education to provide an ever-improving learning experience.
        </Paragraph>
      </Section>
    </AboutContainer>
  );
};

export default About; 