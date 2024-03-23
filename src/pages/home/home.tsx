import { ExerciseCard, NutritionCard, GlucoseCard } from '../../components/card';
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