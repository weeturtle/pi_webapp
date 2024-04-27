import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import './calorieIntake.scss';

const CalorieIntake = () => {
  return (
    <div className="box calorie-intake">
      <h1>This Week's Calorie Intake</h1>
      <div className="line"></div>
      <div className="atefoodpart">
        <div className="Caloriesate">
          <div className="header">
            <h2>Calories Consumed:</h2>
          </div>
          <div className="boldvalue">
            <FontAwesomeIcon icon={faBowlFood} />
            <p className="actualvalue">576</p>
            <p className="atecalslabel">calories</p>
          </div>
          <div className="change">
            <p>Up 10% from last week!</p>
            <FontAwesomeIcon icon={faArrowTrendUp} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieIntake;