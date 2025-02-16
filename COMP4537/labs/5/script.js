// This code is assisted by chatGPT
import { messages } from "./lang/message/en/user.js";

document.addEventListener("DOMContentLoaded", () => {
    const samplePatientsText = document.getElementById("samplePatients");
    const insertPatientsDataText = document.getElementById("insertBtn");
    const executeQueryText = document.getElementById("executeQuery");
    const selectOrInsertText = document.getElementById("selectOrInsert");
    const responseAreaContainer = document.getElementById("responseCard");
    const responseArea = document.getElementById("response");
    const insertMessageContainer = document.getElementById("insertMessageContainer");
    const queryMessageContainer = document.getElementById("queryMessageContainer");
    const queryInput = document.getElementById("queryInput")
    const SERVER_URL = "https://oyster-app-ysyip.ondigitalocean.app/COMP4537/labs/5/api/v1/sql/";

    samplePatientsText.value = Object.entries(messages.SAMPLE_PATIENTS)
        .map(([name, dob]) => `('${name}', '${dob}')`)
        .join("\n");

    insertPatientsDataText.textContent = messages.INSERT_PATIENT_DATA;
    executeQueryText.textContent = messages.EXECUTE_QUERY;
    selectOrInsertText.textContent = messages.SELECT_OR_INSERT;

    document.getElementById("insertBtn").addEventListener("click", () => {
        const samplePatientsData = Object.entries(messages.SAMPLE_PATIENTS)
            .map(([name, dob]) => `('${name}', '${dob}')`)
            .join(",");

        const query = `INSERT INTO patients (name, dateOfBirth) VALUES ${samplePatientsData};`;
        console.log(JSON.stringify({ query }));

        fetch(SERVER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        })
        .then(response => response.json())
        .then(data => {
            showMessage(insertMessageContainer, messages.INSERT_SUCCESS, "success");
        })
        .catch(err => {
            console.log(err);
            showMessage(insertMessageContainer, messages.UNABLE_TO_INSERT_DATA, "danger");
        });
    });

    document.getElementById("executeQuery").addEventListener("click", () => {
        const query = document.getElementById("queryInput").value.trim();

        if (query.toUpperCase().startsWith("SELECT")) {
            fetch(`${SERVER_URL}?query=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {
                    responseAreaContainer.classList.remove("d-none");
                    console.log(data);
                    renderTable(data.results);
                })
                .catch(err => {
                    console.log(err);
                    showMessage(queryMessageContainer, messages.UNABLE_TO_FETCH_DATA, "danger");
                });
        } else if (query.toUpperCase().startsWith("INSERT")) {
            console.log(JSON.stringify({ query }));
            fetch(SERVER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
            })
            .then(response => response.json())
            .then(data => {
                showMessage(queryMessageContainer, messages.INSERT_SUCCESS, "success");
            })
            .catch(err => {
                console.log(err);
                showMessage(queryMessageContainer, messages.UNABLE_TO_INSERT_DATA, "danger");
            });
        } else {
            showMessage(queryMessageContainer, messages.INVALID_REQUEST, "danger");
        }
    });

    function renderTable(data) {
        if (!Array.isArray(data) || data.length === 0) {
            responseArea.textContent = messages.NO_DATA_FOUND;
            return;
        }

        const columns = Object.keys(data[0]);
        
        const table = document.createElement("table");
        table.classList.add("table", "mt-3");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        columns.forEach(column => {
            const th = document.createElement("th");
            th.textContent = column;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        data.forEach(row => {
            const tr = document.createElement("tr");

            columns.forEach(column => {
                const td = document.createElement("td");
                let value = row[column];

                if (column.toLowerCase() === "dateofbirth" && value) {
                    value = new Date(value).toISOString().split("T")[0];
                }
                td.textContent = value || "-";
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        responseArea.innerHTML = "";
        responseArea.appendChild(table);
    }

    function showMessage(container, message, type) {
        container.innerHTML = `
            <div class="alert alert-${type} mt-3" role="alert">
                ${message}
            </div>
        `;
    }
    queryInput.addEventListener("input", () => {
        queryMessageContainer.innerHTML = ""
    })
});
