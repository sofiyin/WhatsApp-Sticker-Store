// Función para mostrar todos los jugadores
export const fetchPersona = async () => {
    fetch("https://localhost:5000/persona")
    .then(response => response.json())
    .then(persona => {
        const personaTable = document.getElementById("person_table")
        const tbody = personaTable.getElementsByTagName("tbody")[0]

        tbody.innerHTML = ""

        persona.forEach(person => {
            const row = document.createElement("tr")
            row.setAttribute("id", person.id)
            row.innerHTML = `
                <td> ${person.id} </td>
                <td> ${person.username} </td>
                <td> ${person.correo} </td>
                <td> ${person.password} </td>
            `
            tbody.appendChild(row)
        })
    })
}
