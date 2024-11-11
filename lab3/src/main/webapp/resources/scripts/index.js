function getValuesFromTable(data) {
    if (data.status == "success") {
        clearPoints();
        const table = document.getElementById('resultTable');
        for (let i = 1; i < table.rows.length; i ++) {
            const row = table.rows[i]; 

            const x = parseFloat(row.cells[0].innerText);
            const y = parseFloat(row.cells[1].innerText);
            const r = parseFloat(row.cells[2].innerText);
            const result = row.cells[3].innerText === "Hit";
            drawPoint(x, y, r, result);
            console.log(`Row ${i + 1}:`, x, y, r, result);
        }
    }    
}


function clearPoints(data) {
    const svg = document.querySelector("svg"); 
    const circles = svg.querySelectorAll("circle"); 
    circles.forEach(circle => circle.remove());
}

function drawPoint(x, y, r, result) {
    const svg = document.querySelector("svg"); 
    const scaleFactor = 150 / r;
    const scaledX = x * scaleFactor; 
    const scaledY = -y * scaleFactor;

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute("cx", scaledX); 
    circle.setAttribute("cy", scaledY);
    circle.setAttribute("r", 5); 
    circle.setAttribute("fill", result ? "green" : "red");

    svg.appendChild(circle);
}
window.onload = getValuesFromTable();