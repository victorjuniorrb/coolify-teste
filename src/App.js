import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch('/api/messages');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data);
    } catch (e) {
      setError(`Falha ao carregar mensagens: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newMessage }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessages([data, ...messages]);
      setNewMessage('');
    } catch (e) {
      setError(`Falha ao enviar mensagem: ${e.message}`);
    }
  };

  return (
    <div className="container guestbook-container">
      <h1 className="mb-4 text-center">📖 Livro de Visitas</h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Deixe sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            aria-label="Nova mensagem"
          />
          <button type="submit" className="btn btn-primary">Enviar</button>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}
      
      {loading ? (
        <p className="text-center">Carregando mensagens...</p>
      ) : (
        <ul className="list-group">
          {messages.length === 0 && <li className="list-group-item text-center">Nenhuma mensagem ainda. Seja o primeiro!</li>}
          {messages.map(msg => (
            <li key={msg.id} className="list-group-item">
              <p className="mb-1">{msg.text}</p>
              <small className="d-block text-muted text-end">
                {new Date(msg.created_at).toLocaleString('pt-BR')}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
