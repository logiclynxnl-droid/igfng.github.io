import React from "react";

type Props = {
  url: string;
  height?: number;
  className?: string;
};

export function TallyEmbed({ url, height = 800, className }: Props) {
  const src = `${url}?transparentBackground=1&hideTitle=1&alignLeft=1`;
  return (
    <div className={className}>
      <iframe
        src={src}
        width="100%"
        height={height}
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        title="Form"
        style={{ border: 0, background: "transparent" }}
        allow="clipboard-write; fullscreen; geolocation; microphone; camera"
      />
    </div>
  );
}
