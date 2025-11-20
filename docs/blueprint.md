# **App Name**: EntreprenYOUr Mixer

## Core Features:

- Matchmaking System: Implements a checkbox-based matchmaking system for connecting entrepreneurs with specific needs (tech partners, funding, etc.) via vertical scrolling.
- Group Assignment Quiz: A 7-question quiz to determine a user's dominant entrepreneurial profile (Tech, Commercial, Creative, Strategist, Novice) using React functional components and hooks.
- Profile Classification Algorithm: Classifies users into one of five profiles based on their quiz responses, prioritizing A > B > C > D > E in case of ties.
- Round-Robin Color Assignment: Assigns a color (Red, Blue, Green, Yellow, Orange) to each user based on their profile, using a round-robin algorithm to balance group colors. Utilizes localStorage for persistent group profile counters.
- Results Display: Presents the assigned color (with emoji), dominant profile (with description), response distribution (how many A, B, C, D, E were chosen), and a visual chart of the user's answers. Includes an expandable explanation of the algorithm.
- Descriptive Texts: Descriptive texts, along with a prompt ready for an AI agent, facilitating the seamless implementation of both the matching and algorithm functionalities, can be obtained via a link to a specific model
- Local Storage Management: Persistent storage of user profile data and color assignment via React Context and local storage to persist counts between sessions and enable persistence

## Style Guidelines:

- Primary color: Vibrant purple (#9400D3) to convey innovation and entrepreneurship.
- Background color: Light lavender (#E6E6FA) for a soft, non-intrusive backdrop.
- Accent color: Bright cyan (#00FFFF) for interactive elements and highlights.
- Body and headline font: 'Inter' (sans-serif) for clear and accessible readability.
- Use clear, modern icons to represent different profile types and areas of interest.
- Employ a continuous vertical scrolling layout to streamline user flow, emphasizing a single question at a time to minimize distractions.
- Use subtle transitions and animations when switching between quiz questions and displaying results to create an engaging user experience.