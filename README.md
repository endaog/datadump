import React from "react";
import parse from "html-react-parser";
import { domToReact } from "html-react-parser";

function sliceHtml(html, maxLength) {
  const stack = [];
  let charCount = 0;
  let slicedHtml = "";

  function traverse(nodes) {
    for (const node of nodes) {
      if (typeof node === "string") {
        const remaining = maxLength - charCount;
        if (remaining <= 0) break;

        const visibleText = node.slice(0, remaining);
        charCount += visibleText.length;
        slicedHtml += visibleText;

        if (charCount >= maxLength) break;
      } else if (node.type === "tag") {
        stack.push(`<${node.name}${Object.entries(node.attribs)
          .map(([key, value]) => ` ${key}="${value}"`)
          .join("")}>`);
        traverse(node.children);
        stack.push(`</${node.name}>`);
      }

      if (charCount >= maxLength) break;
    }
  }
