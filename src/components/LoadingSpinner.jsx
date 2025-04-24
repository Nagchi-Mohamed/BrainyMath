import React from 'react';

const LoadingSpinner = ({ size = 'medium', fullPage = false }) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 'spinner-small';
      case 'large':
        return 'spinner-large';
      default:
        return 'spinner-medium';
    }
  };

  if (fullPage) {
    return (
      <div className="spinner-container-fullpage">
        <div className={`spinner ${getSize()}`}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="spinner-container">
      <div className={`spinner ${getSize()}`}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 