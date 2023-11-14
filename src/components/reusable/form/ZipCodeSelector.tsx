import { useState } from 'react';

const ZipCodeSelector = ({
  zips,
  setZips,
}: {
  zips: Record<string, string>;
  setZips: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  const [zipCode, setZipCode] = useState('');
  const [amount, setAmount] = useState('0');
  const zipCodeOptions = [
    '94501',
    '94502',
    '94536',
    '94537',
    '94538',
    '94539',
    '94540',
    '94541',
    '94542',
    '94543',
    '94544',
    '94545',
    '94546',
    '94550',
    '94551',
    '94552',
    '94555',
    '94557',
    '94560',
    '94566',
    '94568',
    '94577',
    '94578',
    '94579',
    '94580',
    '94586',
    '94587',
    '94588',
    '94601',
    '94602',
    '94603',
    '94604',
    '94605',
    '94606',
    '94607',
    '94608',
    '94609',
    '94610',
    '94611',
    '94612',
    '94613',
    '94614',
    '94615',
    '94616',
    '94617',
    '94618',
    '94619',
    '94620',
    '94621',
    '94623',
    '94624',
    '94661',
    '94662',
    '94701',
    '94702',
    '94703',
    '94704',
    '94705',
    '94706',
    '94707',
    '94708',
    '94709',
    '94710',
    '94712',
    'Decline to State',
    'Unhoused',
    'Other',
  ];

  const setValues = () => {
    if (zipCode) {
      setZips({ ...zips, [zipCode]: amount });
    }
  };

  return (
    <div>
      <select
        value={zipCode}
        onChange={(e) => {
          setZipCode(e.target.value);
          setValues();
        }}
      >
        <option value={undefined}></option>
        {zipCodeOptions.map((z) => {
          return (
            <option
              disabled={Object.keys(zips).includes(z.replace(/ /g, ''))}
              value={z.replace(/ /g, '')}
              key={z}
            >
              {z}
            </option>
          );
        })}
      </select>
      <input
        type="number"
        onChange={(e) => {
          setAmount(e.target.value);
          setValues();
        }}
      />
    </div>
  );
};

export default ZipCodeSelector;
