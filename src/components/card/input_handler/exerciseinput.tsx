import { useState } from 'react';
import './inputhandler.scss';
import { useAuth } from '../../../auth/AuthProvider';
import { BASE_URL } from '../../../vars';
import { useToast } from '../../toast/toast';

const SPORTS = [
  'Running',
  'Cycling',
  'Swimming',
  'Weightlifting',
  'Yoga',
  'Pilates',
  'Dance',
  'Martial Arts',
  'Other',
];

const ExerciseInputs = () => {
  const [description, setDescription] = useState<string>();
  const [duration, setDuration] = useState<number>(0);
  const [calories, setCalories] = useState<number>(0);
  const [datetime, setDatetime] = useState<Date>(new Date());
  const [sport, setSport] = useState<string>();

  const { user } = useAuth();
  
  const { addToast } = useToast();

  const handle_submit = async () => {
    // TODO! Check if all fields are filled
    if (!entryvalidation()) {
      return;
    }

    if (await send_data()) {
      clear_fields();
      addToast('success', 'Exercise added successfully!');
    } else {
      addToast('error', 'Failed to add exercise.');
    }
  };

  //Validatyion stuff need to add API maybe to double check --> Neev said they would do backend so only do basics for now
  const entryvalidation = () => {
    // const now = new Date();
    // const nextYear = new Date(now.setFullYear(now.getFullYear() + 1));
    // const prevYear = new Date(now.setFullYear(now.getFullYear() - 1));
    //description --> shioukld be called food name instead 
    if (!description || duration <= 0 || calories <= 0 || !datetime || !sport || sport === '') {
      addToast('warning', 'Please fill in all fields correctly.');
      return false;
    } 

    //duration && calories checking
    if (duration < 0 || calories < 0) {
      addToast('warning', 'Negative values are not allowed.');
      return false;
    }

    //reasonable calorie count
    if (calories > 9999 || calories < 1) {
      addToast('warning', 'Calorie count unreasonable.');
      return false;
    }

    // //datetime checker 
    // if (datetime > nextYear || datetime < prevYear) {
    //   addToast('warning', 'Date and time not valid.');
    //   return false;
    // }
    //if no sport sleected from dropdown 
    if (!SPORTS.includes(sport)) {
      addToast('warning', 'No sport selected.');
      return false;
    }

    return true;
  };

  const clear_fields = () => {
    setDescription('');
    setDuration(0);
    setCalories(0);
    setDatetime(new Date());
    setSport('');
  };

  const send_data = async () => {
    const data = {
      'exerciseName': description,
      'duration': duration,
      'caloriesBurnt': calories,
      'dateTime': datetime,
      'exerciseType': sport,
      'username': user
    };

    const response = await fetch(`${BASE_URL}/exercise`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Exercise added');
      return true;
    } else {
      console.log('Failed to add exercise');
      return false;
    }
  };

  const has_value = (value: unknown) => {
    return value !== null && value !== undefined && value !== '' && value !== 0;
  };

  return (
    <div className="outer_container">
      <div className='input_container'>
        <div className='input_box description_box'>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            pattern=''
          />
          <label className={has_value(description) ? 'valid' : ''}>Description</label>
        </div>
        <div className='input_box'>
          <input
            value={duration ? duration : ''}
            type='number'
            onChange={(e) => setDuration(e.target.value as unknown as number)}
          />
          <label className={has_value(duration) ? 'valid' : ''}>Duration</label>
        </div>
        <div className='input_box'>
          <input
            value={calories ? calories : ''}
            type='number'
            onChange={(e) => setCalories(e.target.value as unknown as number)}
          />
          <label className={has_value(calories) ? 'valid' : ''}>Calories</label>
        </div>

        <div className='input_box'>
          <input
            value={datetime.toISOString().slice(0, 16)}
            type='datetime-local'
            onChange={(e) => setDatetime(new Date(e.target.value))}
          />
          <label className={has_value(datetime) ? 'valid' : ''}>Date and Time</label>
        </div>

        <div className='input_box'>
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          >
            <option value=''>Select Sport</option>
            {SPORTS.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className='submit' onClick={handle_submit}>
            Add Exercise
      </button>
    </div>
  );
};

export default ExerciseInputs;