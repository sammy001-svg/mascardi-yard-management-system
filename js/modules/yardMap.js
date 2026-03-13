/**
 * Yard Mapping Module
 */

export function initYardMap() {
    const container = document.createElement('div');
    container.className = 'yard-module animate-fade-in';
    
    container.innerHTML = `
        <div class="yard-controls card glass-card mb-4" style="margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="yard-legend">
                    <span class="legend-item"><span class="swatch available"></span> Available</span>
                    <span class="legend-item"><span class="swatch occupied"></span> Occupied</span>
                    <span class="legend-item"><span class="swatch reserved"></span> Reserved</span>
                </div>
                <div class="yard-stats" style="display: flex; gap: 24px;">
                    <div>Active Zone: <strong>Zone A (Imports)</strong></div>
                    <div>Capacity: <strong>142 / 200 (71%)</strong></div>
                </div>
            </div>
        </div>

            <div class="yard-grid-container">
                ${renderZone('Zone A - Main Yard', 40)}
                ${renderZone('Zone B - Workshop', 15)}
                ${renderZone('Zone C - Showroom', 10)}
            </div>
    `;

    return container;
}

function renderZone(name, count) {
    let slots = '';
    for (let i = 1; i <= count; i++) {
        const status = Math.random() > 0.3 ? 'occupied' : 'available';
        const tooltip = status === 'occupied' ? 'Toyota Prado - KDL 123X' : 'Empty Slot';
        slots += `<div class="yard-slot ${status}" title="${tooltip}">${i}</div>`;
    }

    return `
        <div class="yard-zone card">
            <h4>${name}</h4>
            <div class="slots-grid">
                ${slots}
            </div>
        </div>
    `;
}
