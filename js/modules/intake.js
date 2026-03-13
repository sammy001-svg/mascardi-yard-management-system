/**
 * Vehicle Intake Module
 */

export function initIntake() {
    const container = document.createElement('div');
    container.className = 'intake-module';
    
    container.innerHTML = `
        <div class="card glass-card animate-fade-in">
            <div class="card-header">
                <h3>New Vehicle Registration</h3>
                <span class="badge" style="background: var(--accent-primary); padding: 4px 12px; border-radius: 20px; font-size: 0.75rem;">Step 1 of 2</span>
            </div>
            
            <form id="intake-form" class="mt-4">
                <div class="form-group">
                    <label class="form-label">VIN Number</label>
                    <div style="display: flex; gap: 12px;">
                        <input type="text" class="form-input" id="vin-input" placeholder="Enter 17-digit VIN..." style="text-transform: uppercase;">
                        <button type="button" class="btn btn-primary" id="decode-btn">Decode</button>
                    </div>
                    <small style="color: var(--text-muted); margin-top: 8px; display: block;">Decodes Year, Make, Model, and Engine automatically.</small>
                </div>

                <div id="decoded-info" style="display: none;" class="animate-fade-in">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Make</label>
                            <input type="text" class="form-input" id="make" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Model</label>
                            <input type="text" class="form-input" id="model" readonly>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Year</label>
                            <input type="text" class="form-input" id="year" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Color</label>
                            <select class="form-input">
                                <option>Pearl White</option>
                                <option>Black Metallic</option>
                                <option>Silver</option>
                                <option>Dark Blue</option>
                                <option>Wine Red</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Vehicle Photos (At least 4 required)</label>
                        <div class="photo-upload-grid">
                            <div class="upload-placeholder"><i class="fas fa-camera"></i><span>Front</span></div>
                            <div class="upload-placeholder"><i class="fas fa-camera"></i><span>Rear</span></div>
                            <div class="upload-placeholder"><i class="fas fa-camera"></i><span>L-Side</span></div>
                            <div class="upload-placeholder"><i class="fas fa-camera"></i><span>R-Side</span></div>
                            <div class="upload-placeholder"><i class="fas fa-plus"></i></div>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 16px; margin-top: 32px;">
                        <button type="button" class="btn btn-secondary">Cancel</button>
                        <button type="submit" class="btn btn-primary">Proceed to Yard Assignment <i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            </form>
        </div>
    `;

    // Add Logic
    setTimeout(() => {
        const decodeBtn = container.querySelector('#decode-btn');
        const vinInput = container.querySelector('#vin-input');
        const decodedInfo = container.querySelector('#decoded-info');

        decodeBtn.addEventListener('click', () => {
            if (vinInput.value.length >= 11) {
                // Mock Decoding
                container.querySelector('#make').value = 'TOYOTA';
                container.querySelector('#model').value = 'PRADO';
                container.querySelector('#year').value = '2022';
                decodedInfo.style.display = 'block';
                decodeBtn.innerHTML = '<i class="fas fa-check"></i> Decoded';
                decodeBtn.style.background = '#2ecc71';
            } else {
                alert('Please enter a valid VIN (mock: at least 11 chars)');
            }
        });
    }, 0);

    return container;
}
