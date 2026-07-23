# Month 0 -- Understanding the AI Landscape

The goal of this month is to understand the AI landscape before building
AI applications.

To structure my learning, I am following the four-layer AI stack:

1.  Foundation Layer (Models)
2.  Retrieval Layer
3.  Orchestration Layer
4.  Application Layer

## Foundation Layer -- Models

To understand the foundation layer, I signed up for multiple model
providers:

-   OpenAI (Paid API)
-   Google Gemini
-   Groq

I built a React application that sends the same prompt to all models
simultaneously and displays their responses side by side. This allows me
to compare:

-   Personality
-   Strengths
-   Failure modes
-   Response time

The project is available in the **projects** directory.

The prompt comparisons and observations are documented in the
**experiments** directory.

### Key Takeaways

-   Different AI models have different personalities, strengths, and
    failure modes. There is no single "best" model.
-   Always choose a model based on the task rather than its popularity.
-   OpenAI provided the best overall balance for software engineering
    tasks in my testing.
-   Gemini excelled at detailed explanations, polished writing, and
    generating multiple alternatives.
-   Groq consistently delivered the fastest responses, making it ideal
    when low latency is important.
-   Running the same prompt across multiple models is one of the best
    ways to understand how they differ.
-   Speed alone does not determine quality; the fastest model is not
    always the most accurate.
-   Different models fail in different ways (for example, incorrect
    syntax, ignoring instructions, or being overly verbose).
-   Testing a variety of prompt types (writing, coding, reasoning,
    formatting, and constraints) provides a much more meaningful
    comparison than testing only one type of prompt.
-   As an AI engineer, understanding **when** to use each model is more
    valuable than finding a single favorite model.

### What I Learned

-   I understand the AI model landscape.
-   I know how to call multiple LLM APIs.
-   I can compare models based on personality, strengths, and failure
    modes.
-   I know that different models are better suited for different tasks.

## Retrieval Layer

In Retrieval layer, I explored tooling landscape and understand which
problem each tool is solving. Also I investigated how existing products
work.

### Understanding the Tooling Landscape

To understand which problem each tool solves, I explored the following
three tools: 1. OpenAI SDK 2. LangChain 3. LlamaIndex

### OpenAI SDK

OpenAI SDK is official programming library that helps to talk to OpenAI
APIs wuthout making HTTP requests.

#### Architecture

``` text
Your Application
        ↓
   OpenAI SDK
        ↓
    GPT Models
```

This SDK makes ineracting with OpenAI models easy and reliable form
code.

### LangChain:

LangChain is an orchestration framework for building LLM applications.
It is model agnostic and can work with many providers like OpenAI,
Anthropic, Google Gemini, etc.

#### Building Blocks

LangChain provides reusable building blocks to connect into one larger
AI workflow:

-   LLMs
-   Prompts
-   Tools
-   Memory / State
-   Retrieval
-   Agents
-   Application Logic

Imagine you're building an AI application.

Using the OpenAI SDK, you can ask GPT a question and get an answer. But
you are responsible for writing all the code that decides what happens
before and after that. For example:

-   Should the AI search the web first?
-   Should it look up information in a database?
-   Should it remember the previous conversation?
-   Should it call a calculator?
-   Should it ask another AI model?

All of that logic is your responsibility.

LangChain helps manage that complexity. Instead of writing all the
plumbing yourself, it gives you ready-made building blocks to connect
models, prompts, tools, memory, and application logic into a single
workflow.

#### Simple way to think about it

> **The OpenAI SDK helps you talk to an AI model. LangChain helps you
> build an entire AI application around that model.**

For example, if a user asks:

"What's the weather in New York, and should I carry an umbrella?"

With just the OpenAI SDK, you'd need to:

1.  Detect that weather information is needed.
2.  Call a weather API.
3.  Send the weather data back to the model.
4.  Generate the final answer.

LangChain provides abstractions for wiring these kinds of multi-step
workflows together, so you can focus more on your application's behavior
than on the underlying plumbing.

That's the real value of LangChain---it doesn't make the AI smarter, it
makes building AI applications easier.

### LlamaIndex

Unlike LangChain, which helps you orchestrate AI workflows, LlamaIndex
focuses on one specific problem: helping LLMs use your own data.

Why was LlamaIndex created?

LLMs like GPT only know what they were trained on. They don't
automatically know about:

-   Your company's documents
-   PDFs
-   Word files
-   Notion pages
-   Google Drive
-   Databases
-   Emails
-   Internal knowledge bases

If you simply send all of this data to the model every time, you'll
quickly hit token limits and incur high costs.

LlamaIndex solves this by helping you organize, index, and retrieve only
the relevant information before sending it to the LLM.

In simple terms

Think of it this way:

-   OpenAI SDK = Talks to the AI model.
-   LangChain = Organizes the application's workflow.
-   LlamaIndex = Finds the right information from your data and gives it
    to the model.

Example

Suppose you build a chatbot for your company.

A user asks:

"What is our vacation policy?"

Without LlamaIndex:

-   You'd have to send the entire employee handbook to the model (slow
    and expensive).

With LlamaIndex:

1.  It searches your documents.
2.  Finds only the vacation policy section.
3.  Sends just that section to GPT.
4.  GPT generates the answer.

#### Architecture

``` text
Your Documents
        ↓
   LlamaIndex
        ↓
Relevant Information
        ↓
    OpenAI SDK
        ↓
     GPT Model
```

#### Relationship with LangChain

They are complementary, not competitors.

-   LlamaIndex answers: "How do I find the right information?"
-   LangChain answers: "How do I connect everything together?"

A common architecture is:

User ↓ LangChain (workflow) ↓ LlamaIndex (retrieve relevant documents) ↓
OpenAI SDK ↓ GPT

#### Key Takeaway

LlamaIndex specializes in retrieval. It helps AI applications
efficiently search your own data and provide only the most relevant
information to the LLM, making responses more accurate, faster, and
cheaper. This is the foundation of most Retrieval-Augmented Generation
(RAG) applications.

## Conclusion

These three tools work together rather than compete with each other.

-   **OpenAI SDK** is used to communicate with AI models.
-   **LangChain** helps build and organize complete AI applications.
-   **LlamaIndex** helps AI applications find and use information from
    your own data.

Knowing what each tool is designed for makes it much easier to choose
the right one instead of using a more complex solution than necessary.
