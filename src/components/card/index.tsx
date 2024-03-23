import './cardstyle.scss';
import Visual from './visual/visual';

export const ExerciseCard = () => {

  return (
    <div className='card_container'>
      <h2 className='card_title'>Exercise</h2>
      <Visual />
    </div>
  );
};

export const NutritionCard = () => {

  return (
    <div className='card_container'>
      <h2 className='card_title'>Nutrition</h2>
    </div>
  );
};

export const GlucoseCard = () => {

  return (
    <div className='card_container'>
      <h2 className='card_title'>Glucose</h2>
    </div>
  );
};
