import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color ${({ theme }) => theme.transitions.default},
                color ${({ theme }) => theme.transitions.default};
    overflow-x: hidden;
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
  
  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    transition: all ${({ theme }) => theme.transitions.fast};
    
    &:focus {
      outline: none;
    }
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
  
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: 0.5rem 0.75rem;
    transition: all ${({ theme }) => theme.transitions.fast};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    }
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    line-height: ${({ theme }) => theme.typography.lineHeights.tight};
    margin-bottom: 1rem;
  }
  
  h1 { font-size: ${({ theme }) => theme.typography.fontSizes['4xl']}; }
  h2 { font-size: ${({ theme }) => theme.typography.fontSizes['3xl']}; }
  h3 { font-size: ${({ theme }) => theme.typography.fontSizes['2xl']}; }
  h4 { font-size: ${({ theme }) => theme.typography.fontSizes.xl}; }
  h5 { font-size: ${({ theme }) => theme.typography.fontSizes.lg}; }
  h6 { font-size: ${({ theme }) => theme.typography.fontSizes.base}; }
  
  p {
    margin-bottom: 1rem;
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 0 2rem;
    }
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    transition: all ${({ theme }) => theme.transitions.fast};
    gap: 0.5rem;
    
    &-primary {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
      
      &:hover {
        background-color: ${({ theme }) => theme.colors.primary}dd;
        transform: translateY(-1px);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
    
    &-secondary {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: white;
      
      &:hover {
        background-color: ${({ theme }) => theme.colors.secondary}dd;
        transform: translateY(-1px);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
    
    &-outline {
      border: 1px solid ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.text};
      
      &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primary};
        transform: translateY(-1px);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }
  
  .card {
    background-color: ${({ theme }) => theme.colors.cardBg};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: ${({ theme }) => theme.shadows.md};
    transition: all ${({ theme }) => theme.transitions.default};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.lg};
    }
  }
  
  .section {
    padding: 4rem 0;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.text};
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 3px;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
  
  .fade-enter {
    opacity: 0;
  }
  
  .fade-enter-active {
    opacity: 1;
    transition: opacity ${({ theme }) => theme.transitions.default};
  }
  
  .fade-exit {
    opacity: 1;
  }
  
  .fade-exit-active {
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.default};
  }
  
  .slide-up-enter {
    transform: translateY(20px);
    opacity: 0;
  }
  
  .slide-up-enter-active {
    transform: translateY(0);
    opacity: 1;
    transition: all ${({ theme }) => theme.transitions.default};
  }
  
  .slide-up-exit {
    transform: translateY(0);
    opacity: 1;
  }
  
  .slide-up-exit-active {
    transform: translateY(20px);
    opacity: 0;
    transition: all ${({ theme }) => theme.transitions.default};
  }
  
  /* Responsive adjustments */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    html {
      font-size: 14px;
    }
    
    .section {
      padding: 3rem 0;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    html {
      font-size: 12px;
    }
    
    .section {
      padding: 2rem 0;
    }
  }
`;

export default GlobalStyle; 