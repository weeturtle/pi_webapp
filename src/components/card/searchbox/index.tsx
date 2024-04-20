import './searchbox.scss';

import { useEffect, useState } from 'react';

interface SearchBoxProps {
  api_url: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBox = ({api_url, text, setText}: SearchBoxProps) => {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${api_url}?q=${text}`);
      const jsoned = await response.json();
      setOptions(jsoned[1]);
    };
    fetchData();
  }, [text, api_url]);

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.currentTarget.value)}/>
      <div className='options'>
        {options.map((option, index) => 
          option !== text && ( 
            <button key={index} onClick={() => setText(option)}>
              {option}
            </button>
          ))}
      </div>
    </div>
  );
};

export default SearchBox;