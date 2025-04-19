import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
`;

const LogoText = styled.div`
  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #2c3e50;
  }
  p {
    margin: 0;
    font-size: 0.9rem;
    color: #7f8c8d;
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: #2c3e50;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: #3498db;
    }

    &.active {
      color: #3498db;
    }
  }
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  width: 300px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #7f8c8d;
  cursor: pointer;

  &:hover {
    color: #3498db;
  }
`;

const QuickAccess = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: #2c3e50;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    color: #3498db;
  }
`;

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const toggleTheme = () => {
    // Implement theme toggle functionality
    console.log('Toggle theme');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <LogoImage src="/images/Logo.png" alt="BrainyMath Logo" />
          <LogoText>
            <h1>BrainyMath</h1>
            <p>Learn Smart</p>
          </LogoText>
        </LogoContainer>

        <Nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/lessons">Lessons</Link></li>
            <li><Link to="/games">Games</Link></li>
            <li><Link to="/groups">Groups</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </Nav>

        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="search"
              placeholder="Search lessons, games, or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit">
              <i className="fas fa-search" />
            </SearchButton>
          </form>
        </SearchContainer>

        <QuickAccess>
          <ThemeToggle onClick={toggleTheme}>
            <i className="fas fa-moon" />
          </ThemeToggle>
        </QuickAccess>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 