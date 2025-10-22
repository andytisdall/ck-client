import { PropsWithChildren } from "react";

const SupplyBtn = ({
  onPress,
  children,
  value,
}: {
  onPress: (amount: number) => void;
  value: number;
} & PropsWithChildren) => {
  return (
    <div className="supply-btn">
      {children}
      <div className="supply-btn-controls">
        <div
          className="supply-btn-toggle supply-btn-minus"
          onClick={() => {
            if (value > 0) {
              onPress(-1);
            }
          }}
        >
          -
        </div>
        <div className="supply-btn-value">{value}</div>
        <div
          className="supply-btn-toggle supply-btn-plus"
          onClick={() => onPress(1)}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default SupplyBtn;
