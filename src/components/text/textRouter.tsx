import { lazy } from 'react';

import renderWithFallback from '../reusable/loading/renderWithFallback';
import './TextHome.css';

// const Phone = lazy(() => import('./phone/Phone'));
const TextHome = lazy(() => import('./TextHome'));
const SendText = lazy(() => import('./sendText/SendText'));
const TextSuccess = lazy(() => import('./sendText/TextSuccess'));
const Feedback = lazy(() => import('./feedback/Feedback'));
const CustomText = lazy(() => import('./customText/CustomText'));
// const ScheduledText = lazy(() => import('./recurring/ScheduledText'));
// const TextRecords = lazy(() => import('./textRecords/TextRecords'));
// const RecurringConsole = lazy(() => import('./recurring/RecurringConsole'));
const TextBase = lazy(() => import('./TextBase'));

const textRouter = {
  path: 'text',
  element: renderWithFallback(<TextBase />),
  children: [
    { index: true, element: renderWithFallback(<TextHome />) },
    // {
    //   path: 'phone',
    //   element: renderWithFallback(<Phone />),
    // },
    { path: 'send-text', element: renderWithFallback(<SendText />) },
    { path: 'send-custom-text', element: renderWithFallback(<CustomText />) },
    // {
    //   path: 'send-scheduled-text',
    //   element: renderWithFallback(<ScheduledText />),
    // },
    { path: 'text-success', element: renderWithFallback(<TextSuccess />) },
    { path: 'feedback', element: renderWithFallback(<Feedback />) },
    // { path: 'text-records', element: renderWithFallback(<TextRecords />) },
    // { path: 'recurring', element: renderWithFallback(<RecurringConsole />) },
  ],
};

export default textRouter;
