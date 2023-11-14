interface Props {
  size?: number;
}

export default function ChevronDown({ size = 24 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="feather feather-check"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
