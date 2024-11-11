function getValuesFromTable(data) {
    if (data.status == "success") {
        const table = document.getElementById('resultTable');
        for (let i = 1; i < table.rows.length; i ++) {
            const row = table.rows[i]; 
            const cell1 = row.cells[0].innerText;
            const cell2 = row.cells[1].innerText;
            const cell3 = row.cells[2].innerText;
            const cell4 = row.cells[3].innerText;
            const cell5 = row.cells[4].innerText;
            const cell6 = row.cells[5].innerText;
            
            console.log(`Row ${i + 1}:`, cell1, cell2, cell3, cell4, cell5, cell6);
        }
    }    
}