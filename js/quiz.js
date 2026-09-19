// QUIZ DATA & LOGIC
const quizData = [
  {
    id: 1,
    question: "Does your organisation have a documented AI strategy tied to business outcomes?",
    options: [
      { text: "Yes, comprehensive", points: 25 },
      { text: "Yes, but vague", points: 15 },
      { text: "We're talking about it", points: 5 },
      { text: "No", points: 0 }
    ]
  },
  {
    id: 2,
    question: "Have you quantified the business value of AI for your operations?",
    options: [
      { text: "Clear ROI metrics defined", points: 25 },
      { text: "Estimated benefits", points: 15 },
      { text: "Early discussion", points: 5 },
      { text: "No analysis yet", points: 0 }
    ]
  },
  {
    id: 3,
    question: "Who owns AI strategy in your organisation?",
    options: [
      { text: "Appointed executive with clear accountability", points: 25 },
      { text: "Cross-functional committee", points: 20 },
      { text: "Ad hoc team", points: 10 },
      { text: "Unclear / no owner", points: 0 }
    ]
  },
  {
    id: 4,
    question: "Have you deployed an AI solution into production?",
    options: [
      { text: "Yes, measuring results", points: 25 },
      { text: "Yes, pilot stage", points: 18 },
      { text: "Evaluating vendors", points: 8 },
      { text: "No", points: 0 }
    ]
  },
  {
    id: 5,
    question: "Can your team build and maintain AI systems without external vendors?",
    options: [
      { text: "Yes, fully independent", points: 25 },
      { text: "Partially, for simple systems", points: 15 },
      { text: "Dependent on vendors", points: 5 },
      { text: "Not required yet", points: 0 }
    ]
  },
  {
    id: 6,
    question: "Does your leadership team understand what AI can do for your business?",
    options: [
      { text: "Sophisticated understanding", points: 25 },
      { text: "Basic literacy across the team", points: 15 },
      { text: "Minimal understanding", points: 5 },
      { text: "None", points: 0 }
    ]
  },
  {
    id: 7,
    question: "Is your AI budget tied to measurable business outcomes?",
    options: [
      { text: "Strongly tied to metrics", points: 25 },
      { text: "Somewhat connected", points: 15 },
      { text: "Loosely defined", points: 5 },
      { text: "Not yet", points: 0 }
    ]
  },
  {
    id: 8,
    question: "How dependent are you on external vendors for your AI solutions?",
    options: [
      { text: "Independent, internal capability", points: 25 },
      { text: "Multiple vendors, reducing risk", points: 18 },
      { text: "Single vendor dependent", points: 5 },
      { text: "Not applicable", points: 0 }
    ]
  },
  {
    id: 9,
    question: "Do you have governance for data quality, model bias, and ethical AI?",
    options: [
      { text: "Comprehensive governance in place", points: 25 },
      { text: "Developing governance", points: 15 },
      { text: "Minimal framework", points: 5 },
      { text: "Not addressed", points: 0 }
    ]
  },
  {
    id: 10,
    question: "Are competitors in your sector ahead of you on AI adoption?",
    options: [
      { text: "We lead in our sector", points: 25 },
      { text: "We're comparable", points: 18 },
      { text: "They're ahead", points: 5 },
      { text: "Don't know", points: 0 }
    ]
  }
];

const resultTemplates = {
  foundation: {
    stage: "Foundation Stage",
    meaning: "Your organisation is evaluating AI but hasn't yet committed to a clear strategy. This is actually the right moment to move from exploration to direction. Most organisations at this stage have pockets of AI interest but no centralised governance or measurable business case.",
    priority: "Move from 'we need AI' to 'AI solves this specific problem for us.' Define strategy before choosing tools.",
    example: "A Cameroon-based bank spent $400,000 on AI tools with no strategy. 18 months later, they had nothing to show. They came to us, we built the strategy first, they returned to their existing tools with purpose, and within 90 days, the first workflow was in production. The tools were already paid for. They just needed direction.",
    cta: "A strategy engagement starts with discovery. Two weeks understanding your business. One month designing your roadmap. One month piloting the first workflow. By week 12, your team is executing independently. Investment: typically $12,000-$18,000. ROI: measurable within six months."
  },
  building: {
    stage: "Building Stage",
    meaning: "You have initiatives. You're moving. The risk now is disconnection. You have pilots running, but they're not connected to a central strategy. Budgets are allocated, but success is unclear. Your team is learning, but on different paths.",
    priority: "Connect your pilots to business outcomes. Build the roadmap that makes them cohere.",
    example: "A financial institution had three AI projects. Risk was exploring one thing. Operations was exploring another. Finance was exploring a third. No one knew if they were winning or failing. We brought the executives together, looked at what each project actually delivered, and connected them to a single strategy. Suddenly the investments made sense. They went from confused to confident.",
    cta: "A scoping engagement identifies what's working and what's not. We validate your pilots. We build the roadmap that connects them. We help you measure progress. Timeline: 6-8 weeks. Investment: $8,000-$15,000."
  },
  scaling: {
    stage: "Scaling Stage",
    meaning: "You're executing. Pilots are moving to production. Your team is trained. The question now is: how do you scale without losing quality or breaking your systems? How do you expand while protecting what's working?",
    priority: "Document your operating model. Train more teams. Scale selectively to your next set of high-impact workflows.",
    example: "A government agency had one successful AI implementation. They wanted to expand to five more departments. But they didn't have documented process. They didn't have a training framework. We helped them codify what they'd learned, built a training programme, and scaled deliberately. Within four months, three new workflows were live.",
    cta: "A scaling engagement focuses on capability building and selective expansion. We identify your next 2-3 workflows. We train your teams to own them. We establish governance so quality doesn't degrade as you grow. Timeline: 12-16 weeks. Investment: $15,000-$25,000."
  },
  leading: {
    stage: "Leading Stage",
    meaning: "You're mature. You've built capability. Your team owns your systems. Your strategy is driving results. Most organisations are 18-24 months behind you. The question now is: how do you maintain lead? How do you evolve your strategy as the technology and market shift?",
    priority: "From execution to competitive advantage. Build moats. Create workflows competitors can't easily copy.",
    example: "A multinational corporation had built sophisticated AI capability across three markets. They wanted to know: where do we go from here? We worked with their leadership to identify workflows that would give them 18-24 month head start over competitors. The focus shifted from 'can we do this' to 'what are we uniquely positioned to do that others can't.'",
    cta: "A strategy engagement at this stage is about competitive moat. We help you identify your next frontier. We position you to move ahead while others catch up. This is custom consulting, ongoing."
  }
};

let currentQuestion = 0;
let responses = [];
let totalScore = 0;

function startQuiz() {
  document.getElementById('quiz-welcome').style.display = 'none';
  document.getElementById('quiz-questions').style.display = 'block';
  document.getElementById('nav-buttons').style.display = 'flex';
  renderQuestion();
}

function renderQuestion() {
  const container = document.getElementById('questions-container');
  container.innerHTML = '';
  
  const q = quizData[currentQuestion];
  
  const questionDiv = document.createElement('div');
  questionDiv.className = 'quiz-section active';
  
  const questionP = document.createElement('p');
  questionP.className = 'question-text';
  questionP.textContent = q.question;
  questionDiv.appendChild(questionP);
  
  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'quiz-options';
  
  q.options.forEach((option, index) => {
    const optionButton = document.createElement('button');
    optionButton.className = 'quiz-option';
    optionButton.textContent = option.text;
    optionButton.onclick = () => selectOption(index, option.points);
    
    if (responses[currentQuestion] !== undefined && responses[currentQuestion].optionIndex === index) {
      optionButton.classList.add('selected');
    }
    
    optionsDiv.appendChild(optionButton);
  });
  
  questionDiv.appendChild(optionsDiv);
  container.appendChild(questionDiv);
  
  updateProgress();
  updateButtons();
  updateCounter();
}

function selectOption(optionIndex, points) {
  responses[currentQuestion] = { optionIndex, points };
  renderQuestion();
}

function nextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    completeQuiz();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function updateProgress() {
  const progress = ((currentQuestion + 1) / quizData.length) * 100;
  document.getElementById('progress-bar').style.width = progress + '%';
}

function updateCounter() {
  document.getElementById('question-counter').textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
}

function updateButtons() {
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  prevBtn.style.display = currentQuestion > 0 ? 'block' : 'none';
  nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'See Results' : 'Next';
}

function completeQuiz() {
  // Calculate score
  totalScore = responses.reduce((sum, response) => {
    return sum + (response ? response.points : 0);
  }, 0);
  
  // Convert to 0-100 scale
  const normalizedScore = Math.round((totalScore / 250) * 100);
  
  // Determine stage
  let stage;
  if (normalizedScore <= 30) stage = 'foundation';
  else if (normalizedScore <= 60) stage = 'building';
  else if (normalizedScore <= 80) stage = 'scaling';
  else stage = 'leading';
  
  displayResults(normalizedScore, stage);
}

function displayResults(score, stage) {
  document.getElementById('quiz-questions').style.display = 'none';
  document.getElementById('quiz-results').style.display = 'block';
  
  const template = resultTemplates[stage];
  
  // Update display
  document.getElementById('score-display').textContent = score;
  document.getElementById('stage-label').textContent = template.stage;
  
  // Build results content
  const resultsContent = document.getElementById('results-content');
  resultsContent.innerHTML = `
    <h2 style="margin-top: var(--spacing-xxl);">What This Means</h2>
    <p>${template.meaning}</p>
    
    <h2 style="margin-top: var(--spacing-xxl);">Your Next Priority</h2>
    <p>${template.priority}</p>
    
    <h2 style="margin-top: var(--spacing-xxl);">Real Example</h2>
    <p>${template.example}</p>
    
    <h2 style="margin-top: var(--spacing-xxl);">What Happens Next</h2>
    <p>${template.cta}</p>
  `;
  
  document.getElementById('results-cta').textContent = 
    stage === 'leading' 
      ? "Let's talk about where you go from here."
      : "Ready to move forward?";
  
  // Scroll to top
  window.scrollTo(0, 0);
}
