import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from '../hooks/useTranslation';
import { FaMoon, FaSun, FaGlobe, FaBars, FaTimes } from 'react-icons/fa';

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  transition: all ${({ theme }) => theme.transitions.default};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  img {
    height: 40px;
    width: auto;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.cardBg};
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    box-shadow: ${({ theme }) => theme.shadows.md};
    z-index: ${({ theme }) => theme.zIndices.dropdown};

    &.active {
      display: flex;
    }
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-weight: ${({ theme, active }) => active ? theme.typography.fontWeights.semibold : theme.typography.fontWeights.normal};
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    &:after {
      width: 100%;
    }
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBg};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LanguageSelect = styled.select`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

const MobileMenuButton = styled(IconButton)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { darkMode, toggleDarkMode, language, setLanguage } = useSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <img src="/images/Logo.svg" alt="BrainyMath Logo" />
          BrainyMath
        </Logo>

        <MobileMenuButton onClick={toggleMobileMenu} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>

        <NavLinks className={isMobileMenuOpen ? 'active' : ''}>
          <NavLink to="/lessons" active={location.pathname === '/lessons' || location.pathname.startsWith('/lessons/')}>
            {t('nav.lessons')}
          </NavLink>
          <NavLink to="/games" active={location.pathname === '/games'}>
            {t('nav.games')}
          </NavLink>
          <NavLink to="/groups" active={location.pathname === '/groups' || location.pathname.startsWith('/groups/')}>
            {t('nav.groups')}
          </NavLink>
          <NavLink to="/forum" active={location.pathname === '/forum' || location.pathname.startsWith('/forum/')}>
            {t('nav.forum')}
          </NavLink>
        </NavLinks>

        <Controls>
          <IconButton onClick={toggleDarkMode} title={darkMode ? t('nav.lightMode') : t('nav.darkMode')}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </IconButton>
          <LanguageSelect 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            aria-label={t('nav.selectLanguage')}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </LanguageSelect>
        </Controls>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 