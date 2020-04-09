import React, { useState, useEffect } from "react";
import api from "./services/api"

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    getRepos();
  }, [])

  async function getRepos() {
    const response = await api.get("repositories");

    setRepositories(response.data);
  }

  async function handleAddRepository(event) {
    event.preventDefault();

    const newRepo = {
      url,
      title,
      techs: techs.split(","),
    };

    const response = await api.post("repositories", newRepo);

    setRepositories([...repositories, response.data]);

    setTitle("");
    setUrl("");
    setTechs("");
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const repositoriesFiltered = repositories.filter(
      repository => repository.id !== id
    )

    setRepositories(repositoriesFiltered)
  }

  return (
    <div>
      <form action="">
        <label htmlFor="title">Titulo</label>
        <input 
          type="text" 
          id="title" name="title"
          placeholder="Desafio ReactJS"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="url">Url</label>
        <input 
          type="text"
          id="url"
          name="url"
          placeholder="https://github.com/josepholiveira"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />

        <label htmlFor="techs">Tecnologias</label>
        <input 
          type="text"
          id="techs"
          name="techs"
          placeholder="React, Node, GraphQL"
          value={techs}
          onChange={(event) => setTechs(event.target.value)}
        />
        
        <button onClick={handleAddRepository}>Adicionar</button>
      </form>
    
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <p>{repository.title}</p>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>

        ))}
      </ul>

    </div>
  );
}

export default App;
