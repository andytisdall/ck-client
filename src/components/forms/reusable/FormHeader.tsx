import { PropsWithChildren } from 'react';

const FormHeader = ({
  img,
  title,
  children, spanish
}: { title: string; img?: string, spanish?: boolean } & PropsWithChildren) => {
  return (
    <div className="form-item">
      {!!img && <img src={img} alt="Form" className="form-img" />}
      <h1>{title}</h1>
      <div className="form-content">{children}</div>
      <p className="required">{spanish ? '* Indica pregunta requerida' : '* Indicates required question'}</p>
    </div>
  );
};

export default FormHeader;
