interface IconProps {
  className?: string;
}

export const HomeIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={`stroke-current ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 11L12 3L21 11"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 10.5V20H10.5V15.5H13.5V20H19V10.5"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HistoryIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={`stroke-current ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.5 12H12L15.5 15.5"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 10.8794 5.27527 9.82119 5.76807 8.89435"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 8.5L6.5 8"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const InfoIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={`stroke-current ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
    <path d="M12 11V16" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 8H12.01" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const RefreshIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={`stroke-current ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.1829 3 17.9353 4.66277 19.5 7"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 5V7H19"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PlusIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={`stroke-current ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 5V19" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M5 12H19" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const ClearIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={`stroke-current ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 6L18 18"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 6L6 18"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CopyIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={`stroke-current ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="9" y="9" width="12" height="12" rx="2" strokeWidth="1.8" />
    <path
      d="M5 15V5H15"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={`stroke-current ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


