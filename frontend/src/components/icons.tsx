interface IconProps {
  className?: string;
}

export const HomeIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={`fill-current ${className}`}
    viewBox="0 0 16 18"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 15.5V6.5C0 6.18333 0.0709998 5.88333 0.213 5.6C0.355 5.31667 0.550667 5.08333 0.8 4.9L6.8 0.4C7.15 0.133333 7.55 0 8 0C8.45 0 8.85 0.133333 9.2 0.4L15.2 4.9C15.45 5.08333 15.646 5.31667 15.788 5.6C15.93 5.88333 16.0007 6.18333 16 6.5V15.5C16 16.05 15.804 16.521 15.412 16.913C15.02 17.305 14.5493 17.5007 14 17.5H11C10.7167 17.5 10.4793 17.404 10.288 17.212C10.0967 17.02 10.0007 16.7827 10 16.5V11.5C10 11.2167 9.904 10.9793 9.712 10.788C9.52 10.5967 9.28267 10.5007 9 10.5H7C6.71667 10.5 6.47933 10.596 6.288 10.788C6.09667 10.98 6.00067 11.2173 6 11.5V16.5C6 16.7833 5.904 17.021 5.712 17.213C5.52 17.405 5.28267 17.5007 5 17.5H2C1.45 17.5 0.979333 17.3043 0.588 16.913C0.196666 16.5217 0.000666667 16.0507 0 15.5Z"
    />
  </svg>
);

export const HistoryIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg
    className={`fill-current ${className}`}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 18a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 18z"
      clipRule="evenodd"
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


