interface Props {
  children?: any;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button
      className="w-full rounded-lg h-full pl-3 pr-10 text-left shadow-md focus:outline-none border-2 border-b-high focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm relative"
      {...props}
    >
      {children}
    </button>
  );
}
