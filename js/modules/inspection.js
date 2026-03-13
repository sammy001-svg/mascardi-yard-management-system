/**
 * Inspection & Damage Management Module
 */

export function initInspection() {
    const container = document.createElement('div');
    container.className = 'inspection-module animate-fade-in';
    
    container.innerHTML = `
        <div class="inspection-grid" style="display: grid; grid-template-columns: 1fr 400px; gap: 32px;">
            <!-- Damage Mapping -->
            <div class="card glass-card">
                <div class="card-header">
                    <h3>Interactive Damage Mapping</h3>
                    <div class="tag-tools" style="display: flex; gap: 8px;">
                        <span class="damage-tool active" data-type="scratch">Scratch</span>
                        <span class="damage-tool" data-type="dent">Dent</span>
                        <span class="damage-tool" data-type="crack">Crack</span>
                    </div>
                </div>
                
                <div class="car-blueprint-container" id="car-blueprint">
                    <!-- Simple SVG Car Outline -->
                    <svg viewBox="0 0 800 400" class="car-svg">
                        <path d="M100,200 Q100,100 200,80 L600,80 Q700,100 700,200 L700,300 Q700,350 600,350 L200,350 Q100,350 100,200" fill="none" stroke="var(--text-muted)" stroke-width="2" />
                        <circle cx="200" cy="350" r="30" fill="var(--bg-tertiary)" stroke="var(--text-muted)" />
                        <circle cx="600" cy="350" r="30" fill="var(--bg-tertiary)" stroke="var(--text-muted)" />
                        <rect x="250" y="100" width="300" height="80" rx="10" fill="none" stroke="var(--text-muted)" />
                    </svg>
                    <div id="damage-markers"></div>
                </div>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 16px;">Click on the diagram to tag damage locations.</p>
            </div>

            <!-- Checklist -->
            <div class="card">
                <div class="card-header">
                    <h3>Inspection Checklist</h3>
                </div>
                <div class="checklist-items mt-4">
                    ${renderCheckItem('Engine Oil Level')}
                    ${renderCheckItem('Tire Tread Depth')}
                    ${renderCheckItem('Interior Cleanliness')}
                    ${renderCheckItem('Fluid Leaks Check')}
                    ${renderCheckItem('Electrical Systems')}
                    ${renderCheckItem('Brake Pad Wear')}
                </div>
                <button class="btn btn-primary w-100" style="width: 100%; margin-top: 24px;">Complete Inspection</button>
            </div>
        </div>
    `;

    // Logic for damage markers
    setTimeout(() => {
        const blueprint = container.querySelector('#car-blueprint');
        const markers = container.querySelector('#damage-markers');
        blueprint.addEventListener('click', (e) => {
            const rect = blueprint.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const marker = document.createElement('div');
            marker.className = 'damage-point';
            marker.style.left = `${x}px`;
            marker.style.top = `${y}px`;
            marker.innerHTML = '!';
            markers.appendChild(marker);
        });
    }, 0);

    return container;
}

function renderCheckItem(label) {
    return `
        <div class="check-item" style="padding: 12px 0; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 12px;">
            <input type="checkbox">
            <label style="font-size: 0.9rem;">${label}</label>
        </div>
    `;
}
