const ShiftInfoField = ({
  label,
  value,
  notes,
}: {
  label: string;
  value?: string;
  notes?: string;
}) => {
  return (
    <div className="volunteers-shift-detail-field">
      <div className="volunteers-shift-detail-field-title">{label}:</div>
      <div>
        {value}
        {!!notes && (
          <div className="volunteers-shift-detail-field-notes">{notes}</div>
        )}
      </div>
    </div>
  );
};

export default ShiftInfoField;
