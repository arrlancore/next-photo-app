import React from "react";

export const renderIf = (state: boolean) => (node: React.ReactNode) =>
  state ? node : null;
