import { useState } from 'react';
import './inputhandler.scss';
import { useAuth } from '../../../auth/AuthProvider';
import { BASE_URL } from '../../../vars';

const NutritionInputs = () => {
  const [description, setDescription] = useState<string>();
  const [calories, setCalories] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [datetime, setDatetime] = useState<Date>(new Date());

  const { user } = useAuth();

  const handle_submit = async () => {
    // TODO! Check if all fields are filled

    if (!entryvalidation){
      console.log('Validation level');
      return;
    }

    if (await send_data()) {
      clear_fields();
    }

    // TODO! Show feedback
  };

  const clear_fields = () => {
    setDescription('');
    setCalories(0);
    setDatetime(new Date());
    setQuantity(0);
  };


  //Validatyion stuff need to add API maybe to double check --> Neev said they would do backend so only do basics for now
  const entryvalidation = () => {
    const now = new Date();
    const nextYear = new Date(now.setFullYear(now.getFullYear() + 1));
    const prevYear = new Date(now.setFullYear(now.getFullYear() - 1));
    //description --> shioukld be called food name instead 
    if (!description || calories <= 0 || quantity <= 0 || !datetime) {
      alert('Please fill in all fields correctly.');
      return false;
    }

    //duration && calories checking
    if (quantity < 0 || calories < 0) {
      alert('Negative values are not allowed.');
      return false;
    }

    //reasonable calorie count
    if (calories > 9999) {
      alert('Calorie count unreasonable');
      return false;
    }

    //datetime checker 
    if (datetime > nextYear || datetime < prevYear) {
      alert('Date and time not valid');
      return false;
    }

    return true;
  };


  const send_data = async () => {
    const data = {
      'foodName': description,
      'calories': calories,
      'quantity': quantity,
      'dateTime': datetime,
      'username': user
    };

    const response = await fetch(`${BASE_URL}/nutrition`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Meal added');
      return true;
    } else {
      console.log('Failed to add meal');
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
            value={calories ? calories : ''}
            type='number'
            onChange={(e) => setCalories(e.target.value as unknown as number)}
          />
          <label className={has_value(calories) ? 'valid' : ''}>Calories</label>
        </div>
        <div className='input_box'>
          <input
            value={quantity ? quantity : ''}
            type='number'
            onChange={(e) => setQuantity(e.target.value as unknown as number)}
          />
          <label className={has_value(quantity) ? 'valid' : ''}>Quantity</label>
        </div>
        <div className='input_box'>
          <input
            value={datetime.toISOString().slice(0, 16)}
            type='datetime-local'
            onChange={(e) => setDatetime(new Date(e.target.value))}
          />
          <label className={has_value(datetime) ? 'valid' : ''}>Date and Time</label>
        </div>
      </div>

      <button className='submit' onClick={handle_submit}>
        Add Meal
      </button>
    </div>
  );
};

export default NutritionInputs;