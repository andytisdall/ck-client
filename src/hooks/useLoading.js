import { useState, useEffect } from 'react';
import { connect } from 'mongoose';

const useLoading = ({ error }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  return [loading, setLoading];
};

const mapStateToProps = (state) => {
  return { error: state.error.error };
};

export default connect(mapStateToProps)(useLoading);
