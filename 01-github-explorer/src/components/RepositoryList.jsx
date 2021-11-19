const repositoryName = 'unform2'

export function RepositoryList() {
  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        <li>
          <strong>{repositoryName}</strong>
          <p>forms in react</p>
          <a href="">Acessar Repositórios</a>
        </li>
        <li>
          <strong>unform</strong>
          <p>forms in react</p>
          <a href="">Acessar Repositórios</a>
        </li>
      </ul>
    </section>
  )
}
