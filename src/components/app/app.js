import React, { Component } from 'react';
import styles from './app.module.scss';
import Section from '../section';
import Statistics from '../statistics';
import Notification from '../notification';
import FeedbackOptions from '../feedback-options';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleFeedback = event => {
    const { name } = event.target;

    this.setState(prevState => ({
      [name]: ++prevState[name],
    }));
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = good + neutral + bad;
    const positivePercentage = Math.round((100 * good) / total, 0);

    return (
      <div className={styles.app}>
        <Section title="Please leave feedback">
          <FeedbackOptions options={{ good, neutral, bad }} onLeaveFeedback={this.handleFeedback} />
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
  }
}

export default App;
