import React from "react";

export const isFragment = (child: any): boolean =>
  child && React.isValidElement(child) && child.type === React.Fragment