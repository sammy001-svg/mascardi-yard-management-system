/**
 * Vehicle Movement Tracking Module
 */

export function initTracking() {
    const container = document.createElement('div');
    container.className = 'tracking-module animate-fade-in';
    
    container.innerHTML = `
        <div class="tracking-grid">
            <!-- New Movement Form -->
            <div class="card glass-card">
                <div class="card-header">
                    <h3>Log New Movement</h3>
                </div>
                <form id="move-form" class="mt-4">
                    <div class="form-group">
                        <label class="form-label">Search Vehicle (VIN / Stock ID)</label>
                        <div style="display: flex; gap: 12px;">
                            <input type="text" class="form-input" placeholder="Type to search...">
                            <button type="button" class="btn" style="background: var(--bg-tertiary);"><i class="fas fa-qrcode"></i> Scan</button>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Current Location</label>
                            <input type="text" class="form-input" value="Zone A - Slot 12" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Move To</label>
                            <select class="form-input">
                                <option>Wash Bay</option>
                                <option>Workshop</option>
                                <option>Sales Display</option>
                                <option>Zone B - Storage</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Reason for movement</label>
                        <textarea class="form-input" rows="2" placeholder="e.g. Scheduled Maintenance"></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary w-100" style="width: 100%;">Authorize Movement</button>
                </form>
            </div>

            <!-- Movement Log -->
            <div class="card">
                <div class="card-header">
                    <h3>Movement History</h3>
                    <div class="filter-btns">
                        <button class="btn btn-sm" style="background: var(--bg-tertiary); font-size: 12px;">Today</button>
                        <button class="btn btn-sm" style="background: var(--bg-tertiary); font-size: 12px;">This Week</button>
                    </div>
                </div>
                <div class="movement-log-list">
                    ${renderLogItem('Toyota Harrier', 'Zone A → Wash Bay', '12:45 PM', 'JD')}
                    ${renderLogItem('Subaru Forester', 'Workshop → Sales Row 1', '11:20 AM', 'SK')}
                    ${renderLogItem('Mazda CX-5', 'Intake → Zone B', '09:15 AM', 'MA')}
                    ${renderLogItem('Nissan X-Trail', 'Zone C → Dispatch Bay', '08:30 AM', 'JD')}
                </div>
            </div>
        </div>
    `;

    return container;
}

function renderLogItem(car, route, time, user) {
    return `
        <div class="log-item" style="padding: 16px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <div class="log-info">
                <div style="font-weight: 600;">${car}</div>
                <div style="font-size: 0.8rem; color: var(--accent-secondary);">${route}</div>
            </div>
            <div class="log-meta" style="text-align: right;">
                <div style="font-size: 0.85rem;">${time}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${user}</div>
            </div>
        </div>
    `;
}
