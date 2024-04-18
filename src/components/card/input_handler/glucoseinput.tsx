import { useState } from 'react';
import './inputhandler.scss';
import { useAuth } from '../../../auth/AuthProvider';
import { BASE_URL } from '../../../vars';

const GlucoseInputs = () => {
  const [description, setDescription] = useState<string>();
  const [level, setLevel] = useState<number>(0.0);
  const [datetime, setDatetime] = useState<Date>(new Date());

  const { user } = useAuth();

  const handle_submit = async () => {
    // TODO! Check if all fields are filled
    // Cannot be negative values!
    // Cannot be invalid value type 
    // Cannot be 

    if (!entryvalidation){
      console.log('Validation not passed');
      return;
    }


    if (await send_data()) {
      clear_fields();
    }

    // TODO! Show feedback
  };

  const clear_fields = () => {
    setDescription('');
    setDatetime(new Date());
    setLevel(0);
  };


  //Validatyion stuff need to add API maybe to double check --> Neev said they would do backend so only do basics for now
  const entryvalidation = () => {
    const now = new Date();
    const nextYear = new Date(now.setFullYear(now.getFullYear() + 1));
    const prevYear = new Date(now.setFullYear(now.getFullYear() - 1));
    //description --> shioukld be called food name instead 
    if (!description || level <= 0 || !datetime) {
      alert('Please fill in all fields correctly.');
      return false;
    }

    //glucose checking
    if (level < 0) {
      alert('Negative values are not allowed.');
      return false;
    }

    //datetime checker 
    if (datetime > nextYear || datetime < prevYear) {
      alert('Date and time not valid');
      return false;
    }
  };

  const send_data = async () => {
    const data = {
      'description': description,
      'dateTime': datetime,
      'glucoseLevel': level,
      'username': user
    };

    const response = await fetch(`${BASE_URL}/glucose`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Reading added');
      return true;
    } else {
      console.log('Failed to add reading');
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
            value={level ? level : ''}
            type='number'
            onChange={(e) => setLevel(e.target.value as unknown as number)}
          />
          <label className={has_value(level) ? 'valid' : ''}>Level</label>
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
        Add Reading
      </button>
    </div>
  );
};

export default GlucoseInputs;