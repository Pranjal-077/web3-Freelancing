import { useState } from "react";

export default function PostJob({ addJob }) {
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");

  const submit = () => {
    if (!title || !budget) return;
    addJob({ title, budget, status: "Open" });
    setTitle("");
    setBudget("");
  };

  return (
    <div>
      <h3>Post a Job</h3>
      <input placeholder="Job title" value={title}
        onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Budget (ETH)" value={budget}
        onChange={(e) => setBudget(e.target.value)} />
      <button onClick={submit}>Post</button>
    </div>
  );
}
