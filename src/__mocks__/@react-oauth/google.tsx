import { PropsWithChildren } from 'react';

export const GoogleLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess: ({ credential }: { credential: string }) => void;
  onError: () => void;
}) => {
  return <></>;
};

export const GoogleOAuthProvider = ({
  clientId,
  children,
}: { clientId: string } & PropsWithChildren) => {
  return <>{children}</>;
};
