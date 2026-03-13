/**
 * Workshop Module
 */

let activeJobs = [
    { id: 'SK1045', vehicle: 'Mazda CX-5', task: 'Brake Pad Replacement', status: 'In Progress', progress: '35%', tech: 'Mechanic Sam', urgent: false },
    { id: 'SK1055', vehicle: 'Toyota Hilux', task: 'Full Service', status: 'Pending Parts', progress: '10%', tech: 'None', urgent: true },
    { id: 'SK1060', vehicle: 'Lexus RX', task: 'Body Work', status: 'In Progress', progress: '75%', tech: 'Body Shop A', urgent: false },
    { id: 'SK1065', vehicle: 'Nissan X-Trail', task: 'Oil Change', status: 'Completed', progress: '100%', tech: 'Mechanic Sam', urgent: false },
];

export function initWorkshop() {
    const container = document.createElement('div');
    container.className = 'workshop-module animate-fade-in';
    
    container.innerHTML = `
        <div class="workshop-header">
            <div class="page-title">
                <h3 style="font-size: 1.5rem;">Workshop Operations</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Manage active service jobs and workshop capacity</p>
            </div>
            <div style="display: flex; gap: 16px;">
                <div class="workshop-search-wrapper">
                    <i class="fas fa-search"></i>
                    <input type="text" id="job-search" class="workshop-search-input" placeholder="Search vehicle or job ID...">
                </div>
                <button class="btn btn-secondary" id="create-quotation-btn"><i class="fas fa-file-invoice-dollar"></i> Quotation</button>
                <button class="btn btn-secondary" id="create-lpo-btn"><i class="fas fa-file-signature"></i> LPO</button>
                <button class="btn btn-primary" id="create-job-btn"><i class="fas fa-plus"></i> Create Job Card</button>
            </div>
        </div>

        <div class="workshop-grid">
            <!-- Active Jobs Section -->
            <div class="jobs-column">
                <div id="job-list-container">
                    ${renderJobList(activeJobs)}
                </div>
            </div>

            <!-- Stats & Alerts Section -->
            <div class="stats-column">
                <div class="card glass-card">
                    <div class="card-header">
                        <h3>Workshop Capacity</h3>
                    </div>
                    
                    <div class="stat-card-mini">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Active Bays</span>
                            <span style="font-weight: 700; color: var(--accent-primary);">4 / 6</span>
                        </div>
                        <div class="job-progress-container">
                            <div class="job-progress-fill" style="width: 66%; background: var(--accent-primary);"></div>
                        </div>
                    </div>

                    <div class="stat-card-mini">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <span style="font-size: 0.9rem; color: var(--text-muted);">Efficiency Rate</span>
                            <span style="font-weight: 700; color: var(--accent-secondary);">88%</span>
                        </div>
                        <div class="job-progress-container">
                            <div class="job-progress-fill" style="width: 88%;"></div>
                        </div>
                    </div>

                    <div class="workshop-alerts" style="margin-top: 24px;">
                        <h4 style="font-size: 1rem; margin-bottom: 16px; color: #e74c3c; display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-exclamation-triangle"></i> Priority Alerts
                        </h4>
                        <div class="alert-item" style="padding: 12px; background: rgba(231, 76, 60, 0.08); border: 1px solid rgba(231, 76, 60, 0.2); border-radius: 8px; font-size: 0.85rem; color: #f28b82;">
                            <i class="fas fa-clock"></i> <strong>SK1055</strong> parts delayed by 48h
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add listeners
    setTimeout(() => {
        const searchInput = container.querySelector('#job-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const filtered = activeJobs.filter(job => 
                    job.vehicle.toLowerCase().includes(query) || 
                    job.id.toLowerCase().includes(query) ||
                    job.task.toLowerCase().includes(query)
                );
                const listContainer = container.querySelector('#job-list-container');
                if (listContainer) {
                    listContainer.innerHTML = renderJobList(filtered);
                }
            });
        }

        const createBtn = container.querySelector('#create-job-btn');
        if (createBtn) {
            createBtn.addEventListener('click', showCreateJobModal);
        }

        const quotaBtn = container.querySelector('#create-quotation-btn');
        if (quotaBtn) quotaBtn.addEventListener('click', () => showFinanceModal('Quotation'));

        const lpoBtn = container.querySelector('#create-lpo-btn');
        if (lpoBtn) lpoBtn.addEventListener('click', () => showFinanceModal('LPO'));
    }, 0);

    return container;
}

function showFinanceModal(type) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay animate-fade-in';
    modal.innerHTML = `
        <div class="modal-content" style="width: 650px;">
            <div class="modal-header">
                <h3>Create New ${type}</h3>
                <button class="btn-icon" id="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <form id="finance-form">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Client Name</label>
                        <input type="text" name="client" class="form-input" placeholder="Client or Supplier Name" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">${type} Reference</label>
                        <input type="text" name="ref" class="form-input" placeholder="e.g. ${type}-001" required>
                    </div>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <label class="form-label">Line Items</label>
                    <div id="line-items" style="display: flex; flex-direction: column; gap: 12px;">
                        <div class="form-row" style="grid-template-columns: 2fr 1fr 1fr;">
                            <input type="text" placeholder="Description" class="form-input" required>
                            <input type="number" placeholder="Qty" class="form-input" required>
                            <input type="number" placeholder="Price" class="form-input" required>
                        </div>
                    </div>
                    <button type="button" class="btn btn-sm btn-secondary mt-3" style="margin-top: 12px;"><i class="fas fa-plus"></i> Add Item</button>
                </div>

                <div class="form-group">
                    <label class="form-label">Notes / Terms</label>
                    <textarea class="form-input" style="height: 80px;" placeholder="Optional notes..."></textarea>
                </div>

                <div class="modal-footer">
                    <div style="margin-right: auto; font-family: 'Outfit'; font-weight: 600; font-size: 1.1rem; color: var(--accent-primary);">
                        Total: <span id="modal-total" style="color: var(--text-primary);">$0.00</span>
                    </div>
                    <button type="button" class="btn btn-secondary" id="cancel-modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Generate ${type}</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    const close = () => modal.remove();
    modal.querySelector('#close-modal').onclick = close;
    modal.querySelector('#cancel-modal').onclick = close;

    const lineItemsContainer = modal.querySelector('#line-items');
    const totalSpan = modal.querySelector('#modal-total');
    const addItemBtn = modal.querySelector('button[type="button"].btn-sm');

    const calculateTotal = () => {
        let total = 0;
        const rows = lineItemsContainer.querySelectorAll('.form-row');
        rows.forEach(row => {
            const qty = parseFloat(row.querySelector('input[type="number"]:nth-of-type(1)').value) || 0;
            const price = parseFloat(row.querySelector('input[type="number"]:nth-of-type(2)').value) || 0;
            total += qty * price;
        });
        totalSpan.textContent = `$${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    lineItemsContainer.addEventListener('input', calculateTotal);

    addItemBtn.onclick = () => {
        const row = document.createElement('div');
        row.className = 'form-row';
        row.style.display = 'grid';
        row.style.gridTemplateColumns = '2fr 1fr 1fr 40px';
        row.style.gap = '12px';
        row.style.marginBottom = '12px';
        row.innerHTML = `
            <input type="text" placeholder="Description" class="form-input" required>
            <input type="number" placeholder="Qty" class="form-input" required>
            <input type="number" placeholder="Price" class="form-input" required>
            <button type="button" class="btn-icon" style="color: #e74c3c;"><i class="fas fa-trash"></i></button>
        `;
        row.querySelector('button').onclick = () => {
            row.remove();
            calculateTotal();
        };
        lineItemsContainer.appendChild(row);
    };

    modal.querySelector('#finance-form').onsubmit = (e) => {
        e.preventDefault();
        alert(`${type} generated successfully!`);
        close();
    };
}

function showCreateJobModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay animate-fade-in';
    modal.innerHTML = `
        <div class="modal-content" style="width: 550px;">
            <div class="modal-header">
                <h3>Create Service Job Card</h3>
                <button class="btn-icon" id="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <form id="create-job-form">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Vehicle Model</label>
                        <input type="text" name="vehicle" class="form-input" placeholder="e.g. Toyota Land Cruiser" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Job ID</label>
                        <input type="text" name="id" class="form-input" placeholder="e.g. SK2000" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Service Task</label>
                    <input type="text" name="task" class="form-input" placeholder="e.g. Engine Overhaul" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Assign Technician</label>
                        <select name="tech" class="form-input" required>
                            <option value="Mechanic Sam">Mechanic Sam</option>
                            <option value="Mechanic John">Mechanic John</option>
                            <option value="Body Shop A">Body Shop A</option>
                            <option value="Electrician Ben">Electrician Ben</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Status</label>
                        <select name="status" class="form-input" required>
                            <option value="In Progress">In Progress</option>
                            <option value="Pending Parts">Pending Parts</option>
                            <option value="Scheduled">Scheduled</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="cancel-modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Create Job Card</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    const close = () => modal.remove();
    modal.querySelector('#close-modal').onclick = close;
    modal.querySelector('#cancel-modal').onclick = close;

    modal.querySelector('#create-job-form').onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newJob = {
            id: formData.get('id'),
            vehicle: formData.get('vehicle'),
            task: formData.get('task'),
            status: formData.get('status'),
            progress: '10%',
            tech: formData.get('tech'),
            urgent: formData.get('status') === 'Pending Parts'
        };

        activeJobs.unshift(newJob);
        const listContainer = document.querySelector('#job-list-container');
        if (listContainer) {
            listContainer.innerHTML = renderJobList(activeJobs);
        }
        close();
    };
}

function renderJobList(jobs) {
    if (jobs.length === 0) {
        return `
            <div style="text-align: center; padding: 48px; color: var(--text-muted); background: var(--bg-secondary); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 16px; opacity: 0.5;"></i>
                <p>No service jobs found matching your criteria.</p>
            </div>
        `;
    }
    return jobs.map(job => renderJobItem(job)).join('');
}

function renderJobItem(job) {
    const isUrgent = job.urgent || job.status === 'Pending Parts';
    return `
        <div class="job-item ${isUrgent ? 'urgent' : ''}" style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                <div>
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                        <h4 style="margin: 0; font-size: 1.1rem;">${job.vehicle}</h4>
                        <span style="color: var(--text-muted); font-size: 0.8rem; font-family: monospace;">#${job.id}</span>
                    </div>
                    <div style="color: var(--accent-secondary); font-size: 0.9rem; display: flex; align-items: center; gap: 6px;">
                        <i class="fas fa-tools" style="font-size: 0.8rem;"></i> ${job.task}
                    </div>
                </div>
                <div class="job-badge" style="background: ${isUrgent ? 'rgba(231, 76, 60, 0.1)' : 'rgba(46, 204, 113, 0.1)'}; color: ${isUrgent ? '#e74c3c' : '#2ecc71'};">
                    ${job.status}
                </div>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; color: var(--text-secondary);">
                <div style="flex: 1; margin-right: 32px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                        <span>Progress</span>
                        <span style="font-weight: 600;">${job.progress}</span>
                    </div>
                    <div class="job-progress-container">
                        <div class="job-progress-fill" style="width: ${job.progress}; background: ${isUrgent ? 'var(--accent-primary)' : 'var(--accent-secondary)'};"></div>
                    </div>
                </div>
                <div style="background: var(--bg-primary); padding: 8px 12px; border-radius: 6px; display: flex; align-items: center; gap: 8px; border: 1px solid var(--border-color);">
                    <i class="fas fa-user-wrench" style="color: var(--accent-primary);"></i>
                    <span>${job.tech}</span>
                </div>
            </div>
        </div>
    `;
}
