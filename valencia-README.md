# Valencia

**A friendly chatbot that helps autistic children learn to recognize and talk about emotions.**

<!-- Add a screenshot: save one as screenshot.png in the repo root and keep the line below -->
![Valencia screenshot](screenshot.png)

---

## Why I Built It

Many autistic children find it hard to identify emotions and connect them to everyday situations. Valencia makes that practice approachable: a child asks a question, and the chatbot answers with an explanation, names the feeling that goes with it, and shows an animated expression of that feeling. Pairing words with a visible expression reinforces the connection between a situation and an emotion.

## Features

- **Conversational Q&A:** Children type a question in plain language and get a simple, friendly answer.
- **Emotion labels:** Each answer names an associated feeling (good, great, bad, or terrible).
- **Animated expressions:** A matching animated GIF shows the feeling, so children can see the emotion as well as read it.
- **Forgiving matching:** Questions don't need exact wording. Valencia finds the closest question in its knowledge base, so typos and rephrasing still work.
- **Graceful fallback:** If no question is close enough, Valencia says it doesn't know rather than guessing.

## How It Works

1. The app loads a knowledge base (`knowledge_base.json`) of questions, answers, and feelings.
2. When a child sends a message, Valencia compares it to every stored question using a similarity score: the longest common subsequence (LCS) length divided by the longer string's length.
3. The best match above a 0.4 similarity threshold is selected.
4. Valencia displays the answer, the feeling, and the animated expression for that feeling.

It's built with plain HTML, CSS, and JavaScript, with no frameworks or dependencies, so it runs in any modern browser.

## Run It

```bash
git clone https://github.com/userxyc123/valencia1.0.git
cd valencia1.0
```

Open `index.html` in a browser. An internet connection is needed, since the knowledge base and animations load online.

## Testing and Iteration

I refined Valencia through user testing with children and parents and demoed it at a hackathon. Feedback shaped the character interface and accessibility improvements.

## What's Next

- Detect emotions directly from a child's message instead of using preset labels
- Escape user input before rendering, and cache the knowledge base instead of reloading it on every message
- Expand the knowledge base with more everyday situations
- Add text-to-speech for early readers

## Author

Built by **Sakshi Verma**, University of Washington, Computer Science.
