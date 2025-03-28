import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ code, setCode ] = useState(`function sum() {
  return 1 + 1;
}`)

  const [ review, setReview ] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/ai/get-review`, { code })
    setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={12}
              style={{
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                fontSize: "16px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                height: "100%",
                width: "100%",
                backgroundColor: "#0c0c0c",
                color: "#ffffff",
                lineHeight: "1.6",
                caretColor: "#ffcc00",
                outline: "none"
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">Review</div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[ rehypeHighlight ]}>{review}</Markdown>
        </div>
      </main>
    </>
  )
}

export default App
