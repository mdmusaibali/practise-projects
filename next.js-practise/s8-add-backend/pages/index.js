import { useRef, useState } from "react";

export default function Home() {
  const emailInputRef = useRef(null);
  const feedbackInputRef = useRef(null);
  const [feedbackItems, setFeedbackItems] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    const enteredFeedback = feedbackInputRef.current?.value;
    const requestBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const loadFeedbackHandler = () => {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
        console.log(data.feedback);
      });
  };

  return (
    <>
      <h1>The Home Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Your email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label>Your feedback</label>
          <textarea
            type="text"
            id="feedback"
            rows={"5"}
            ref={feedbackInputRef}
          />
        </div>
        <button type="submit">Send feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems &&
          feedbackItems.map((item) => <li key={item.id}>{item.text}</li>)}
      </ul>
    </>
  );
}
