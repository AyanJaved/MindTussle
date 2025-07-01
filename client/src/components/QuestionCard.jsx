import '../styles/QuestionCard.css'
const QuestionCard = ({ question, onAnswer }) => {
  return (
    <div className="question-card">
      <h2 className="question-text">{question.question}</h2>
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="option-button"
            onClick={() => onAnswer(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
