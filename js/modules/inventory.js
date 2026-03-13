/**
 * Inventory & Stock Control Module
 */

const state = {
    currentSubView: 'hub', // 'hub', 'vehicles', 'parts'
    inventory: [
        { id: 'SK1042', vin: 'JTD12345678901234', detail: 'Toyota Prado (2022) - Pearl White', status: 'Available', location: 'Zone A - Slot 12', make: 'Toyota', model: 'Prado', year: '2022', color: 'Pearl White', engine: '2.8L Diesel', trans: 'Automatic', mileage: '12,500 km', price: 'Ksh 45,000', source: 'Import - Japan', arrival: '2026-03-01' },
        { id: 'SK1045', vin: 'JTD09876543210987', detail: 'Mazda CX-5 (2021) - Metallic Black', status: 'In Workshop', location: 'Zone B - Slot 05', make: 'Mazda', model: 'CX-5', year: '2021', color: 'Black Metallic', engine: '2.5L Gas', trans: 'Automatic', mileage: '34,000 km', price: 'Ksh 28,000', source: 'Local Auction', arrival: '2026-03-05' },
        { id: 'SK1048', vin: 'JTD11223344556677', detail: 'Subaru Forester (2023) - Silver', status: 'Reserved', location: 'Zone C - Slot 02', make: 'Subaru', model: 'Forester', year: '2023', color: 'Silver', engine: '2.0L Boxer', trans: 'CVT', mileage: '5,000 km', price: 'Ksh 35,000', source: 'Direct Trade', arrival: '2026-03-08' },
        { id: 'SK1050', vin: 'JTD99887766554433', detail: 'Toyota Harrier (2022) - Dark Blue', status: 'Under Inspection', location: 'Zone A - Slot 24', make: 'Toyota', model: 'Harrier', year: '2022', color: 'Dark Blue', engine: '2.5L Hybrid', trans: 'eCVT', mileage: '18,200 km', price: 'Ksh 41,000', source: 'Import - Japan', arrival: '2026-03-09' },
        { id: 'SK1052', vin: 'JTD55443322110099', detail: 'Nissan X-Trail (2021) - Wine Red', status: 'Available', location: 'Zone A - Slot 15', make: 'Nissan', model: 'X-Trail', year: '2021', color: 'Wine Red', engine: '1.5L Turbo', trans: 'CVT', mileage: '22,100 km', price: 'Ksh 26,500', source: 'Local Auction', arrival: '2026-03-10' },
        { id: 'SK1060', vin: 'JTD99001122334455', detail: 'Range Rover Sport (2020) - Grey', status: 'Sold', location: 'Dispatch Zone', make: 'Range Rover', model: 'Sport', year: '2020', color: 'Grey', engine: '3.0L V6', trans: 'Automatic', mileage: '45,000 km', price: 'Ksh 72,000', source: 'Exotic Imports', arrival: '2026-02-15' }
    ],
    parts: [
        { id: 'P-900', name: 'Brake Pad Set', description: 'Semi-metallic high-performance pads for Toyota Prado.', category: 'Braking', stock: 12, price: 'Ksh 120', supplier: 'AutoParts Direct', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=200' },
        { id: 'P-901', name: 'Oil Filter', description: 'Synthetic blend filter for Mazda CX-5 (2018-2023).', category: 'Maintenance', stock: 45, price: 'Ksh 15', supplier: 'Mascus Spares', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=200' },
        { id: 'P-905', name: 'Headlight Assembly', description: 'Left-hand side LED assembly for Toyota Harrier.', category: 'Electrical', stock: 3, price: 'Ksh 450', supplier: 'Mascus Spares', image: 'https://images.unsplash.com/photo-1549399542-7bd3f896055e?auto=format&fit=crop&q=80&w=200' },
        { id: 'P-910', name: 'Alloy Rim 18"', description: 'Multispoke black finish alloy rim.', category: 'Exterior', stock: 20, price: 'Ksh 210', supplier: 'WheelWorld Ltd', image: 'https://images.unsplash.com/photo-1594032194509-00160eff2c04?auto=format&fit=crop&q=80&w=200' }
    ]
};

export function initInventory() {
    const container = document.createElement('div');
    container.className = 'inventory-module animate-fade-in';
    
    render(container);
    return container;
}

function render(container) {
    if (state.currentSubView === 'hub') {
        renderSelectionHub(container);
    } else if (state.currentSubView === 'vehicles') {
        renderVehicleInventory(container);
    } else if (state.currentSubView === 'parts') {
        renderPartsInventory(container);
    }
}

function renderSelectionHub(container) {
    container.innerHTML = `
        <div class="selection-hub" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center;">
            <div style="margin-bottom: 48px;" class="animate-fade-in">
                <h2 style="font-size: 2.25rem; color: var(--text-primary); margin-bottom: 12px; font-weight: 800; letter-spacing: -1px;">Inventory Hub</h2>
                <p style="color: var(--text-secondary); max-width: 500px; font-size: 1.1rem;">Choose a category to proceed to the management dashboard.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 32px; width: 100%; max-width: 1000px;">
                <!-- Vehicle Inventory Card -->
                <div class="card glass-card hover-glow animate-fade-in" id="select-vehicles" style="cursor: pointer; padding: 48px; transition: all 0.3s; border: 1px solid var(--border-color); display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 80px; height: 80px; border-radius: 20px; background: rgba(212, 175, 55, 0.1); color: var(--accent-primary); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin-bottom: 24px;">
                        <i class="fas fa-car"></i>
                    </div>
                    <h3 style="margin-bottom: 16px; font-size: 1.5rem;">Vehicle Inventory</h3>
                    <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 32px; line-height: 1.6;">Stock control, VIN decoding, registration, and digital document management.</p>
                    <div class="btn btn-primary" style="width: 100%; justify-content: center; pointer-events: none;">Enter Vehicle Hub <i class="fas fa-arrow-right" style="margin-left: 12px;"></i></div>
                </div>

                <!-- Parts Inventory Card -->
                <div class="card glass-card hover-glow animate-fade-in" id="select-parts" style="cursor: pointer; padding: 48px; transition: all 0.3s; border: 1px solid var(--border-color); display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 80px; height: 80px; border-radius: 20px; background: rgba(93, 173, 226, 0.1); color: var(--accent-secondary); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin-bottom: 24px;">
                        <i class="fas fa-cogs"></i>
                    </div>
                    <h3 style="margin-bottom: 16px; font-size: 1.5rem;">Parts Inventory</h3>
                    <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 32px; line-height: 1.6;">Spare parts, procurement logs, PO management, and stock alerts.</p>
                    <div class="btn btn-secondary" style="width: 100%; justify-content: center; pointer-events: none; border-color: var(--accent-secondary); color: var(--accent-secondary);">Enter Parts Hub <i class="fas fa-arrow-right" style="margin-left: 12px;"></i></div>
                </div>
            </div>
        </div>
    `;

    container.querySelector('#select-vehicles').onclick = () => {
        state.currentSubView = 'vehicles';
        render(container);
    };

    container.querySelector('#select-parts').onclick = () => {
        state.currentSubView = 'parts';
        render(container);
    };
}

function renderVehicleInventory(container) {
    container.innerHTML = `
        <div class="inventory-dashboard animate-fade-in" style="display: flex; flex-direction: column; gap: 32px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <button class="btn btn-secondary" id="back-to-hub"><i class="fas fa-chevron-left"></i> Change Category</button>
                <div style="color: var(--text-muted); font-size: 0.9rem;">Section: <span style="color: var(--accent-primary); font-weight: 600;">Vehicle Units</span></div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
                ${renderMetricCard('Total Units', state.inventory.length, 'fas fa-car', 'var(--accent-primary)')}
                ${renderMetricCard('Available', state.inventory.filter(v => v.status === 'Available').length, 'fas fa-check-circle', '#2ecc71')}
                ${renderMetricCard('Reserved', state.inventory.filter(v => v.status === 'Reserved').length, 'fas fa-id-card', 'var(--accent-secondary)')}
                ${renderMetricCard('In Workshop', state.inventory.filter(v => v.status === 'In Workshop').length, 'fas fa-tools', '#e67e22')}
                ${renderMetricCard('Pending', state.inventory.filter(v => v.status === 'Under Inspection').length, 'fas fa-hourglass-half', '#f1c40f')}
            </div>

            <div class="card">
                <div class="card-header">
                    <h3>Vehicle Inventory & Stock Control</h3>
                    <div class="inventory-actions" style="display: flex; gap: 12px;">
                        <button class="btn btn-secondary" id="bulk-import-btn"><i class="fas fa-file-import"></i> Bulk Import</button>
                        <button class="btn btn-primary" id="add-vehicle-btn"><i class="fas fa-plus"></i> New Registration</button>
                    </div>
                </div>

                <div class="inventory-table-wrapper" style="margin-top: 24px; overflow-x: auto;">
                    <table class="inventory-table">
                        <thead>
                            <tr>
                                <th>Stock ID</th>
                                <th>VIN / Registration</th>
                                <th>Make & Model</th>
                                <th>Spec / Engine</th>
                                <th>Status</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="inventory-body">
                            ${state.inventory.map(v => renderInventoryRow(v)).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    container.querySelector('#back-to-hub').onclick = () => {
        state.currentSubView = 'hub';
        render(container);
    };

    attachInventoryListeners(container);
}

function renderPartsInventory(container) {
    container.innerHTML = `
        <div class="parts-inventory animate-fade-in" style="display: flex; flex-direction: column; gap: 32px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <button class="btn btn-secondary" id="back-to-hub"><i class="fas fa-chevron-left"></i> Change Category</button>
                <div style="color: var(--text-muted); font-size: 0.9rem;">Section: <span style="color: var(--accent-secondary); font-weight: 600;">Parts & Spares</span></div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
                ${renderMetricCard('Total Spares', 68, 'fas fa-gears', 'var(--accent-secondary)')}
                ${renderMetricCard('Low Stock', 3, 'fas fa-exclamation-triangle', '#e74c3c')}
                ${renderMetricCard('Active POs', 12, 'fas fa-file-invoice-dollar', '#f1c40f')}
                ${renderMetricCard('Total Value', 'Ksh 14.2M', 'fas fa-sack-dollar', '#2ecc71')}
            </div>

            <div class="card">
                <div class="card-header">
                    <h3>Parts Inventory & Procurement</h3>
                    <div class="inventory-actions" style="display: flex; gap: 12px;">
                        <button class="btn btn-secondary"><i class="fas fa-shopping-cart"></i> Procurement Logs</button>
                        <button class="btn btn-primary"><i class="fas fa-plus"></i> Add New Part</button>
                    </div>
                </div>

                <div class="inventory-table-wrapper" style="margin-top: 24px; overflow-x: auto;">
                    <table class="inventory-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Part ID</th>
                                <th>Name / Description</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Supplier</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${state.parts.map(p => `
                                <tr>
                                    <td>
                                        <img src="${p.image}" class="part-thumbnail" data-part="${p.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-color); cursor: pointer; transition: transform 0.2s;">
                                    </td>
                                    <td style="font-weight: 600;">${p.id}</td>
                                    <td>
                                        <div style="font-weight: 600;">${p.name}</div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted);">${p.description}</div>
                                    </td>
                                    <td><span class="badge" style="background: var(--bg-tertiary);">${p.category}</span></td>
                                    <td style="font-weight: 700; color: ${p.stock < 10 ? '#e74c3c' : 'inherit'}">${p.stock} Units</td>
                                    <td>${p.price}</td>
                                    <td>${p.supplier}</td>
                                    <td>
                                        <button class="btn-icon btn-sm"><i class="fas fa-edit"></i></button>
                                        <button class="btn-icon btn-sm"><i class="fas fa-history"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    container.querySelector('#back-to-hub').onclick = () => {
        state.currentSubView = 'hub';
        render(container);
    };

    // Attach image preview listeners
    container.querySelectorAll('.part-thumbnail').forEach(img => {
        img.onclick = () => showImagePreviewModal(img.src, img.getAttribute('data-part'));
    });
}

function renderMetricCard(label, value, icon, color) {
    return `
        <div class="card glass-card" style="padding: 20px; text-align: center;">
            <div style="font-size: 1.5rem; color: ${color}; margin-bottom: 8px;"><i class="${icon}"></i></div>
            <div style="font-size: 1.25rem; font-weight: 700;">${value}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; text-transform: uppercase;">${label}</div>
        </div>
    `;
}

function renderInventoryRow(v) {
    let statusClass = 'badge-available';
    if (v.status === 'In Workshop') statusClass = 'badge-workshop';
    if (v.status === 'Reserved') statusClass = 'badge-reserved';
    if (v.status === 'Under Inspection') statusClass = 'badge-inspection';
    if (v.status === 'Sold') statusClass = 'badge-reserved';

    return `
        <tr>
            <td style="font-weight: 600;">${v.id}</td>
            <td>
                <div style="font-family: monospace; color: var(--text-primary); font-size: 0.85rem;">${v.vin}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Entered: ${v.arrival}</div>
            </td>
            <td>
                <div style="font-weight: 600;">${v.make} ${v.model}</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${v.year} • ${v.color}</div>
            </td>
            <td>
                <div style="font-size: 0.85rem;">${v.engine}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${v.trans} • ${v.mileage}</div>
            </td>
            <td><span class="badge ${statusClass}">${v.status}</span></td>
            <td style="color: var(--accent-secondary); font-size: 0.85rem;"><i class="fas fa-map-marker-alt" style="margin-right: 4px;"></i>${v.location}</td>
            <td>
                <button class="btn-icon btn-sm" title="Print Tag"><i class="fas fa-barcode"></i></button>
                <button class="btn-icon btn-sm" title="Edit Vehicle"><i class="fas fa-edit"></i></button>
                <button class="btn-icon btn-sm" id="view-vault-${v.id}" title="Vehicle Vault"><i class="fas fa-folder-open"></i></button>
            </td>
        </tr>
    `;
}

function attachInventoryListeners(container) {
    const addBtn = container.querySelector('#add-vehicle-btn');
    if (addBtn) addBtn.onclick = () => showRegistrationModal(container);
    
    const bulkBtn = container.querySelector('#bulk-import-btn');
    if (bulkBtn) bulkBtn.onclick = () => alert('Bulk Import: Simulation started.');
    
    state.inventory.forEach(v => {
        const btn = container.querySelector(`#view-vault-${v.id}`);
        if (btn) btn.onclick = () => showVehicleVaultModal(v);
    });
}

function showVehicleVaultModal(v) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay animate-fade-in';
    
    modal.innerHTML = `
        <div class="modal-content" style="width: 950px; height: 85vh; display: flex; flex-direction: column;">
            <div class="modal-header">
                <div>
                    <h3>Vehicle Vault: ${v.id}</h3>
                    <p style="font-size: 0.85rem; color: var(--text-muted);">${v.make} ${v.model} (${v.year})</p>
                </div>
                <button class="btn btn-sm" id="close-vault" style="background: none; font-size: 1.5rem; color: var(--text-muted);"><i class="fas fa-times"></i></button>
            </div>

            <div style="display: grid; grid-template-columns: 240px 1fr; gap: 32px; flex: 1; overflow: hidden;">
                <div style="border-right: 1px solid var(--border-color); padding-right: 20px;">
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
                        <li class="vault-tab active" data-view="photos" style="padding: 12px 16px; border-radius: 8px; cursor: pointer;"><i class="fas fa-camera" style="margin-right: 12px; width: 20px;"></i> Photos</li>
                        <li class="vault-tab" data-view="docs" style="padding: 12px 16px; border-radius: 8px; cursor: pointer;"><i class="fas fa-file-lines" style="margin-right: 12px; width: 20px;"></i> Documents</li>
                        <li class="vault-tab" data-view="history" style="padding: 12px 16px; border-radius: 8px; cursor: pointer;"><i class="fas fa-history" style="margin-right: 12px; width: 20px;"></i> Service History</li>
                    </ul>
                </div>
                <div id="vault-view-container" style="overflow-y: auto;">
                    <div class="grid-photos" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                        <img src="https://images.unsplash.com/photo-1549399542-7bd3f896055e?auto=format&fit=crop&w=400" style="width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 8px;">
                        <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=400" style="width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 8px;">
                        <img src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=400" style="width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 8px;">
                        <div class="upload-placeholder" style="aspect-ratio: 4/3;"><i class="fas fa-plus"></i> Add Photo</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector('#close-vault').onclick = () => document.body.removeChild(modal);
}

function showRegistrationModal(container) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay animate-fade-in';
    const nextId = `SK${1060 + state.inventory.length + 1}`;
    
    modal.innerHTML = `
        <div class="modal-content" style="width: 800px;">
            <div class="modal-header">
                <div>
                    <h3>New Vehicle Registration</h3>
                    <p style="color: var(--text-muted);">Assigning Stock ID: ${nextId}</p>
                </div>
                <button class="btn btn-sm" id="close-reg" style="background: none; font-size: 1.5rem; color: var(--text-muted);"><i class="fas fa-times"></i></button>
            </div>
            
            <form id="reg-form" style="display: grid; gap: 20px;">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">VIN Number</label>
                        <div style="display: flex; gap: 10px;">
                            <input type="text" class="form-input" id="vin-input" placeholder="Enter 17-digit VIN" style="text-transform: uppercase;">
                            <button type="button" class="btn btn-primary" id="decode-btn">Decode</button>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Make</label>
                        <input type="text" class="form-input" id="make" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Model</label>
                        <input type="text" class="form-input" id="model" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Year</label>
                        <input type="number" class="form-input" id="year" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Engine Specification</label>
                        <input type="text" class="form-input" id="engine" placeholder="e.g. 2.0L Hybrid" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="cancel-reg">Cancel</button>
                    <button type="submit" class="btn btn-primary">Proceed with Entry</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    
    const close = () => document.body.removeChild(modal);
    modal.querySelector('#close-reg').onclick = close;
    modal.querySelector('#cancel-reg').onclick = close;

    modal.querySelector('#reg-form').onsubmit = (e) => {
        e.preventDefault();
        const newV = {
            id: nextId,
            vin: modal.querySelector('#vin-input').value || 'MOCK-' + Date.now(),
            make: modal.querySelector('#make').value,
            model: modal.querySelector('#model').value,
            year: modal.querySelector('#year').value,
            color: 'TBD',
            engine: modal.querySelector('#engine').value,
            trans: 'Manual',
            mileage: '0 km',
            status: 'Under Inspection',
            location: 'Intake Bay',
            arrival: new Date().toISOString().split('T')[0]
        };
        state.inventory.unshift(newV);
        render(container);
        close();
    };

    modal.querySelector('#decode-btn').onclick = () => {
        modal.querySelector('#make').value = 'TOYOTA';
        modal.querySelector('#model').value = 'VOXY';
        modal.querySelector('#year').value = '2023';
        modal.querySelector('#engine').value = '1.8L Hybrid';
    };
}

function showImagePreviewModal(url, title) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay animate-fade-in';
    modal.style.zIndex = '2000'; // Above other modals
    modal.style.background = 'rgba(0, 0, 0, 0.95)'; // Blacker backdrop for immersion
    
    modal.innerHTML = `
        <div class="modal-content" style="width: auto; max-width: 95vw; height: 95vh; padding: 20px; background: none; border: none; box-shadow: none; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="width: 100%; max-width: 1200px; display: flex; justify-content: space-between; margin-bottom: 20px; font-weight: 700; color: white; font-size: 1.2rem;">
                <span>${title}</span>
                <button id="close-preview" style="background: rgba(255,255,255,0.1); border: none; color: white; cursor: pointer; font-size: 1.2rem; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s;"><i class="fas fa-times"></i></button>
            </div>
            <img src="${url}" style="max-width: 100%; max-height: 85vh; border-radius: 12px; box-shadow: 0 30px 60px rgba(0,0,0,0.8); border: 2px solid rgba(255,255,255,0.1); object-fit: contain;">
        </div>
    `;

    document.body.appendChild(modal);
    modal.onclick = (e) => { if(e.target === modal) document.body.removeChild(modal); };
    modal.querySelector('#close-preview').onclick = () => document.body.removeChild(modal);
    modal.querySelector('#close-preview').onmouseover = (e) => { e.currentTarget.style.background = 'rgba(231, 76, 60, 0.8)'; };
    modal.querySelector('#close-preview').onmouseout = (e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; };
}
