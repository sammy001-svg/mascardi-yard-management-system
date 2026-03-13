/**
 * Sales CRM Module
 */

export const state = {
    leads: [
        { id: '1', vehicleId: 'SK1042', source: 'Website Inq.', client: 'Alice Johnson', phone: '+254 712 345 678', email: 'alice.j@example.com', stage: 'Negotiation', salesperson: 'John Smith', value: 'Ksh 4,500,000', delivery: 'Pending', date: '2026-03-10', comments: 'Requested a test drive next week. Very interested in the Pearl White color.', followUp: '2026-03-15T10:00' },
        { id: '2', vehicleId: 'SK1045', source: 'Facebook Ads', client: 'Bob Smith', phone: '+254 722 987 654', email: 'bob.smith@gmail.com', stage: 'Initial Inquiry', salesperson: 'Mary Ann', value: 'Ksh 3,850,000', delivery: 'Not Started', date: '2026-03-11', comments: 'Needs financing options before proceeding.', followUp: '2026-03-12T14:30' },
        { id: '3', vehicleId: 'SK1048', source: 'Referral', client: 'Catherine Reed', phone: '+254 733 111 222', email: 'creed@corporate.co.ke', stage: 'Closing', salesperson: 'John Smith', value: 'Ksh 4,220,000', delivery: 'In Transit', date: '2026-03-09', comments: 'Awaiting final sign-off from management.', followUp: '2026-03-14T09:00' },
        { id: '4', vehicleId: 'SK1050', source: 'Walk-in', client: 'David Miller', phone: '+254 700 555 444', email: 'davidkmiller@yahoo.com', stage: 'Follow-up', salesperson: 'Sam K.', value: 'Ksh 5,100,000', delivery: 'Delivered', date: '2026-03-08', comments: 'Car delivered successfully. Called to check in.', followUp: '2026-03-20T11:00' },
        { id: '5', vehicleId: 'SK1055', source: 'Website Inq.', client: 'Sarah Williams', phone: '+254 744 888 777', email: 'sarah.w@creative.io', stage: 'Initial Inquiry', salesperson: 'Mary Ann', value: 'Ksh 2,900,000', delivery: 'Not Started', date: '2026-03-11', comments: 'Comparing with Nissan X-Trail.', followUp: '2026-03-13T16:00' },
        { id: '6', vehicleId: 'SK1060', source: 'Instagram', client: 'Michael Chen', phone: '+254 799 333 111', email: 'm.chen@logistics.com', stage: 'Test Drive', salesperson: 'Sam K.', value: 'Ksh 6,200,000', delivery: 'Pending', date: '2026-03-10', comments: 'Loved the test drive, bringing spouse tomorrow.', followUp: '2026-03-12T10:00' },
        { id: '7', vehicleId: 'SK1065', source: 'Walk-in', client: 'Emma Brown', phone: '+254 755 222 999', email: 'emma.b1990@gmail.com', stage: 'Negotiation', salesperson: 'John Smith', value: 'Ksh 1,580,000', delivery: 'Not Started', date: '2026-03-09', comments: 'Offered 1.5M, waiting for manager approval.', followUp: '2026-03-11T15:00' },
        { id: '8', vehicleId: 'SK1070', source: 'Referral', client: 'James Wilson', phone: '+254 711 444 888', email: 'jwilson.arch@design.co', stage: 'Closing', salesperson: 'Mary Ann', value: 'Ksh 5,500,000', delivery: 'In Transit', date: '2026-03-07', comments: 'Deposit paid. Car arriving next week.', followUp: '2026-03-18T09:30' },
        { id: '9', vehicleId: 'SK1075', source: 'Facebook Ads', client: 'Linda Garcia', phone: '+254 733 666 555', email: 'lgarcia.events@outlook.com', stage: 'Follow-up', salesperson: 'Sam K.', value: 'Ksh 3,340,000', delivery: 'Not Started', date: '2026-03-06', comments: 'Still deciding on color.', followUp: '2026-03-14T13:00' },
        { id: '10', vehicleId: 'SK1080', source: 'Website Inq.', client: 'Robert Taylor', phone: '+254 722 123 987', email: 'rtaylor@finance.co.ke', stage: 'Initial Inquiry', salesperson: 'John Smith', value: 'Ksh 4,890,000', delivery: 'Not Started', date: '2026-03-11', comments: 'Requested brochure and spec sheet.', followUp: '2026-03-12T11:45' }
    ]
};

export function initSales() {
    const container = document.createElement('div');
    container.className = 'sales-module animate-fade-in';
    
    render(container);
    return container;
}

function render(container) {
    container.innerHTML = `
        <div class="sales-grid" style="display: flex; flex-direction: column; gap: 32px;">
            <!-- Pipeline Summary Row -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                <div class="card glass-card">
                    <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">Total Pipeline Value</div>
                    <div style="font-size: 1.75rem; font-weight: 700; color: var(--accent-primary);" id="total-pipeline-value">Ksh 0</div>
                </div>
                <div class="card glass-card">
                    <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">Conversion Rate</div>
                    <div style="font-size: 1.75rem; font-weight: 700; color: #2ecc71;">18.5%</div>
                </div>
                <div class="card glass-card">
                    <div style="font-size: 1.75rem; font-weight: 700; color: var(--accent-secondary);" id="active-leads-count">0</div>
                </div>
            </div>

            <!-- Leads Overview -->
            <div class="card" style="margin-top: 24px;">
                <div class="card-header">
                    <h3 style="display: flex; align-items: center; gap: 12px;">
                        Active Sales Pipeline
                        <div class="notification-icon" id="notification-bell" style="position: relative; cursor: pointer;" title="Pending Follow-ups">
                            <i class="fas fa-bell" style="color: var(--text-secondary); font-size: 1.1rem; transition: color 0.2s ease;"></i>
                            <span id="followup-badge" style="position: absolute; top: -6px; right: -8px; background: #e74c3c; color: white; font-size: 0.65rem; font-weight: bold; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;">0</span>
                        </div>
                    </h3>
                    <div style="display: flex; gap: 12px;">
                        <input type="text" class="form-input form-input-sm" placeholder="Search clients, vehicles..." style="width: 250px;">
                        <button class="btn btn-primary btn-sm" id="btn-add-lead"><i class="fas fa-plus"></i> New Lead</button>
                    </div>
                </div>
                <div style="overflow-x: auto;">
                    <table class="inventory-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Vehicle ID</th>
                                <th>Source</th>
                                <th>Client</th>
                                <th>Stage</th>
                                <th>Salesperson</th>
                                <th>Deal Value</th>
                                <th>Delivery</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="leads-tbody">
                            <!-- Populated via JS -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    updateUI(container);

    // Event Listeners
    const addBtn = container.querySelector('#btn-add-lead');
    if (addBtn) {
        addBtn.addEventListener('click', () => showAddLeadModal(container));
    }

    const bellBtn = container.querySelector('#notification-bell');
    if (bellBtn) {
        bellBtn.addEventListener('click', () => showNotificationsModal(container));
    }

    // Attach delegated listener for client names and edit buttons
    const tbody = container.querySelector('#leads-tbody');
    if (tbody) {
        tbody.addEventListener('click', (e) => {
            if (e.target.classList.contains('client-name-link')) {
                e.preventDefault();
                const leadId = e.target.getAttribute('data-id');
                showClientDetailsModal(leadId, container);
            } else if (e.target.closest('.btn-edit-followup')) {
                const btn = e.target.closest('.btn-edit-followup');
                const leadId = btn.getAttribute('data-id');
                showEditFollowUpModal(leadId, container);
            }
        });
    }
}

function updateUI(container) {
    const leadsBody = container.querySelector('#leads-tbody');
    const leadsCount = container.querySelector('#active-leads-count');
    const totalPipeline = container.querySelector('#total-pipeline-value');
    
    if (!leadsBody) return;

    leadsBody.innerHTML = state.leads.map(lead => renderLeadRow(lead)).join('');
    
    // Update Stats
    if (leadsCount) leadsCount.textContent = state.leads.length;
    
    const totalValue = state.leads.reduce((sum, lead) => {
        const val = parseInt(lead.value.replace(/[^0-9]/g, '')) || 0;
        return sum + val;
    }, 0);
    
    if (totalPipeline) totalPipeline.textContent = `Ksh ${totalValue.toLocaleString()}`;

    const followupBadge = container.querySelector('#followup-badge');
    if (followupBadge) {
        // Count leads that have a follow-up scheduled
        const followUpCount = state.leads.filter(lead => lead.followUp && lead.followUp.trim() !== '').length;
        if (followUpCount > 0) {
            followupBadge.textContent = followUpCount;
            followupBadge.style.opacity = '1';
            
            // Add pulse animation for emphasis
            followupBadge.style.animation = 'pulse 2s infinite';
            if (!document.getElementById('pulse-keyframe')) {
                const style = document.createElement('style');
                style.id = 'pulse-keyframe';
                style.innerHTML = `@keyframes pulse { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.7); } 70% { transform: scale(1.1); box-shadow: 0 0 0 6px rgba(231, 76, 60, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); } }`;
                document.head.appendChild(style);
            }
        } else {
            followupBadge.style.opacity = '0';
            followupBadge.style.animation = 'none';
        }
    }
}

function renderLeadRow(lead) {
    let deliveryBadgeClass = 'badge-available';
    if (lead.delivery === 'Pending') deliveryBadgeClass = 'badge-inspection';
    if (lead.delivery === 'In Transit') deliveryBadgeClass = 'badge-reserved';
    if (lead.delivery === 'Delivered') deliveryBadgeClass = 'badge-available';
    if (lead.delivery === 'Not Started') deliveryBadgeClass = 'badge-workshop';

    return `
        <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;" class="animate-fade-in">
            <td style="padding: 16px; color: var(--text-muted); font-family: monospace;">${lead.date}</td>
            <td style="padding: 16px; font-weight: 600;">${lead.vehicleId}</td>
            <td style="padding: 16px; color: var(--text-secondary);">${lead.source}</td>
            <td style="padding: 16px;">
                <a href="#" class="client-name-link" data-id="${lead.id}" style="color: var(--accent-primary); font-weight: 600; text-decoration: none; border-bottom: 1px dashed var(--accent-primary); padding-bottom: 2px;">${lead.client}</a>
            </td>
            <td style="padding: 16px;"><span class="badge" style="background: var(--bg-tertiary); border: 1px solid var(--border-color);">${lead.stage}</span></td>
            <td style="padding: 16px;">${lead.salesperson}</td>
            <td style="padding: 16px; font-weight: 600; color: var(--accent-primary);">${lead.value}</td>
            <td style="padding: 16px;"><span class="badge ${deliveryBadgeClass}">${lead.delivery}</span></td>
            <td style="padding: 16px;">
                <button class="btn-icon btn-sm btn-edit-followup" data-id="${lead.id}" title="Update Follow-up"><i class="fas fa-calendar-alt"></i></button>
            </td>
        </tr>
    `;
}

function showAddLeadModal(container) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay animate-fade-in';
    const today = new Date().toISOString().split('T')[0];
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Capture New Lead</h3>
                <button class="btn btn-sm" id="close-modal" style="background: none; color: var(--text-muted); font-size: 1.2rem;"><i class="fas fa-times"></i></button>
            </div>
            <form id="new-lead-form">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Date</label>
                        <input type="date" class="form-input" name="date" value="${today}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Vehicle ID</label>
                        <input type="text" class="form-input" name="vehicleId" placeholder="e.g. SK1055" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Client Name</label>
                        <input type="text" class="form-input" name="client" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone Number</label>
                        <input type="text" class="form-input" name="phone" placeholder="+254..." required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-input" name="email" placeholder="client@example.com">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Lead Source</label>
                        <select class="form-input" name="source" required>
                            <option value="Website Inq.">Website Inq.</option>
                            <option value="Facebook Ads">Facebook Ads</option>
                            <option value="Walk-in">Walk-in</option>
                            <option value="Referral">Referral</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Salesperson</label>
                        <input type="text" class="form-input" name="salesperson" placeholder="Name" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Deal Value (Ksh)</label>
                    <input type="number" class="form-input" name="value" placeholder="Price" required>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="cancel-btn">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Lead</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    const close = () => document.body.removeChild(modal);
    modal.querySelector('#close-modal').onclick = close;
    modal.querySelector('#cancel-btn').onclick = close;

    modal.querySelector('#new-lead-form').onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newLead = {
            id: Date.now().toString(),
            date: formData.get('date'),
            vehicleId: formData.get('vehicleId'),
            source: formData.get('source'),
            client: formData.get('client'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            stage: 'Initial Inquiry',
            salesperson: formData.get('salesperson'),
            value: `Ksh ${parseInt(formData.get('value')).toLocaleString()}`,
            delivery: 'Not Started',
            comments: '',
            followUp: ''
        };

        state.leads.unshift(newLead);
        updateUI(container || document);
        close();
    };
}

function showClientDetailsModal(leadId, container) {
    const lead = state.leads.find(l => l.id === leadId);
    if (!lead) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay animate-fade-in';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Client Details: <span style="color: var(--accent-primary);">${lead.client}</span></h3>
                <button class="btn btn-sm" id="close-modal" style="background: none; color: var(--text-muted); font-size: 1.2rem;"><i class="fas fa-times"></i></button>
            </div>
            <div style="padding-top: 20px; display: flex; flex-direction: column; gap: 20px;">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Full Name</label>
                        <div style="font-size: 1rem; font-weight: 500; color: var(--text-primary); padding: 8px 0; border-bottom: 1px solid var(--border-color);">${lead.client}</div>
                    </div>
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Phone Number</label>
                        <div style="font-size: 1rem; font-weight: 500; color: var(--text-primary); padding: 8px 0; border-bottom: 1px solid var(--border-color);">${lead.phone || 'Not provided'}</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Email Address</label>
                        <div style="font-size: 1rem; font-weight: 500; color: var(--text-primary); padding: 8px 0; border-bottom: 1px solid var(--border-color);">${lead.email || 'Not provided'}</div>
                    </div>
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Vehicle ID Inquired</label>
                        <div style="font-size: 1rem; font-weight: 600; color: var(--accent-secondary); padding: 8px 0; border-bottom: 1px solid var(--border-color);">${lead.vehicleId}</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Lead Source</label>
                        <div style="font-size: 1rem; font-weight: 500; color: var(--text-primary); padding: 8px 0; border-bottom: 1px solid var(--border-color);">${lead.source}</div>
                    </div>
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Sales Stage</label>
                        <div style="padding: 8px 0; border-bottom: 1px solid var(--border-color);">
                            <span class="badge" style="background: var(--bg-tertiary); border: 1px solid var(--border-color);">${lead.stage}</span>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Salesperson</label>
                        <div style="font-size: 1rem; font-weight: 500; color: var(--text-primary); padding: 8px 0; border-bottom: 1px solid var(--border-color);">${lead.salesperson}</div>
                    </div>
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Deal Value</label>
                        <div style="font-size: 1rem; font-weight: 600; color: var(--accent-primary); padding: 8px 0; border-bottom: 1px solid var(--border-color);">${lead.value}</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Delivery Status</label>
                        <div style="font-size: 1rem; font-weight: 500; color: var(--text-primary); padding: 8px 0; border-bottom: 1px solid var(--border-color);">${lead.delivery}</div>
                    </div>
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Follow-up Date & Time</label>
                        <div style="font-size: 1rem; font-weight: 500; color: var(--text-primary); padding: 8px 0; border-bottom: 1px solid var(--border-color);">${lead.followUp ? new Date(lead.followUp).toLocaleString() : 'Not scheduled'}</div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Client Comments / Notes</label>
                    <div style="font-size: 0.95rem; line-height: 1.5; color: var(--text-secondary); padding: 12px; background: rgba(0,0,0,0.2); border-radius: 6px; border: 1px solid var(--border-color); min-height: 80px;">
                        ${lead.comments || 'No comments recorded.'}
                    </div>
                </div>
                <div class="modal-footer" style="justify-content: flex-end;">
                    <button type="button" class="btn btn-secondary" id="close-modal-btn">Close</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const close = () => document.body.removeChild(modal);
    modal.querySelector('#close-modal').onclick = close;
    modal.querySelector('#close-modal-btn').onclick = close;
}

function showNotificationsModal(container) {
    const followUps = state.leads.filter(lead => lead.followUp && lead.followUp.trim() !== '');
    
    // Sort by date/time ascending
    followUps.sort((a, b) => new Date(a.followUp) - new Date(b.followUp));

    const modal = document.createElement('div');
    modal.className = 'modal-overlay animate-fade-in';
    
    let listHtml = '';
    if (followUps.length === 0) {
        listHtml = '<div style="padding: 32px; text-align: center; color: var(--text-muted);">No pending follow-ups.</div>';
    } else {
        listHtml = followUps.map(lead => `
            <div style="padding: 16px; border-bottom: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 8px; cursor: pointer; transition: background 0.2s ease;" class="notification-item" data-id="${lead.id}" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div style="font-weight: 600; color: var(--text-primary); font-size: 1rem;">${lead.client}</div>
                    <div style="font-size: 0.8rem; font-weight: 600; color: #e74c3c; background: rgba(231, 76, 60, 0.1); padding: 4px 8px; border-radius: 4px;">
                        ${new Date(lead.followUp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </div>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); display: flex; gap: 16px;">
                    <span><i class="fas fa-car" style="color: var(--text-muted); width: 16px;"></i> ${lead.vehicleId}</span>
                    <span><i class="fas fa-phone" style="color: var(--text-muted); width: 16px;"></i> ${lead.phone || 'N/A'}</span>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted); background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px; margin-top: 4px;">
                    ${lead.comments || 'No comments'}
                </div>
            </div>
        `).join('');
    }

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px; padding: 0; overflow: hidden; display: flex; flex-direction: column; max-height: 80vh;">
            <div class="modal-header" style="background: var(--bg-secondary); padding: 20px 24px;">
                <h3 style="display: flex; align-items: center; gap: 12px;">
                    <i class="fas fa-bell" style="color: #e74c3c;"></i> Pending Follow-ups
                    <span class="badge" style="background: rgba(231, 76, 60, 0.2); color: #e74c3c; border: 1px solid rgba(231, 76, 60, 0.3);">${followUps.length}</span>
                </h3>
                <button class="btn btn-sm" id="close-notifications" style="background: none; color: var(--text-muted); font-size: 1.2rem;"><i class="fas fa-times"></i></button>
            </div>
            <div style="overflow-y: auto; flex: 1;">
                ${listHtml}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const close = () => document.body.removeChild(modal);
    modal.querySelector('#close-notifications').onclick = close;
    
    // allow clicking a notification to open the client details modal
    const items = modal.querySelectorAll('.notification-item');
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            close();
            const leadId = e.currentTarget.getAttribute('data-id');
            showClientDetailsModal(leadId, container);
        });
    });
}

function showEditFollowUpModal(leadId, container) {
    const lead = state.leads.find(l => l.id === leadId);
    if (!lead) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay animate-fade-in';
    
    // Format current datetime for input if exists
    let formattedDate = '';
    if (lead.followUp) {
        const dateObj = new Date(lead.followUp);
        if (!isNaN(dateObj.getTime())) {
            formattedDate = dateObj.toISOString().slice(0, 16);
        }
    }

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px;">
            <div class="modal-header">
                <h3>Update Follow-up</h3>
                <button class="btn btn-sm" id="close-followup-modal" style="background: none; color: var(--text-muted); font-size: 1.2rem;"><i class="fas fa-times"></i></button>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 4px;">Client:</p>
                <div style="font-weight: 600; color: var(--accent-primary);">${lead.client}</div>
            </div>
            <form id="edit-followup-form">
                <div class="form-group">
                    <label class="form-label">Next Follow-up Date & Time</label>
                    <input type="datetime-local" class="form-input" name="followUp" value="${formattedDate}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Update Notes</label>
                    <textarea class="form-input" name="comments" rows="3" placeholder="Add latest interaction notes...">${lead.comments || ''}</textarea>
                </div>
                <div class="modal-footer" style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
                    <button type="button" class="btn btn-secondary" id="cancel-followup-btn">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Update</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    const close = () => document.body.removeChild(modal);
    modal.querySelector('#close-followup-modal').onclick = close;
    modal.querySelector('#cancel-followup-btn').onclick = close;

    modal.querySelector('#edit-followup-form').onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newDate = formData.get('followUp');
        const newComments = formData.get('comments');
        
        lead.followUp = newDate;
        if (newComments.trim()) {
            lead.comments = newComments;
            // Highlight lead stage to follow-up if date is set
            if(lead.stage !== 'Follow-up' && lead.stage !== 'Closing') {
                lead.stage = 'Follow-up';
            }
        }

        updateUI(container || document.querySelector('.sales-module'));
        close();
    };
}
