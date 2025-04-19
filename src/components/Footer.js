import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  padding: 2rem 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.textLight};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FooterText = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.primary};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>BrainyMath</FooterTitle>
          <FooterText>
            Making mathematics accessible, engaging, and fun for everyone. Join our community of learners and educators.
          </FooterText>
          <SocialLinks>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">{t('nav.home')}</FooterLink>
          <FooterLink to="/lessons">{t('nav.lessons')}</FooterLink>
          <FooterLink to="/games">{t('nav.games')}</FooterLink>
          <FooterLink to="/groups">{t('nav.groups')}</FooterLink>
          <FooterLink to="/forum">{t('nav.forum')}</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/help">Help Center</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/cookies">Cookie Policy</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {currentYear} BrainyMath. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 