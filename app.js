let currentMode = 'seleccion'; 

function setMode(mode) {
    currentMode = mode;
    document.getElementById('btn-seleccion').classList.toggle('active', mode === 'seleccion');
    document.getElementById('btn-club').classList.toggle('active', mode === 'club');
    renderApp();
}

function renderApp() {
    const grid = document.getElementById('main-grid');
    const counterDisplay = document.getElementById('global-counter');
    
    // 1. Contador Global
    const totalMundiales = playersData.reduce((acc, p) => acc + p[currentMode].titulos, 0);
    counterDisplay.innerHTML = `<span>${totalMundiales}</span> MUNDIALES JUGADOS`;

    // 2. Ranking
    const sortedPlayers = [...playersData].sort((a, b) => b[currentMode].titulos - a[currentMode].titulos);

    grid.innerHTML = sortedPlayers.map(p => {
        const data = p[currentMode];
        
        // CÁLCULO BALONES DE ORO: 1 cada 10 títulos
        const numBalones = Math.floor(data.titulos / 10);
        
        // CÁLCULO PROGRESO: El resto para llegar a los próximos 10
        const progresoProximo = data.titulos % 10;
        const porcentajeBarra = (progresoProximo / 10) * 100;

        const esLeyenda = data.titulos >= 20;

        // Generamos los trofeos 🏆 según el número exacto de Balones de Oro
        let trofeosHTML = "";
        for(let i = 0; i < numBalones; i++) {
            trofeosHTML += '<span class="ballon-icon">🏆</span>';
        }

        return `
            <div class="card">
                <img src="${data.escudo}" class="escudo-small">
                
                <div class="card-header">
                    <img src="${p.avatar}" class="avatar">
                    <div>
                        <h3 style="margin:0">${p.nombre}</h3>
                        <small style="color:var(--text-dim)">${data.nombre}</small>
                    </div>
                </div>

                <div class="stat-box">
                    <span class="titulos-count">${data.titulos}</span>
                    <small style="font-weight:700">TÍTULOS TOTALES</small>
                    
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${porcentajeBarra}%"></div>
                    </div>
                    <small style="color:var(--text-dim); font-size:0.7rem">
                        PRÓXIMO BALÓN DE ORO: ${progresoProximo}/10
                    </small>
                </div>

                <div class="balones-oro-row">
                    ${trofeosHTML}
                </div>

                ${esLeyenda ? '<div class="badge-legend">LEYENDA DEL MUNDIALITO</div>' : ''}
            </div>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', renderApp);