import React, {DetailedHTMLFactory, HTMLAttributes} from "react";

export function View(props: HTMLAttributes<HTMLDivElement>) {
  return React.createElement("div", props)
}
