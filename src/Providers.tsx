// app/providers.tsx

import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Providers({ children }: Props) {
  return (
    <HeroUIProvider>
      <ToastProvider
        toastProps={{
          timeout: 3000,
        }}
      />
      {children}
    </HeroUIProvider>
  );
}
