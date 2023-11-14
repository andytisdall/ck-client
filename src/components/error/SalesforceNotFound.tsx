const SalesforceNotFound = () => {
  return (
    <div className="main error-page">
      <div className="unauthorized-text">
        There was a problem finding your information. Please email{' '}
        <a href="mailto:andy@ckoakland.org">andy@ckoakland.org</a> to restore
        your access to the CK portal.
      </div>
    </div>
  );
};

export default SalesforceNotFound;
