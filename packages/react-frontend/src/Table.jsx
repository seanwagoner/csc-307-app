// src/Table.jsx
function TableHeader() {
    return (
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Job</th>
        </tr>
      </thead>
    );
  }
  
  function TableBody(props) {
    const rows = props.characterData.map((row, index) => {
      return (
        <tr key={row._id || index}>
          <td>{row._id}</td>
          <td>{row.name}</td>
          <td>{row.job}</td>
          <td>
            <button onClick={() => props.removeCharacter(index)}>
              Remove
            </button>
          </td>
        </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );
  }

  function Table(props) {
    return (
      <table>
        <TableHeader />
        <TableBody
          characterData={props.characterData}
          removeCharacter={props.removeCharacter}
        />
      </table>
    );
  }

export default Table;