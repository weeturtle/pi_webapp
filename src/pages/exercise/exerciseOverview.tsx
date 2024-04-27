import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faClock, faDumbbell, faPersonWalking, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';
import './exerciseOverview.scss';

const ExerciseOverview = () => {
  return (
    <>
      <div className="box fitness">
        <div className="exerdashcont">
          <h1>Weekly Fitness Overview</h1>
          <div className="line"></div>
          <div className="fitnesspart">
            <div className="Caloriesburnt">
              <div className="header">
                <h2>Calories Burnt:</h2>
              </div>
              <div className="boldvalue">
                <FontAwesomeIcon icon={faFire} />
                <p className="actualvalue">800</p>
                <p className="calslabel">cals</p>
              </div>
              <div className="change">
                <p>Up 5% from last week!</p>
                <FontAwesomeIcon icon={faArrowTrendUp} />
              </div>
            </div>
            <div className="Activetime">
              <div className="header">
                <h2>Total Activity Time:</h2>
              </div>
              <div className="boldvalue">
                <FontAwesomeIcon icon={faClock} />
                <p className="actualvalue">56</p>
                <p className="minslabel">mins</p>
              </div>
              <div className="change">
                <p>Down 12% from last week!</p>
                <FontAwesomeIcon icon={faArrowTrendDown} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box exercise">
        <div className="exerdashcont">
          <h1>Weekly Exercise Overview</h1>
          <div className="line"></div>
          <div className="exercisepart">
            <div className="Exercisescompleted">
              <div className="header">
                <h2>Workouts logged:</h2>
              </div>
              <div className="boldvalue">
                <FontAwesomeIcon icon={faDumbbell} />
                <p className="actualvalue">2</p>
                <p className="excomplabel">workouts</p>
              </div>
              <div className="change">
                <p>Down 7% from last week!</p>
                <FontAwesomeIcon icon={faArrowTrendDown} />
              </div>
            </div>
            <div className="Exerciserating">
              <div className="header">
                <h2>Exercise Diversity:</h2>
              </div>
              <div className="boldvalue">
                <FontAwesomeIcon icon={faPersonWalking} />
                <p className="actualvalue">8</p>
                <p className="divlabel">exercises</p>
              </div>
              <div className="change">
                <p>Up 50% from last week!</p>
                <FontAwesomeIcon icon={faArrowTrendUp} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExerciseOverview;