import { useEffect, useState } from "react";
import { marked } from "marked";

const MARKDOWN_TEXT =
  "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, '`<div></div>`', between 2 backticks.\n\n'```'\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n'```'\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)";

marked.setOptions({ breaks: true });

function App() {
  const [markdown, setMarkdown] = useState(
    localStorage.getItem("markdown") || MARKDOWN_TEXT
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const switchTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-color-mode", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("markdown", markdown);
  }, [markdown]);

  return (
    <>
      <div className="top-bar">
        <h1>Markdown Previewer</h1>
        <div className="toggle" onClick={switchTheme}></div>
      </div>
      <div className="container">
        <div className="editor">
          <textarea
            id="editor"
            name="markdown"
            onChange={(e) => setMarkdown(e.target.value)}
            value={markdown}
          ></textarea>
        </div>
        <div
          id="preview"
          className="preview"
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        ></div>
      </div>
    </>
  );
}

export default App;
