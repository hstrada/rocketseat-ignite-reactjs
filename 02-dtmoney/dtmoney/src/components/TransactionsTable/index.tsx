import { useEffect } from 'react'
import { api } from '../../services/api'
import { Container } from './styles'

export function TransactionsTable() {
  useEffect(() => {
    api
      .get('http://localhost:3000/api/transactions')
      .then((data) => console.log(data))
  }, [])

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr key="1">
            <td>Título</td>
            <td className="deposit">R$ 1000,00</td>
            <td>Casa</td>
            <td>16/12/2021</td>
          </tr>
          <tr key="1">
            <td>Título</td>
            <td className="withdraw">R$ - 1000,00</td>
            <td>Casa</td>
            <td>16/12/2021</td>
          </tr>
          <tr key="1">
            <td>Título</td>
            <td>R$ 1000,00</td>
            <td>Casa</td>
            <td>16/12/2021</td>
          </tr>
          <tr key="1">
            <td>Título</td>
            <td>R$ 1000,00</td>
            <td>Casa</td>
            <td>16/12/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}
