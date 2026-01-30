# Quiz Application

A interactive JavaScript-based quiz application that allows users to test their knowledge across different categories and difficulty levels.

## Features

- **Multiple Categories**: Choose between Math and General Knowledge.
- **Difficulty Levels**: Select from Easy, Medium, or Hard difficulty.
- **Timed Questions**: Each question has a 10-second timer.
- **Score Tracking**: Keeps track of your score as you progress.
- **Visual Results**:
  - **Bar Chart**: Shows time spent on each question.
  - **Pie Chart**: Displays the ratio of correct vs. incorrect answers.

## How to Use

1. Open `index.html` in your web browser.
2. Select a **Category** and **Difficulty** from the dropdown menus.
3. Click **Start Quiz**.
4. Answer questions before the timer runs out.
5. View your performance charts at the end of the quiz.

## Dependencies

This project uses **Chart.js** for rendering the result charts. Ensure the library is included in your HTML file:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```