import { Suspense, ReactElement } from 'react';
import Loading from './Loading';

const renderWithFallback = (el: ReactElement) => {
  return <Suspense fallback={<Loading />}>{el}</Suspense>;
};

export default renderWithFallback;
