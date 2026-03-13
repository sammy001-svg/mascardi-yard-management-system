/**
 * Key & Document Control Module
 */

export function initKeys() {
    const container = document.createElement('div');
    container.className = 'keys-module animate-fade-in';
    
    container.innerHTML = `
        <div class="keys-grid" style="display: grid; grid-template-columns: 1fr 350px; gap: 32px;">
            <!-- Key Log -->
            <div class="card">
                <div class="card-header">
                    <h3>Digital Key Log</h3>
                    <button class="btn btn-sm btn-primary">Authorize Handover</button>
                </div>
                <table class="keys-table mt-4" style="width: 100%; border-collapse: collapse; margin-top: 24px;">
                    <thead>
                        <tr style="text-align: left; border-bottom: 1px solid var(--border-color); color: var(--text-secondary);">
                            <th style="padding: 12px;">Stock ID</th>
                            <th style="padding: 12px;">Vehicle</th>
                            <th style="padding: 12px;">Held By</th>
                            <th style="padding: 12px;">Duration</th>
                            <th style="padding: 12px;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderKeyRow('SK1042', 'Toyota Prado', 'Sam K.', '1h 20m', 'In Use')}
                        ${renderKeyRow('SK1045', 'Mazda CX-5', 'Cabinet B1', '-', 'Secure')}
                        ${renderKeyRow('SK1048', 'Subaru Forester', 'Mary A.', '45m', 'In Use')}
                        ${renderKeyRow('SK1050', 'Harrier', 'Cabinet A4', '-', 'Secure')}
                    </tbody>
                </table>
            </div>

            <!-- Document Vault -->
            <div class="card glass-card">
                <div class="card-header">
                    <h3>Document Vault</h3>
                </div>
                <div class="doc-list mt-4">
                    ${renderDocItem('Customs Clearance', 'PDF', '14/03/2026')}
                    ${renderDocItem('Registration - KDL 123X', 'IMG', '14/03/2026')}
                    ${renderDocItem('Inspection Certificate', 'PDF', '15/03/2026')}
                </div>
                <button class="btn w-100" style="width: 100%; margin-top: 24px; background: var(--bg-tertiary);"><i class="fas fa-upload"></i> Upload Document</button>
            </div>
        </div>
    `;

    return container;
}

function renderKeyRow(id, vehicle, holder, duration, status) {
    const statusColor = status === 'Secure' ? '#2ecc71' : 'var(--accent-primary)';
    return `
        <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.9rem;">
            <td style="padding: 16px;">${id}</td>
            <td style="padding: 16px;">${vehicle}</td>
            <td style="padding: 16px;">${holder}</td>
            <td style="padding: 16px; color: var(--text-muted);">${duration}</td>
            <td style="padding: 16px;"><span class="badge" style="background: rgba(46, 204, 113, 0.1); color: #2ecc71; padding: 4px 10px; border-radius: 4px; font-weight: 500;">${status}</span></td>
        </tr>
    `;
}

function renderDocItem(name, type, date) {
    return `
        <div class="doc-item" style="padding: 12px; background: var(--bg-tertiary); border-radius: var(--radius-md); margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="fas ${type === 'PDF' ? 'fa-file-pdf text-danger' : 'fa-file-image text-info'}"></i>
                <div>
                    <div style="font-size: 0.9rem; font-weight: 500;">${name}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${date}</div>
                </div>
            </div>
            <i class="fas fa-eye" style="cursor: pointer; color: var(--accent-secondary);"></i>
        </div>
    `;
}
