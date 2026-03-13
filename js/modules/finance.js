/**
 * Finance Module
 */

export function initFinance() {
    const container = document.createElement('div');
    container.className = 'finance-module animate-fade-in';
    
    render(container);
    return container;
}

function render(container) {
    container.innerHTML = `
        <style>
            .finance-overview {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 24px;
                margin-bottom: 40px;
            }
            .finance-card {
                padding: 32px;
                border-radius: var(--radius-lg);
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                display: flex;
                flex-direction: column;
                gap: 12px;
                position: relative;
                overflow: hidden;
            }
            .finance-card::after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 100px;
                height: 100px;
                background: linear-gradient(135deg, transparent, rgba(255,255,255,0.05));
                border-radius: 0 0 0 100%;
            }
            .card-label {
                font-size: 1rem;
                font-weight: 500;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .card-value {
                font-size: 2.75rem;
                font-weight: 800;
                font-family: 'Outfit', sans-serif;
                color: var(--text-primary);
            }
            .card-trend {
                font-size: 0.95rem;
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 600;
            }
            .trend-up { color: #2ecc71; }
            .trend-down { color: #e74c3c; }

            .transaction-table-container {
                margin-top: 40px;
            }
            .finance-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 24px;
                background: var(--bg-secondary);
                border-radius: var(--radius-md);
                overflow: hidden;
            }
            .finance-table th {
                text-align: left;
                padding: 16px 24px;
                background: rgba(255,255,255,0.03);
                color: var(--text-secondary);
                font-weight: 600;
                text-transform: uppercase;
                font-size: 0.85rem;
                letter-spacing: 1px;
            }
            .finance-table td {
                padding: 16px 24px;
                border-bottom: 1px solid var(--border-color);
                color: var(--text-primary);
                font-size: 1rem;
            }
            .finance-table tr:last-child td {
                border-bottom: none;
            }
            .status-badge {
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 700;
                text-transform: uppercase;
            }
            .status-paid { background: rgba(46, 204, 113, 0.1); color: #2ecc71; }
            .status-pending { background: rgba(243, 156, 18, 0.1); color: #f39c12; }
        </style>

        <div class="finance-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px;">
            <div>
                <h2 style="font-size: 2.25rem; margin-bottom: 8px;">Financial Overview</h2>
                <p style="color: var(--text-secondary); font-size: 1.1rem;">Monitor revenue streams, operational costs, and profitability.</p>
            </div>
            <div style="display: flex; gap: 16px;">
                <button class="btn btn-secondary btn-lg"><i class="fas fa-file-invoice-dollar"></i> Generate Invoice</button>
                <button class="btn btn-primary btn-lg"><i class="fas fa-plus"></i> Record Expense</button>
            </div>
        </div>

        <div class="finance-overview">
            <div class="finance-card">
                <span class="card-label">Total Revenue</span>
                <span class="card-value">$428,500</span>
                <span class="card-trend trend-up">
                    <i class="fas fa-arrow-up"></i> 12.5% vs last month
                </span>
            </div>
            <div class="finance-card">
                <span class="card-label">Operational Costs</span>
                <span class="card-value">$154,200</span>
                <span class="card-trend trend-down">
                    <i class="fas fa-arrow-up"></i> 4.2% vs last month
                </span>
            </div>
            <div class="finance-card">
                <span class="card-label">Net Profit</span>
                <span class="card-value">$274,300</span>
                <span class="card-trend trend-up">
                    <i class="fas fa-arrow-up"></i> 18.1% vs last month
                </span>
            </div>
        </div>

        <div class="card" style="padding: 32px;">
            <h3 style="font-size: 1.5rem; margin-bottom: 8px;">Recent Transactions</h3>
            <p style="color: var(--text-secondary); margin-bottom: 24px;">Latest financial activities across yard operations.</p>
            
            <table class="finance-table">
                <thead>
                    <tr>
                        <th>Reference</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-weight: 700; color: var(--accent-primary);">#FIN-9021</td>
                        <td>Sale of Toyota Land Cruiser V8</td>
                        <td>Vehicle Sale</td>
                        <td style="font-weight: 800;">$85,000</td>
                        <td><span class="status-badge status-paid">Paid</span></td>
                    </tr>
                    <tr>
                        <td style="font-weight: 700; color: var(--accent-primary);">#FIN-9020</td>
                        <td>Workshop Service - Zone B</td>
                        <td>Service</td>
                        <td style="font-weight: 800;">$1,200</td>
                        <td><span class="status-badge status-paid">Paid</span></td>
                    </tr>
                    <tr>
                        <td style="font-weight: 700; color: var(--accent-primary);">#FIN-9019</td>
                        <td>Import Duty - Mitsubishi Fuso</td>
                        <td>Expense</td>
                        <td style="font-weight: 800; color: #e74c3c;">-$4,500</td>
                        <td><span class="status-badge status-pending">Pending</span></td>
                    </tr>
                    <tr>
                        <td style="font-weight: 700; color: var(--accent-primary);">#FIN-9018</td>
                        <td>Spare Parts Procurement</td>
                        <td>Warehouse</td>
                        <td style="font-weight: 800; color: #e74c3c;">-$12,400</td>
                        <td><span class="status-badge status-paid">Paid</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}
