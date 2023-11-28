import NextLink from "next/link";

interface Props {
  href: string;
  children: any;
}

export default function Link({ href, children }: Props) {
  const isExternal = href.startsWith("http");
  const CustomTag = isExternal ? "a" : NextLink;
  return (
    <CustomTag
      href={href}
      rel={isExternal ? "external" : undefined}
      className="underline underline-offset-2 text-f-med hover:text-f-high"
    >
      {children}
    </CustomTag>
  );
}
