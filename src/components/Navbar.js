import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from '../hooks/useTranslation';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.md};
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color ${props => props.theme.transitions.default};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color ${props => props.theme.transitions.default};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LanguageSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${props => props.theme.colors.text};
  transition: color ${props => props.theme.transitions.default};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Navbar = () => {
  const { isDarkMode, toggleDarkMode, language, changeLanguage } = useSettings();
  const { t } = useTranslation();

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <img src="/images/Logo.svg" alt="BrainyMath" height="32" />
          BrainyMath
        </Logo>
        <NavLinks>
          <NavLink to="/">{t('nav.home')}</NavLink>
          <NavLink to="/lessons">{t('nav.lessons')}</NavLink>
          <NavLink to="/games">{t('nav.games')}</NavLink>
          <NavLink to="/groups">{t('nav.groups')}</NavLink>
          <NavLink to="/forum">{t('nav.forum')}</NavLink>
          <NavLink to="/classroom">{t('nav.classroom')}</NavLink>
          <NavLink to="/profile">{t('nav.profile')}</NavLink>
        </NavLinks>
        <SettingsContainer>
          <LanguageSelect
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </LanguageSelect>
          <ThemeToggle onClick={toggleDarkMode}>
            {isDarkMode ? '☀️' : '🌙'}
          </ThemeToggle>
        </SettingsContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 