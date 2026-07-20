# Month 0 – Understanding the AI Landscape

The goal of this month is to understand the AI landscape before building AI applications.

To structure my learning, I am following the four-layer AI stack:

1. Foundation Layer (Models)
2. Retrieval Layer
3. Orchestration Layer
4. Application Layer

---

## Foundation Layer – Models

To understand the foundation layer, I signed up for multiple model providers:

- OpenAI (Paid API)
- Google Gemini
- Groq

I built a React application that sends the same prompt to all models simultaneously and displays their responses side by side. This allows me to compare:

- Personality
- Strengths
- Failure modes
- Response time

The project is available in the **projects** directory.

The prompt comparisons and observations are documented in the **experiments** directory.

### Key Takeaways

- Different AI models have different personalities, strengths, and failure modes. There is no single "best" model.
- Always choose a model based on the task rather than its popularity.
- OpenAI provided the best overall balance for software engineering tasks in my testing.
- Gemini excelled at detailed explanations, polished writing, and generating multiple alternatives.
- Groq consistently delivered the fastest responses, making it ideal when low latency is important.
- Running the same prompt across multiple models is one of the best ways to understand how they differ.
- Speed alone does not determine quality; the fastest model is not always the most accurate.
- Different models fail in different ways (for example, incorrect syntax, ignoring instructions, or being overly verbose).
- Testing a variety of prompt types (writing, coding, reasoning, formatting, and constraints) provides a much more meaningful comparison than testing only one type of prompt.
- As an AI engineer, understanding **when** to use each model is more valuable than finding a single favorite model.


## What I Learned

- I understand the AI model landscape.
- I know how to call multiple LLM APIs.
- I can compare models based on personality, strengths, and failure modes.
- I know that different models are better suited for different tasks.