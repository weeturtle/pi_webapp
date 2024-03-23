import { useState } from 'react';
import './inputhandler.scss';

const GlucoseInputs = () => {
  const [description, setDescription] = useState<string>();
  const [level, setLevel] = useState<number>();
  const [datetime, setDatetime] = useState<Date>(new Date());

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
          <label className={has_value(level) ? 'valid' : ''}>Calories</label>
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

      <button className='submit'>
        Add Reading
      </button>
    </div>
  );
};

export default GlucoseInputs;