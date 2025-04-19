import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  * {
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
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
  }
  
  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease;
  }
  
  button {
    cursor: pointer;
    font-family: inherit;
    border: none;
    outline: none;
    transition: all 0.2s ease;
  }
  
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  ul, ol {
    list-style: none;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: ${props => props.theme.borderRadius.md};
    font-weight: 500;
    transition: all 0.2s ease;
    text-align: center;
    cursor: pointer;
  }
  
  .btn-primary {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    
    &:hover {
      background-color: ${props => props.theme.colors.secondary};
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.md};
    }
  }
  
  .btn-secondary {
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};
    
    &:hover {
      background-color: ${props => props.theme.colors.primary};
      color: white;
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.md};
    }
  }
  
  .card {
    background-color: ${props => props.theme.colors.white};
    border-radius: ${props => props.theme.borderRadius.md};
    box-shadow: ${props => props.theme.shadows.sm};
    padding: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: ${props => props.theme.shadows.md};
    }
  }
  
  .section {
    padding: 4rem 0;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    color: ${props => props.theme.colors.text};
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 3px;
      background-color: ${props => props.theme.colors.primary};
    }
  }
  
  .fade-in {
    animation: fadeIn 0.5s ease-in;
  }
  
  .slide-up {
    animation: slideUp 0.5s ease-out;
  }
  
  .slide-in-left {
    animation: slideInLeft 0.5s ease-out;
  }
  
  .slide-in-right {
    animation: slideInRight 0.5s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slideInLeft {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideInRight {
    from { transform: translateX(20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  /* Responsive adjustments */
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    html {
      font-size: 14px;
    }
    
    .section {
      padding: 3rem 0;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    html {
      font-size: 12px;
    }
    
    .section {
      padding: 2rem 0;
    }
  }
`;

export default GlobalStyle; 