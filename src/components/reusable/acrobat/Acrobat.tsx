import { useGetTokenMutation } from '../../../state/apis/acrobatApi';

const Acrobat = () => {
  const [getToken] = useGetTokenMutation();
  return (
    <div className="main home-chef">
      <h2>Sign this Document</h2>
      <button onClick={() => getToken()}>Test</button>
    </div>
  );
};

export default Acrobat;
