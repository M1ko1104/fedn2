import React from "react";

export default function FullWidthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full bg-gray-50">
      {children}
    </div>
  );
}