import { Suspense } from 'react';
import Loading from './Loading';

const renderWithFallback = (el) => {
  return <Suspense fallback={<Loading />}>{el}</Suspense>;
};

export default renderWithFallback;
