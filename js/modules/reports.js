import { state as salesState } from './sales.js';

/**
 * Reports & Analytics Module - All Company Reports
 */

const state = {
    activeTab: 'financial'
};

export function initReports() {
    try {
        console.log("Initializing Reports module...");
        const container = document.createElement('div');
        container.className = 'reports-module animate-fade-in';
        
        render(container);
        return container;
    } catch (err) {
        console.error("Critical error in initReports:", err);
        const errorEl = document.createElement('div');
        errorEl.className = 'error';
        errorEl.innerHTML = `<h3>Internal Report Error</h3><p>${err.message}</p><pre>${err.stack}</pre>`;
        return errorEl;
    }
}

function render(container) {
    console.log("Rendering Reports module...");
    if (!salesState || !salesState.leads) {
        console.error("Sales state or leads missing!");
        container.innerHTML = '<div class="error">Error: Sales data could not be loaded.</div>';
        return;
    }

    // Financial Calculations
    const totalPipelineValue = salesState.leads.reduce((sum, lead) => {
        return sum + (parseInt(lead.value.replace(/[^0-9]/g, '')) || 0);
    }, 0);
    
    const closedDeals = salesState.leads.filter(l => l.stage === 'Closing').length;
    const closedValue = salesState.leads
        .filter(l => l.stage === 'Closing')
        .reduce((sum, lead) => sum + (parseInt(lead.value.replace(/[^0-9]/g, '')) || 0), 0);

    container.innerHTML = `
        <style>
            .reports-module {
                line-height: 1.6;
                color: var(--text-primary);
            }
            .reports-tabs {
                display: flex;
                gap: 12px;
                margin-bottom: 32px;
                background: var(--bg-secondary);
                padding: 8px;
                border-radius: var(--radius-md);
                width: max-content;
                border: 1px solid var(--border-color);
            }
            .report-tab {
                padding: 12px 24px;
                border: none;
                background: none;
                color: var(--text-secondary);
                font-weight: 700;
                cursor: pointer;
                border-radius: var(--radius-sm);
                transition: all 0.3s ease;
                font-size: 1rem;
            }
            .report-tab:hover {
                color: var(--accent-primary);
            }
            .report-tab.active {
                background: var(--accent-primary);
                color: var(--bg-primary);
                box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
            }
            .report-section {
                display: none;
            }
            .report-section.active {
                display: block;
            }
            .stats-overview {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 24px;
                margin-bottom: 40px;
            }
            .card.glass-card {
                padding: 24px;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .stat-label {
                font-size: 0.95rem;
                font-weight: 500;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .stat-value {
                font-size: 2.5rem;
                font-weight: 700;
                font-family: 'Outfit', sans-serif;
                margin: 4px 0;
            }
            .stat-trend {
                font-size: 0.95rem;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .funnel-container {
                display: flex;
                flex-direction: column;
                gap: 20px;
                margin-top: 32px;
            }
            .funnel-stage {
                display: flex;
                align-items: center;
                gap: 24px;
            }
            .funnel-label {
                width: 140px;
                font-size: 1rem;
                font-weight: 600;
                color: var(--text-secondary);
            }
            .funnel-bar {
                height: 48px;
                background: linear-gradient(90deg, var(--accent-primary), rgba(212, 175, 55, 0.1));
                border-radius: 8px;
                display: flex;
                align-items: center;
                padding: 0 20px;
                color: white;
                font-weight: 700;
                font-size: 1.1rem;
                border: 1px solid rgba(212, 175, 55, 0.2);
            }
            .utilization-grid {
                display: grid;
                grid-template-columns: repeat(10, 1fr);
                gap: 8px;
                margin-top: 24px;
            }
            .util-cell {
                aspect-ratio: 1;
                border-radius: 4px;
                background: var(--bg-tertiary);
                border: 1px solid var(--border-color);
            }
            .util-cell.high { background: #e74c3c; box-shadow: 0 0 10px rgba(231, 76, 60, 0.3); }
            .util-cell.mid { background: #f39c12; }
            .util-cell.low { background: #2ecc71; }
            
            .section-title {
                margin-bottom: 24px;
                font-size: 1.5rem;
                color: var(--text-primary);
            }
            .section-desc {
                margin-bottom: 32px;
                color: var(--text-secondary);
                font-size: 1.1rem;
            }
        </style>

        <div class="reports-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px;">
            <div>
                <h2 style="font-size: 2.25rem; margin-bottom: 8px;">All Company Reports</h2>
                <p style="color: var(--text-secondary); font-size: 1.1rem;">Comprehensive performance audit across all departments.</p>
            </div>
            <div style="display: flex; gap: 16px;">
                <button class="btn btn-secondary btn-lg" id="btn-filter-reports"><i class="fas fa-calendar-alt"></i> Last 30 Days</button>
                <button class="btn btn-primary btn-lg" id="btn-export-all"><i class="fas fa-file-export"></i> Master Export</button>
            </div>
        </div>

        <div class="reports-tabs">
            <button class="report-tab ${state.activeTab === 'financial' ? 'active' : ''}" data-tab="financial">Financials</button>
            <button class="report-tab ${state.activeTab === 'sales' ? 'active' : ''}" data-tab="sales">Sales & Leads</button>
            <button class="report-tab ${state.activeTab === 'operations' ? 'active' : ''}" data-tab="operations">Operations</button>
        </div>

        <!-- FINANCIAL SECTION -->
        <div class="report-section ${state.activeTab === 'financial' ? 'active' : ''}" id="section-financial">
            <div class="stats-overview">
                <div class="card glass-card">
                    <div class="stat-label">Total Assets Value</div>
                    <div class="stat-value" style="color: var(--accent-primary);">Ksh 142.8M</div>
                    <div class="stat-trend positive"><i class="fas fa-arrow-up"></i> 4.2% from prev. month</div>
                </div>
                <div class="card glass-card">
                    <div class="stat-label">Pipeline Potential</div>
                    <div class="stat-value" style="color: var(--accent-secondary);">Ksh ${(totalPipelineValue / 1000000).toFixed(1)}M</div>
                    <div class="stat-trend"><i class="fas fa-info-circle"></i> Based on active leads</div>
                </div>
                <div class="card glass-card">
                    <div class="stat-label">Realized Revenue</div>
                    <div class="stat-value" style="color: #2ecc71;">Ksh ${(closedValue / 1000000).toFixed(1)}M</div>
                    <div class="stat-trend positive"><i class="fas fa-check-circle"></i> ${closedDeals} closed deals</div>
                </div>
            </div>

            <div class="card" style="padding: 32px;">
                <h3 class="section-title">Revenue Growth Forecast</h3>
                <div style="height: 250px; display: flex; align-items: flex-end; gap: 12px; margin-top: 40px; padding-bottom: 32px; border-bottom: 2px solid var(--border-color);">
                    ${renderForecastBars()}
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 16px; color: var(--text-secondary); font-size: 1rem; font-weight: 600;">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                </div>
            </div>
        </div>

        <!-- SALES SECTION -->
        <div class="report-section ${state.activeTab === 'sales' ? 'active' : ''}" id="section-sales">
            <div class="grid" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 32px;">
                <div class="card" style="padding: 32px;">
                    <h3 class="section-title">Lead Conversion Funnel</h3>
                    <p class="section-desc">Conversion efficiency from inquiry to closed deal.</p>
                    <div class="funnel-container">
                        ${renderFunnelStage('Inquiry', 100)}
                        ${renderFunnelStage('Test Drive', 60)}
                        ${renderFunnelStage('Negotiation', 35)}
                        ${renderFunnelStage('Closing', 12)}
                    </div>
                </div>
                <div class="card" style="padding: 32px;">
                    <h3 class="section-title">Source Performance</h3>
                    <p class="section-desc">Leading acquisition channels this month.</p>
                    <div style="display: flex; flex-direction: column; gap: 32px; margin-top: 32px;">
                        ${renderSourceStat('Website Inq.', 45, 'var(--accent-primary)')}
                        ${renderSourceStat('Facebook Ads', 28, 'var(--accent-secondary)')}
                        ${renderSourceStat('Walk-in', 15, '#9b59b6')}
                        ${renderSourceStat('Referral', 12, '#2ecc71')}
                    </div>
                </div>
            </div>
        </div>

        <!-- OPERATIONS SECTION -->
        <div class="report-section ${state.activeTab === 'operations' ? 'active' : ''}" id="section-operations">
            <div class="grid" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 32px;">
                <div class="card" style="padding: 32px;">
                    <h3 class="section-title">Yard Space Utilization</h3>
                    <p class="section-desc">Heatmap of slot density by zone. High density requires immediate movement.</p>
                    <div class="utilization-grid">
                        ${renderHeatmapCells(100)}
                    </div>
                    <div style="display: flex; gap: 24px; margin-top: 32px; font-size: 1rem; font-weight: 600;">
                        <span style="display: flex; align-items: center; gap: 8px;"><div style="width: 14px; height: 14px; border-radius: 4px; background: #e74c3c; border: 1px solid rgba(0,0,0,0.1);"></div> High (80%+)</span>
                        <span style="display: flex; align-items: center; gap: 8px;"><div style="width: 14px; height: 14px; border-radius: 4px; background: #f39c12; border: 1px solid rgba(0,0,0,0.1);"></div> Medium (50%)</span>
                        <span style="display: flex; align-items: center; gap: 8px;"><div style="width: 14px; height: 14px; border-radius: 4px; background: #2ecc71; border: 1px solid rgba(0,0,0,0.1);"></div> Low (<30%)</span>
                    </div>
                </div>
                <div class="card" style="padding: 32px;">
                    <h3 class="section-title">Workshop Throughput</h3>
                    <p class="section-desc">Real-time status of service bay capacity.</p>
                    <div class="stat-row" style="margin-top: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 1.1rem; font-weight: 600;">
                            <span>Active Jobs</span>
                            <span style="font-weight: 800; color: var(--accent-secondary);">14</span>
                        </div>
                        <div style="height: 12px; background: var(--bg-tertiary); border-radius: 6px; overflow: hidden; border: 1px solid var(--border-color);">
                            <div style="width: 65%; height: 100%; background: #e67e22; box-shadow: 0 0 10px rgba(230, 126, 34, 0.3);"></div>
                        </div>
                    </div>
                    <div class="stat-row" style="margin-top: 32px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 1.1rem; font-weight: 600;">
                            <span>Weekly Completion Rate</span>
                            <span style="font-weight: 800; color: #2ecc71;">88%</span>
                        </div>
                        <div style="height: 12px; background: var(--bg-tertiary); border-radius: 6px; overflow: hidden; border: 1px solid var(--border-color);">
                            <div style="width: 88%; height: 100%; background: #2ecc71; box-shadow: 0 0 10px rgba(46, 204, 113, 0.3);"></div>
                        </div>
                    </div>
                    <div style="margin-top: 40px; padding: 24px; background: rgba(230, 126, 34, 0.1); border-radius: var(--radius-md); border-left: 6px solid #e67e22;">
                        <div style="font-weight: 800; font-size: 1.1rem; color: #e67e22; text-transform: uppercase; margin-bottom: 8px;">Alert: High Load detected</div>
                        <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.5;">Zone B Workshop is approaching critical capacity. Automatical rescheduling recommended for non-emergency inspections.</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Tab Listeners
    container.querySelectorAll('.report-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            state.activeTab = btn.getAttribute('data-tab');
            render(container);
        });
    });

    // Action Listeners
    const exportBtn = container.querySelector('#btn-export-all');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const originalText = exportBtn.innerHTML;
            exportBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Generating...';
            exportBtn.disabled = true;
            setTimeout(() => {
                alert('Master Report compiled. Exporting CSV, PDF, and XLS aggregate...');
                exportBtn.innerHTML = originalText;
                exportBtn.disabled = false;
            }, 1500);
        });
    }
}

function renderForecastBars() {
    let html = '';
    for (let i = 0; i < 12; i++) {
        const val = 30 + Math.random() * 70;
        html += `<div style="flex: 1; height: ${val}%; background: var(--accent-primary); border-radius: 6px 6px 0 0; opacity: ${0.4 + (i/12)*0.6}; transition: height 0.5s ease;"></div>`;
    }
    return html;
}

function renderFunnelStage(label, value) {
    return `
        <div class="funnel-stage">
            <div class="funnel-label">${label}</div>
            <div style="flex: 1;">
                <div class="funnel-bar" style="width: ${value}%;">
                    ${value}%
                </div>
            </div>
        </div>
    `;
}

function renderSourceStat(label, percent, color) {
    return `
        <div class="source-stat">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 1.1rem;">
                <span style="font-weight: 600;">${label}</span>
                <span style="font-weight: 800; color: ${color};">${percent}%</span>
            </div>
            <div style="height: 10px; background: var(--bg-tertiary); border-radius: 5px; overflow: hidden; border: 1px solid var(--border-color);">
                <div style="width: ${percent}%; height: 100%; background: ${color}; box-shadow: 0 0 10px ${color}44;"></div>
            </div>
        </div>
    `;
}

function renderHeatmapCells(count) {
    let html = '';
    for (let i = 0; i < count; i++) {
        const rand = Math.random();
        const type = rand > 0.8 ? 'high' : rand > 0.4 ? 'mid' : 'low';
        html += `<div class="util-cell ${type}"></div>`;
    }
    return html;
}

