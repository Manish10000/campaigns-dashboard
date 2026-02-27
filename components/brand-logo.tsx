import Image from 'next/image';

interface BrandLogoProps {
  className?: string;
  priority?: boolean;
}

export function BrandLogo({ className = '', priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/FORKOFF.svg"
      alt="FORKOFF"
      width={180}
      height={42}
      priority={priority}
      className={`w-auto h-10 sm:h-12 ${className}`}
    />
  );
}
