import { PropsWithChildren, useState } from 'react';

const Chart = ({ children, title }: PropsWithChildren & { title: string }) => {
  const [show, setShow] = useState(false);

  const openStyle = show ? 'cbo-report-open' : '';

  const arrow = show ? <span>&darr;</span> : <span>&rarr;</span>;

  return (
    <div className={`cbo-report ${openStyle}`}>
      <h2 className="cbo-report-title" onClick={() => setShow(!show)}>
        {arrow} {title}
      </h2>
      {show && <div className="cbo-dataset">{children}</div>}
    </div>
  );
};

export default Chart;
