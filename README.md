```
import React from "react";
import parse from "html-react-parser";
import { domToReact } from "html-react-parser";

function sliceHtml(html, maxLength) {
  let charCount = 0;
  let slicedHtml = "";

  function traverse(node) {
    if (charCount >= maxLength) return;

    if (typeof node === "string") {
      // Slice the visible text and add to the result
      const remaining = maxLength - charCount;
      const visibleText = node.slice(0, remaining);
      charCount += visibleText.length;
      slicedHtml += visibleText;
    } else if (node && typeof node === "object" && node.type === "tag") {
      // Open the tag
      slicedHtml += `<${node.name}${Object.entries(node.attribs || {})
        .map(([key, value]) => ` ${key}="${value}"`)
        .join("")}>`;

      // Traverse its children
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(traverse);
      }

      // Close the tag
      slicedHtml += `</${node.name}>`;
    }
  }

  const htmlTree = parse(html, { replace: domToReact });
  if (Array.isArray(htmlTree)) {
    htmlTree.forEach(traverse);
  } else {
    traverse(htmlTree);
  }

  return slicedHtml;
}

// Example usage
const htmlInput = "<p>This is <strong>bold</strong> and <em>italic</em> text.</p>";
const maxLength = 10;

const resultHtml = sliceHtml(htmlInput, maxLength);
console.log(resultHtml); // "<p>This is <strong>bo</strong></p>"

function App() {
  return <div>{parse(resultHtml)}</div>;
}

export default App;
