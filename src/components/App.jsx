import React from 'react';
import styles from './App.scss';

const CURRENT_DATE = 4540000000;
const END_DATE = CURRENT_DATE + 5000000000;

export class App extends React.Component {
  render() {
    const progress = (END_DATE / CURRENT_DATE) * 100;
    return (
      <div className={styles.app}>
        <div className={styles.app__lineContainer}>
          <div className={styles.app__line} />
          <div className={styles.app__lineProgress} style={{ width: progress }} />
        </div>
        <div className={styles.app__textContainer}>
          <div className={styles.app__textStart}>Earth's Beginning</div>
          <div className={styles.app__textCurrent} style={{ left: progress }}>Current Time</div>
          <div className={styles.app__textEnd}>Earth's End</div>
        </div>
      </div>
    )
  }
}
