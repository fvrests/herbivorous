import NextLink from "next/link";

interface Props {
  href: string;
  underline?: boolean;
  classes?: string;
  children: React.ReactNode;
}

export default function Link({
  href,
  underline = true,
  classes,
  children,
}: Props) {
  const isExternal = href.startsWith("http");
  const CustomTag = isExternal ? "a" : NextLink;
  return (
    <CustomTag
      href={href}
      rel={isExternal ? "external" : undefined}
      className={`${classes} ${
        underline ? "underline decoration-wavy" : null
      } text-f-med hover:text-f-high`}
    >
      {children}
    </CustomTag>
  );
}
