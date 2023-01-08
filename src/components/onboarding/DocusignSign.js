import { useEffect } from 'react';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';
import { connect } from 'react-redux';

import server from '../../actions/api';

const Docusign = ({ restaurant }) => {
  useEffect(() => {
    const getRedirectUrl = async () => {
      const authCode = window.location.search.replace('?code=', '');
      const res = await server.post('/docusign/sign', {
        authCode,
        restaurantId: restaurant.id,
      });
      const redirectUrl = res.data;
      window.location.href = redirectUrl;
    };
    getRedirectUrl();
  }, [restaurant.id]);

  return (
    <div>
      <Spinner size={20} color="black" />
      <p>Generating contracts...</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { restaurant: state.restaurant.restaurant };
};

export default connect(mapStateToProps)(Docusign);
