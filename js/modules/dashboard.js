/**
 * Dashboard Module
 */

export function initDashboard() {
    const dashboardHtml = `
        <div class="dashboard-grid">
            <!-- Stats Row -->
            <div class="stats-row">
                <div class="stat-card card">
                    <div class="stat-icon" style="background: rgba(212, 175, 55, 0.1); color: var(--accent-primary);">
                        <i class="fas fa-hand-holding-dollar"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-label">Total Sales</div>
                        <div class="stat-value">Ksh 45.2M</div>
                        <div class="stat-trend positive"><i class="fas fa-arrow-up"></i> 18% vs last month</div>
                    </div>
                </div>
                
                <div class="stat-card card">
                    <div class="stat-icon" style="background: rgba(74, 144, 226, 0.1); color: var(--accent-secondary);">
                        <i class="fas fa-file-invoice-dollar"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-label">Due Payments</div>
                        <div class="stat-value">Ksh 2.4M</div>
                        <div class="stat-trend negative"><i class="fas fa-arrow-up"></i> Follow-up required</div>
                    </div>
                </div>
                
                <div class="stat-card card">
                    <div class="stat-icon" style="background: rgba(46, 204, 113, 0.1); color: #2ecc71;">
                        <i class="fas fa-car"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-label">Total Vehicles</div>
                        <div class="stat-value">1,284</div>
                        <div class="stat-trend positive"><i class="fas fa-arrow-up"></i> 54 new arrivals</div>
                    </div>
                </div>
                
                <div class="stat-card card">
                    <div class="stat-icon" style="background: rgba(231, 76, 60, 0.1); color: #e74c3c;">
                        <i class="fas fa-bookmark"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-label">Reservations</div>
                        <div class="stat-value">34</div>
                        <div class="stat-trend positive"><i class="fas fa-arrow-up"></i> Active holds</div>
                    </div>
                </div>
            </div>

            <div class="dashboard-main" style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
                <!-- Recent Activity -->
                <div class="card recent-activity">
                    <div class="card-header">
                        <h3>Recent Activity</h3>
                        <button class="btn btn-sm">View All</button>
                    </div>
                    <div class="activity-list">
                        ${renderActivity('Vehicle Intake', 'Toyota Harrier (KDL 123X)', '10 mins ago', 'JD')}
                        ${renderActivity('Yard Move', 'Mazda CX-5 → Row B7', '45 mins ago', 'SK')}
                        ${renderActivity('Inspection', 'Subaru Forester (Damage Tagged)', '2 hrs ago', 'MA')}
                        ${renderActivity('Dispatch', 'Range Rover Sport (Sold)', '3 hrs ago', 'JD')}
                    </div>
                </div>

                <!-- Calendar -->
                <div class="card calendar-card">
                    <div class="card-header">
                        <h3>Daily Events & Appts</h3>
                    </div>
                    <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 16px;">
                        ${renderEvent('10:00 AM', 'Client Viewing (Prado)', 'fas fa-eye', 'var(--accent-primary)')}
                        ${renderEvent('01:30 PM', 'Supplier Delivery', 'fas fa-truck', 'var(--accent-secondary)')}
                        ${renderEvent('03:00 PM', 'Management Meeting', 'fas fa-users', '#2ecc71')}
                        ${renderEvent('04:45 PM', 'Vehicle Dispatch', 'fas fa-key', '#e74c3c')}
                    </div>
                </div>
            </div>

            <div class="dashboard-main" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; margin-top: 24px;">
                <!-- Sales Graph -->
                <div class="card">
                    <div class="card-header">
                        <h3>Sales Revenue (Last 6 Months)</h3>
                        <div style="font-size: 0.8rem; color: var(--accent-primary);"><i class="fas fa-chart-line"></i> +24% YoY</div>
                    </div>
                    <div class="sales-graph-container">
                        ${renderBar('Oct', 'Ksh 32M', 45)}
                        ${renderBar('Nov', 'Ksh 41M', 60)}
                        ${renderBar('Dec', 'Ksh 58M', 85)}
                        ${renderBar('Jan', 'Ksh 38M', 55)}
                        ${renderBar('Feb', 'Ksh 45M', 65)}
                        ${renderBar('Mar', 'Ksh 62M', 90)}
                    </div>
                </div>

                <!-- Vehicle Status Pie Chart -->
                <div class="card">
                    <div class="card-header">
                        <h3>Vehicle Status</h3>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding-bottom: 24px;">
                        <div style="width: 160px; height: 160px; border-radius: 50%; background: conic-gradient(#2ecc71 0% 45%, #e74c3c 45% 65%, #f1c40f 65% 85%, var(--accent-primary) 85% 100%); position: relative; box-shadow: 0 0 20px rgba(0,0,0,0.5); margin-bottom: 32px;">
                            <!-- Inner circle for donut effect -->
                            <div style="position: absolute; top: 20px; left: 20px; right: 20px; bottom: 20px; background: var(--bg-secondary); border-radius: 50%;"></div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 0.85rem; width: 100%;">
                            <div style="display: flex; align-items: center; gap: 8px;"><div style="width: 12px; height: 12px; background: #2ecc71; border-radius: 3px;"></div> Available (45%)</div>
                            <div style="display: flex; align-items: center; gap: 8px;"><div style="width: 12px; height: 12px; background: #e74c3c; border-radius: 3px;"></div> Booked (20%)</div>
                            <div style="display: flex; align-items: center; gap: 8px;"><div style="width: 12px; height: 12px; background: #f1c40f; border-radius: 3px;"></div> Workshop (20%)</div>
                            <div style="display: flex; align-items: center; gap: 8px;"><div style="width: 12px; height: 12px; background: var(--accent-primary); border-radius: 3px;"></div> Arriving (15%)</div>
                        </div>
                    </div>
                </div>

                <!-- Stock Distribution -->
                <div class="card stock-dist">
                    <div class="card-header">
                        <h3>Stock Aging</h3>
                    </div>
                    <div class="chart-mock">
                        <div class="chart-bar-item">
                            <span>0-15 Days</span>
                            <div class="bar-container"><div class="bar" style="width: 70%;"></div></div>
                            <span>420</span>
                        </div>
                        <div class="chart-bar-item">
                            <span>15-30 Days</span>
                            <div class="bar-container"><div class="bar" style="width: 45%;"></div></div>
                            <span>280</span>
                        </div>
                        <div class="chart-bar-item">
                            <span>30-60 Days</span>
                            <div class="bar-container"><div class="bar" style="width: 30%;"></div></div>
                            <span>150</span>
                        </div>
                        <div class="chart-bar-item">
                            <span>60+ Days</span>
                            <div class="bar-container"><div class="bar" style="width: 15%; background: var(--accent-primary);"></div></div>
                            <span>45</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style>
            .premium-bar-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex: 1;
                position: relative;
                height: 100%;
                justify-content: flex-end;
                group: bar-group;
                cursor: pointer;
            }
            .premium-bar {
                width: 45%;
                background: linear-gradient(180deg, var(--accent-primary) 0%, rgba(212, 175, 55, 0.2) 100%);
                border-radius: 6px 6px 0 0;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                position: relative;
                box-shadow: 0 0 15px rgba(212, 175, 55, 0);
            }
            .premium-bar::after {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 40%);
                border-radius: 6px 6px 0 0;
            }
            .premium-bar-container:hover .premium-bar {
                background: linear-gradient(180deg, #FFD700 0%, rgba(212, 175, 55, 0.4) 100%);
                box-shadow: 0 -5px 25px rgba(212, 175, 55, 0.4);
                transform: scale(1.05); /* Slight widening */
            }
            .premium-bar-value {
                position: absolute;
                top: -30px;
                font-size: 0.8rem;
                font-weight: 700;
                color: var(--text-primary);
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
                background: rgba(0,0,0,0.8);
                padding: 4px 8px;
                border-radius: 4px;
                backdrop-filter: blur(4px);
                border: 1px solid rgba(212, 175, 55, 0.3);
                white-space: nowrap;
                z-index: 10;
            }
            .premium-bar-container:hover .premium-bar-value {
                opacity: 1;
                transform: translateY(0);
            }
            .premium-bar-label {
                margin-top: 16px;
                font-size: 0.85rem;
                color: var(--text-secondary);
                transition: color 0.3s ease;
                font-weight: 500;
            }
            .premium-bar-container:hover .premium-bar-label {
                color: var(--accent-primary);
            }
            .sales-graph-container {
                height: 280px;
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                gap: 12px;
                padding: 30px 20px 0;
                border-bottom: 2px solid rgba(255,255,255,0.05);
                margin-top: 10px;
                background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.02) 100%);
                border-radius: 0 0 12px 12px;
            }
        </style>
    `;

    return dashboardHtml;
}

function renderActivity(type, detail, time, user) {
    return `
        <div class="activity-item">
            <div class="activity-info">
                <strong>${type}</strong> - ${detail}
                <div class="activity-meta">By ${user} • ${time}</div>
            </div>
        </div>
    `;
}

function renderEvent(time, title, icon, color) {
    return `
        <div style="display: flex; gap: 16px; padding: 12px; background: var(--bg-tertiary); border-radius: 8px; border-left: 3px solid ${color};">
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted); width: 60px;">${time}</div>
            <div style="display: flex; gap: 12px; align-items: center; flex: 1;">
                <div style="color: ${color};"><i class="${icon}"></i></div>
                <div style="font-size: 0.9rem; font-weight: 500;">${title}</div>
            </div>
        </div>
    `;
}

function renderBar(label, value, heightPercentage) {
    return `
        <div class="premium-bar-container">
            <div class="premium-bar-value">${value}</div>
            <div class="premium-bar" style="height: ${heightPercentage}%;"></div>
            <div class="premium-bar-label">${label}</div>
        </div>
    `;
}
