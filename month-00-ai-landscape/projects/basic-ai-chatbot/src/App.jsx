import { useState } from 'react'
import OpenAI from 'openai'
import { GoogleGenAI } from '@google/genai'
import Groq from 'groq-sdk'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const [openAIResponse, setOpenAIResponse] = useState('')
  const [geminiResponse, setGeminiResponse] = useState('')
  const [groqResponse, setGroqResponse] = useState('')

  const [openAIError, setOpenAIError] = useState('')
  const [geminiError, setGeminiError] = useState('')
  const [groqError, setGroqError] = useState('')

  const [openAILoading, setOpenAILoading] = useState(false)
  const [geminiLoading, setGeminiLoading] = useState(false)
  const [groqLoading, setGroqLoading] = useState(false)

  const [openAITime, setOpenAITime] = useState(null)
  const [geminiTime, setGeminiTime] = useState(null)
  const [groqTime, setGroqTime] = useState(null)

  async function callOpenAI(userPrompt) {
    const client = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    })

    const response = await client.responses.create({
      model: 'gpt-4.1',
      input: userPrompt,
    })

    return response.output_text
  }

  async function callGemini(userPrompt) {
    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    })

    const interaction = await ai.interactions.create({
      model: 'gemini-3.5-flash',
      input: userPrompt,
    })

    return interaction.output_text
  }

  async function callGroq(userPrompt) {
    const client = new Groq({
      apiKey: import.meta.env.VITE_GROQ_API_KEY,
      dangerouslyAllowBrowser: true,
    })

    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    })

    return response.choices[0]?.message?.content || ''
  }

  async function runOpenAI(userPrompt) {
    const startedAt = performance.now()

    setOpenAILoading(true)
    setOpenAIResponse('')
    setOpenAIError('')
    setOpenAITime(null)

    try {
      const result = await callOpenAI(userPrompt)
      setOpenAIResponse(result)
    } catch (requestError) {
      console.error('OpenAI error:', requestError)

      setOpenAIError(
        requestError?.message ||
          'An unknown error occurred while communicating with OpenAI.',
      )
    } finally {
      setOpenAITime((performance.now() - startedAt) / 1000)
      setOpenAILoading(false)
    }
  }

  async function runGemini(userPrompt) {
    const startedAt = performance.now()

    setGeminiLoading(true)
    setGeminiResponse('')
    setGeminiError('')
    setGeminiTime(null)

    try {
      const result = await callGemini(userPrompt)
      setGeminiResponse(result)
    } catch (requestError) {
      console.error('Gemini error:', requestError)

      setGeminiError(
        requestError?.message ||
          'An unknown error occurred while communicating with Gemini.',
      )
    } finally {
      setGeminiTime((performance.now() - startedAt) / 1000)
      setGeminiLoading(false)
    }
  }

  async function runGroq(userPrompt) {
    const startedAt = performance.now()

    setGroqLoading(true)
    setGroqResponse('')
    setGroqError('')
    setGroqTime(null)

    try {
      const result = await callGroq(userPrompt)
      setGroqResponse(result)
    } catch (requestError) {
      console.error('Groq error:', requestError)

      setGroqError(
        requestError?.message ||
          'An unknown error occurred while communicating with Groq.',
      )
    } finally {
      setGroqTime((performance.now() - startedAt) / 1000)
      setGroqLoading(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const cleanedPrompt = prompt.trim()

    if (!cleanedPrompt) {
      setSubmitted(true)
      setOpenAIError('Please enter a prompt.')
      setGeminiError('Please enter a prompt.')
      setGroqError('Please enter a prompt.')
      return
    }

    setSubmitted(true)

    await Promise.allSettled([
      runOpenAI(cleanedPrompt),
      runGemini(cleanedPrompt),
      runGroq(cleanedPrompt),
    ])
  }

  function handleClear() {
    setPrompt('')
    setSubmitted(false)

    setOpenAIResponse('')
    setGeminiResponse('')
    setGroqResponse('')

    setOpenAIError('')
    setGeminiError('')
    setGroqError('')

    setOpenAITime(null)
    setGeminiTime(null)
    setGroqTime(null)
  }

  async function copyResponse(responseText) {
    if (!responseText) return

    try {
      await navigator.clipboard.writeText(responseText)
    } catch (error) {
      console.error('Unable to copy response:', error)
    }
  }

  const isLoading =
    openAILoading || geminiLoading || groqLoading

  function ModelCard({
    provider,
    model,
    logo,
    cardClass,
    logoClass,
    badgeClass,
    loading,
    response,
    error,
    responseTime,
  }) {
    return (
      <article className={`model-card ${cardClass}`}>
        <header className="model-card-header">
          <div className="model-identity">
            <div className={`model-logo ${logoClass}`}>
              {logo}
            </div>

            <div>
              <h2>{provider}</h2>
              <p>{model}</p>
            </div>
          </div>

          <span className={`provider-badge ${badgeClass}`}>
            {provider}
          </span>
        </header>

        <div className="card-divider" />

        <section className="response-area">
          <h3>
            <span aria-hidden="true">▣</span>
            Response
          </h3>

          {loading && (
            <div className="loading-state">
              <div className="loading-spinner" />
              <p>{provider} is generating a response...</p>
            </div>
          )}

          {!loading && error && (
            <div className="error-message" role="alert">
              <div className="error-icon">!</div>

              <div>
                <h4>{provider} request failed</h4>
                <p>{error}</p>
              </div>
            </div>
          )}

          {!loading && response && (
            <div className="response-box">
              <p>{response}</p>
            </div>
          )}

          {!loading && !response && !error && (
            <div className="empty-response">
              No response received.
            </div>
          )}
        </section>

        <footer className="model-card-footer">
          <div className="response-meta">
            <span>Model: {model}</span>

            {responseTime !== null && (
              <>
                <span className="meta-divider">|</span>
                <span>Time: {responseTime.toFixed(2)}s</span>
              </>
            )}
          </div>

          <button
            type="button"
            className="copy-button"
            onClick={() => copyResponse(response)}
            disabled={!response}
            aria-label={`Copy ${provider} response`}
          >
            ⧉
          </button>
        </footer>
      </article>
    )
  }

  return (
    <main className="comparison-page">
      <section className="comparison-app">
        <header className="top-header">
          <div className="title-area">
            <span className="title-icon" aria-hidden="true">
              ⚖
            </span>

            <div>
              <h1>AI Model Comparison</h1>
              <p>
                Compare OpenAI, Gemini and Llama side by side.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="clear-button"
            onClick={handleClear}
            disabled={isLoading}
          >
            <span aria-hidden="true">⌫</span>
            Clear
          </button>
        </header>

        <form className="prompt-panel" onSubmit={handleSubmit}>
          <label htmlFor="prompt">Your Prompt</label>

          <div className="textarea-wrapper">
            <textarea
              id="prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Enter the same prompt for all three AI models..."
              maxLength={2000}
              disabled={isLoading}
            />

            <span className="character-count">
              {prompt.length}/2000
            </span>
          </div>

          <div className="prompt-footer">
            <p className="prompt-tip">
              <span aria-hidden="true">💡</span>
              Tip: Use the exact same prompt for a fair comparison.
            </p>

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              <span aria-hidden="true">➤</span>
              {isLoading ? 'Generating...' : 'Submit'}
            </button>
          </div>
        </form>

        {submitted && (
          <section className="model-grid">
            <ModelCard
              provider="OpenAI"
              model="gpt-4.1"
              logo="AI"
              cardClass="openai-card"
              logoClass="openai-logo"
              badgeClass="openai-badge"
              loading={openAILoading}
              response={openAIResponse}
              error={openAIError}
              responseTime={openAITime}
            />

            <ModelCard
              provider="Google Gemini"
              model="gemini-3.5-flash"
              logo="G"
              cardClass="gemini-card"
              logoClass="gemini-logo"
              badgeClass="gemini-badge"
              loading={geminiLoading}
              response={geminiResponse}
              error={geminiError}
              responseTime={geminiTime}
            />

            <ModelCard
              provider="Groq"
              model="llama-3.3-70b-versatile"
              logo="L"
              cardClass="groq-card"
              logoClass="groq-logo"
              badgeClass="groq-badge"
              loading={groqLoading}
              response={groqResponse}
              error={groqError}
              responseTime={groqTime}
            />
          </section>
        )}

        {submitted && (
          <footer className="disclaimer">
            <span aria-hidden="true">ⓘ</span>
            Responses may differ in accuracy, tone, detail and
            instruction-following. Verify important information.
          </footer>
        )}
      </section>
    </main>
  )
}

export default App