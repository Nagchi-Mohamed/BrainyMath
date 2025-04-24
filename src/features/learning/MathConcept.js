import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trackFeatureUsage } from '../../lib/analytics';

// Mock learning content database - in a real app, this would come from an API
const mathConcepts = {
  addition: {
    title: 'Addition',
    description: 'Addition is the process of calculating the total of two or more numbers or amounts.',
    sections: [
      {
        title: 'Basic Addition',
        content: `
          <p>Addition is one of the four basic operations of arithmetic. The addition of two numbers results in their sum.</p>
          <p>For example: 2 + 3 = 5</p>
          <p>Addition has several important properties:</p>
          <ul>
            <li><strong>Commutative property:</strong> Changing the order of the numbers doesn't change the result. For example, 2 + 3 = 3 + 2</li>
            <li><strong>Associative property:</strong> Changing how numbers are grouped doesn't change the result. For example, (2 + 3) + 4 = 2 + (3 + 4)</li>
            <li><strong>Identity property:</strong> Adding zero to any number gives the same number. For example, 5 + 0 = 5</li>
          </ul>
        `
      },
      {
        title: 'Addition Strategies',
        content: `
          <p>Here are some helpful strategies for addition:</p>
          <ol>
            <li><strong>Counting on:</strong> Start with the larger number and count forward. For 5 + 3, start at 5 then count "6, 7, 8".</li>
            <li><strong>Making tens:</strong> Regroup numbers to make tens. For 8 + 5, think of it as 8 + 2 + 3 = 10 + 3 = 13.</li>
            <li><strong>Doubles:</strong> Memorize doubles like 2 + 2, 3 + 3, etc. Then use them for near-doubles. For 6 + 7, think 6 + 6 = 12, so 6 + 7 = 13.</li>
            <li><strong>Breaking apart numbers:</strong> Split numbers into place values. For 26 + 35, do 20 + 30 = 50, then 6 + 5 = 11, so 26 + 35 = 61.</li>
          </ol>
        `
      }
    ],
    examples: [
      { problem: '5 + 3', solution: '8', explanation: 'Count on from 5: "6, 7, 8"' },
      { problem: '12 + 8', solution: '20', explanation: '12 + 8 = 20 (making a ten: 12 + 8 = 10 + 10)' },
      { problem: '24 + 35', solution: '59', explanation: '20 + 30 = 50, 4 + 5 = 9, so 24 + 35 = 59' }
    ],
    practice: [
      { problem: '6 + 7', solution: '13' },
      { problem: '15 + 8', solution: '23' },
      { problem: '27 + 45', solution: '72' },
      { problem: '125 + 37', solution: '162' }
    ],
    relatedConcepts: ['place-value', 'number-bonds', 'mental-math']
  },
  
  subtraction: {
    title: 'Subtraction',
    description: 'Subtraction is the operation of taking one number away from another to find the difference.',
    sections: [
      {
        title: 'Basic Subtraction',
        content: `
          <p>Subtraction is the inverse operation of addition. When we subtract, we find the difference between two numbers.</p>
          <p>For example: 5 - 2 = 3</p>
          <p>Some key properties of subtraction:</p>
          <ul>
            <li><strong>Non-commutative:</strong> Unlike addition, changing the order in subtraction changes the result. 5 - 2 ≠ 2 - 5</li>
            <li><strong>Non-associative:</strong> Changing how numbers are grouped affects the result. (8 - 3) - 2 ≠ 8 - (3 - 2)</li>
            <li><strong>Identity property:</strong> Subtracting zero from any number gives the same number. 8 - 0 = 8</li>
          </ul>
        `
      },
      {
        title: 'Subtraction Strategies',
        content: `
          <p>Here are some helpful strategies for subtraction:</p>
          <ol>
            <li><strong>Counting back:</strong> Count backwards from the larger number. For 8 - 3, count back "7, 6, 5".</li>
            <li><strong>Finding the difference:</strong> Count up from the smaller number to the larger number. For 12 - 9, count "10, 11, 12" which is 3 steps.</li>
            <li><strong>Related addition facts:</strong> Think of the addition fact that relates. For 15 - 7, think "7 plus what equals 15?" (7 + 8 = 15)</li>
            <li><strong>Breaking apart numbers:</strong> For 52 - 25, break it down to 50 - 20 = 30, then 2 - 5 = -3, so 30 - 3 = 27.</li>
          </ol>
        `
      }
    ],
    examples: [
      { problem: '8 - 5', solution: '3', explanation: 'Count back from 8: "7, 6, 5, 4, 3"' },
      { problem: '12 - 8', solution: '4', explanation: 'Find the difference by counting up from 8 to 12' },
      { problem: '35 - 18', solution: '17', explanation: '30 - 10 = 20, 5 - 8 = -3, so 20 - 3 = 17' }
    ],
    practice: [
      { problem: '9 - 4', solution: '5' },
      { problem: '15 - 7', solution: '8' },
      { problem: '32 - 17', solution: '15' },
      { problem: '100 - 45', solution: '55' }
    ],
    relatedConcepts: ['addition', 'number-line', 'place-value']
  },
  
  // Additional concepts would be added here
};

export default function MathConcept() {
  const { conceptId } = useParams();
  const [concept, setConcept] = useState(null);
  const [activeSection, setActiveSection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchConcept = () => {
      setLoading(true);
      setTimeout(() => {
        if (mathConcepts[conceptId]) {
          setConcept(mathConcepts[conceptId]);
          // Initialize user answers
          const initialAnswers = {};
          mathConcepts[conceptId].practice.forEach((item, index) => {
            initialAnswers[index] = '';
          });
          setUserAnswers(initialAnswers);
          trackFeatureUsage('learning', 'view_concept', { concept: conceptId });
        }
        setLoading(false);
      }, 500); // Simulate API delay
    };

    fetchConcept();
  }, [conceptId]);

  const handleAnswerChange = (index, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const checkAnswers = () => {
    setShowAnswers(true);
    trackFeatureUsage('learning', 'check_answers', {
      concept: conceptId,
      numAttempted: Object.values(userAnswers).filter(a => a !== '').length
    });
  };

  const tryAgain = () => {
    setShowAnswers(false);
    // Reset answers
    const resetAnswers = {};
    concept.practice.forEach((item, index) => {
      resetAnswers[index] = '';
    });
    setUserAnswers(resetAnswers);
  };

  if (loading) {
    return <div className="loading">Loading content...</div>;
  }

  if (!concept) {
    return (
      <div className="concept-not-found">
        <h2>Concept Not Found</h2>
        <p>Sorry, we couldn't find the concept you're looking for.</p>
        <button onClick={() => navigate('/learning')} className="btn btn-primary">
          Browse All Concepts
        </button>
      </div>
    );
  }

  return (
    <div className="concept-container">
      <div className="concept-header">
        <h1>{concept.title}</h1>
        <p className="concept-description">{concept.description}</p>
      </div>

      <div className="concept-nav">
        {concept.sections.map((section, index) => (
          <button
            key={index}
            className={`nav-item ${activeSection === index ? 'active' : ''}`}
            onClick={() => setActiveSection(index)}
          >
            {section.title}
          </button>
        ))}
      </div>

      <div className="concept-content">
        <div className="section-content">
          <h2>{concept.sections[activeSection].title}</h2>
          <div 
            dangerouslySetInnerHTML={{ __html: concept.sections[activeSection].content }} 
          />
        </div>

        <div className="examples-section">
          <h3>Examples</h3>
          <div className="examples-list">
            {concept.examples.map((example, index) => (
              <div key={index} className="example-item">
                <div className="example-problem">{example.problem} = {example.solution}</div>
                <div className="example-explanation">{example.explanation}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="practice-section">
          <h3>Practice Problems</h3>
          <div className="practice-list">
            {concept.practice.map((problem, index) => (
              <div key={index} className="practice-item">
                <div className="practice-problem">{problem.problem} = </div>
                <input
                  type="text"
                  className={`practice-input ${
                    showAnswers 
                      ? userAnswers[index] === problem.solution
                        ? 'correct'
                        : 'incorrect'
                      : ''
                  }`}
                  value={userAnswers[index] || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  disabled={showAnswers}
                />
                {showAnswers && (
                  <div className="answer-feedback">
                    {userAnswers[index] === problem.solution 
                      ? '✓' 
                      : `✗ Correct answer: ${problem.solution}`}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="practice-actions">
            {!showAnswers ? (
              <button onClick={checkAnswers} className="btn btn-primary">
                Check Answers
              </button>
            ) : (
              <button onClick={tryAgain} className="btn btn-secondary">
                Try Again
              </button>
            )}
          </div>
        </div>

        {concept.relatedConcepts && concept.relatedConcepts.length > 0 && (
          <div className="related-concepts">
            <h3>Related Concepts</h3>
            <div className="related-list">
              {concept.relatedConcepts.map((relatedId, index) => (
                <button
                  key={index}
                  onClick={() => navigate(`/learning/${relatedId}`)}
                  className="related-concept-btn"
                >
                  {relatedId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 