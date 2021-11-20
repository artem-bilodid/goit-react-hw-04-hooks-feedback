import { useState } from 'react';
import styles from './app.module.scss';
import Section from '../section';
import Statistics from '../statistics';
import Notification from '../notification';
import FeedbackOptions from '../feedback-options';

const FEEDBACK_TYPE = {
  GOOD: 'good',
  NEUTRAL: 'neutral',
  BAD: 'bad',
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = event => {
    const { name } = event.target;

    switch (name) {
      case FEEDBACK_TYPE.GOOD:
        return setGood(prev => prev + 1);
      case FEEDBACK_TYPE.NEUTRAL:
        return setNeutral(prev => prev + 1);
      case FEEDBACK_TYPE.BAD:
        return setBad(prev => prev + 1);
      default:
        throw new Error(`Unsupported feedback type: ${name}`);
    }
  };

  const total = good + neutral + bad;
  const positivePercentage = Math.round((100 * good) / total, 0);

  return (
    <div className={styles.app}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={{ good, neutral, bad }} onLeaveFeedback={handleFeedback} />
      </Section>
      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Section>
    </div>
  );
};

export default App;
