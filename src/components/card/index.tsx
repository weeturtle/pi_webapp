import './cardstyle.scss';
import ExerciseInputs from './input_handler/exerciseinput';
import GlucoseInputs from './input_handler/glucoseinput';
import NutritionInputs from './input_handler/nutritioninput';
import Visual from './visual/visual';

export const ExerciseCard = () => {

  return (
    <div className='card_container'>
      <h2 className='card_title'>Exercise</h2>
      <Visual />
      <ExerciseInputs />
      
    </div>
  );
};

export const NutritionCard = () => {

  return (
    <div className='card_container'>
      <h2 className='card_title'>Nutrition</h2>
      <Visual />
      <NutritionInputs />
    </div>
  );
};

export const GlucoseCard = () => {

  return (
    <div className='card_container'>
      <h2 className='card_title'>Glucose</h2>
      <Visual />
      <GlucoseInputs />
    </div>
  );
};
