```
import React from "react";
import parse, { domToReact } from "html-react-parser";

function sliceHtml(html, maxLength) {
  let charCount = 0;
  let slicedHtml = "";

  function traverse(node) {
    if (charCount >= maxLength) return;

    if (typeof node === "string") {
      // Handle text content
      const remaining = maxLength - charCount;
      const visibleText = node.slice(0, remaining);
      charCount += visibleText.length;
      slicedHtml += visibleText;
    } else if (node && typeof node === "object" && node.type === "tag") {
      // Open the tag
      slicedHtml += `<${node.name}${Object.entries(node.attribs || {})
        .map(([key, value]) => ` ${key}="${value}"`)
        .join("")}>`;

      // Process child nodes recursively
      if (node.children && Array.isArray(node.children)) {
        for (const child of node.children) {
          traverse(child);
          if (charCount >= maxLength) break; // Stop when maxLength is reached
        }
      }

      // Close the tag
      slicedHtml += `</${node.name}>`;
    }
  }

  // Parse the HTML into a tree structure
  const htmlTree = parse(html, { replace: domToReact });

  if (Array.isArray(htmlTree)) {
    // Handle multiple root nodes
    htmlTree.forEach(traverse);
  } else {
    // Handle a single root node
    traverse(htmlTree);
  }

  return slicedHtml;
}

// Example usage
const htmlInput = "<p>This is <strong>bold</strong> and <em>italic</em> text.</p>";
const maxLength = 10;

const resultHtml = sliceHtml(htmlInput, maxLength);
console.log(resultHtml); // Expected: "<p>This is <strong>bo</strong></p>"

function App() {
  return <div>{parse(resultHtml)}</div>;
}

export default App;
