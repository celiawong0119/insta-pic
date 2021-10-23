import { FC, useState, useRef, useEffect } from 'react';
import './Truncate.scss';

const Truncate: FC<{ id: number; author: string; text: string }> = ({ id, author, text }) => {
  const [pClass, setPClass] = useState('');
  const pRef = useRef<HTMLParagraphElement>(null);
  const uniqueTruncateId = `truncate-expanded-${id}`;

  useEffect(() => {
    if (pRef.current) {
      setPClass(pRef.current.scrollHeight > pRef.current.clientHeight ? 'truncated' : '');
    }
  }, []);

  return (
    <div className='truncateContainer'>
      <input type='checkbox' id={uniqueTruncateId} />
      <p ref={pRef} className={pClass}>
        <span className='author'>{author}</span>
        {text}
      </p>
      <label htmlFor={uniqueTruncateId} role='button'>
        more
      </label>
    </div>
  );
};

export default Truncate;
