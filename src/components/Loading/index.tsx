import { useEffect, useState } from 'react';
import { LoadingProps } from './type';

import './style.css';

const TICK_RATE = 500;

const Loading = ({ isCenter }: LoadingProps) => {
  const [dots, setDots] = useState(0);

  const onTick = () => {
    setDots((prevDots) => {
      return (prevDots + 1) % 4
    });
  };

  useEffect(() => {
    const interval = setInterval(onTick, TICK_RATE);

    return () => {
      clearInterval(interval);
    }
  }, []);

  const classNames = ['Loading'];

  if (isCenter) {
    classNames.push('Loading_center');
  }

  return (
    <div className={classNames.join(' ')}>
      <small>
        Loading {new Array(dots).fill(0).map(dot => '.')}
      </small>
    </div>
  );
}

export default Loading;
