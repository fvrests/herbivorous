import { RadioGroup } from "@headlessui/react";

interface Props {
  children?: any;
  value?: any;
}
export default function RadioGroupOption({ children, value }: Props) {
  return (
    <RadioGroup.Option
      className={({ checked }) =>
        `${
          checked ? "border-f-low text-f-med" : "border-border text-f-low"
        } [&_*]:cursor-pointer cursor-pointer first:rounded-l-lg last:rounded-r-lg text-xs font-bold hover:text-f-high h-8 px-2 shadow-md focus:outline-none border-2 hover:border-f-med focus-visible:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-300 flex items-center justify-center`
      }
      value={value}
    >
      <div>{children}</div>
    </RadioGroup.Option>
  );
}
