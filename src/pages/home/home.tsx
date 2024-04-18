import { GlucoseCard } from '../../components/card/GlucoseCard';
import { NutritionCard } from '../../components/card/NutritionCard';
import { ExerciseCard } from '../../components/card/ExerciseCard';
import './homestyle.scss';

const Home = () => {
  return (
    <div className='cards_container'>
      <ExerciseCard />
      <NutritionCard />
      <GlucoseCard />
    </div>
  );
};

export default Home;