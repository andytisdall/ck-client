import { PropsWithChildren } from 'react';

const FormHeader = ({
  img,
  title,
  children,
}: { title: string; img?: string } & PropsWithChildren) => {
  return (
    <div className="form-item">
      {!!img && <img src={img} alt="Form" className="form-img" />}
      <h1>{title}</h1>
      <div className="form-content">{children}</div>
      <p className="required">* Indicates required question</p>
    </div>
  );
};

export default FormHeader;
