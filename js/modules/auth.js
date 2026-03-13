/**
 * Auth Module
 */

const ROLES = {
    ADMIN: 'Admin',
    SALES: 'Sales',
    YARD: 'Yard'
};

const state = {
    currentUser: null,
    isAuthenticated: false
};

export function initAuth(onLoginSuccess) {
    if (checkSession()) {
        onLoginSuccess();
        return;
    }

    showLoginScreen(onLoginSuccess);
}

function checkSession() {
    const savedUser = localStorage.getItem('cyms_user');
    if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
        state.isAuthenticated = true;
        return true;
    }
    return false;
}

export function getCurrentUser() {
    return state.currentUser;
}

export function logout() {
    localStorage.removeItem('cyms_user');
    window.location.reload();
}

function showLoginScreen(onLoginSuccess) {
    const appShell = document.getElementById('app');
    
    appShell.innerHTML = `
        <style>
            .auth-wrapper {
                display: flex;
                height: 100vh;
                width: 100vw;
                overflow: hidden;
                background: var(--bg-primary);
            }
            .auth-carousel-container {
                display: none;
            }
            @media (min-width: 900px) {
                .auth-carousel-container {
                    display: block;
                    flex: 1.25;
                    position: relative;
                }
            }
            .auth-slide {
                position: absolute;
                inset: 0;
                opacity: 0;
                transition: opacity 1.5s ease-in-out;
                background-size: cover;
                background-position: center;
            }
            .auth-slide.active {
                opacity: 1;
            }
            .auth-overlay {
                position: absolute;
                inset: 0;
                background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%);
            }
            .auth-marketing-content {
                position: absolute;
                bottom: 12%;
                left: 10%;
                right: 10%;
                color: white;
                z-index: 2;
                transform: translateY(20px);
                opacity: 0;
                transition: all 1s ease 0.5s;
            }
            .auth-slide.active .auth-marketing-content {
                transform: translateY(0);
                opacity: 1;
            }
            .auth-marketing-title {
                font-size: 2.8rem;
                font-weight: 700;
                margin-bottom: 16px;
                font-family: 'Outfit', sans-serif;
                line-height: 1.1;
                text-shadow: 0 4px 20px rgba(0,0,0,0.6);
            }
            .auth-marketing-text {
                font-size: 1.15rem;
                color: rgba(255,255,255,0.9);
                line-height: 1.6;
                text-shadow: 0 2px 10px rgba(0,0,0,0.6);
                max-width: 80%;
            }
            .auth-form-container {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 40px;
                position: relative;
                z-index: 10;
                border-left: 1px solid rgba(255,255,255,0.05);
            }
            .auth-indicators {
                position: absolute;
                bottom: 5%;
                left: 10%;
                display: flex;
                gap: 8px;
                z-index: 3;
            }
            .auth-indicator {
                width: 30px;
                height: 4px;
                background: rgba(255,255,255,0.3);
                border-radius: 2px;
                transition: background 0.3s ease;
            }
            .auth-indicator.active {
                background: var(--accent-primary);
            }
        </style>
        <div class="auth-wrapper animate-fade-in">
            <!-- Carousel Side -->
            <div class="auth-carousel-container">
                <div class="auth-slide active" style="background-image: url('assets/images/2016+BMW+420i.webp');">
                    <div class="auth-overlay"></div>
                    <div class="auth-marketing-content">
                        <div class="auth-marketing-title">Elevate Your Dealership Experience.</div>
                        <div class="auth-marketing-text">Mascardi CYMS streamlines inventory, empowers sales, and delivers premium analytics in one seamless platform.</div>
                    </div>
                </div>
                <div class="auth-slide" style="background-image: url('assets/images/Audi+Q5.webp');">
                    <div class="auth-overlay"></div>
                    <div class="auth-marketing-content">
                        <div class="auth-marketing-title">Precision Inventory Control.</div>
                        <div class="auth-marketing-text">Track every vehicle from arrival to delivery with real-time updates and comprehensive yard logistics management.</div>
                    </div>
                </div>
                <div class="auth-slide" style="background-image: url('assets/images/IMG_0095.webp');">
                    <div class="auth-overlay"></div>
                    <div class="auth-marketing-content">
                        <div class="auth-marketing-title">Accelerate Your Sales Pipeline.</div>
                        <div class="auth-marketing-text">Empower your sales team with actionable insights, detailed lead tracking, and performance metrics right at their fingertips.</div>
                    </div>
                </div>
                <div class="auth-slide" style="background-image: url('assets/images/Lesan-_EL_3543-13.webp');">
                    <div class="auth-overlay"></div>
                    <div class="auth-marketing-content">
                        <div class="auth-marketing-title">Drive Operational Excellence.</div>
                        <div class="auth-marketing-text">Centralize operations from the yard to the front desk, ensuring a premium, unified experience for every client.</div>
                    </div>
                </div>
                
                <div class="auth-indicators">
                    <div class="auth-indicator active"></div>
                    <div class="auth-indicator"></div>
                    <div class="auth-indicator"></div>
                    <div class="auth-indicator"></div>
                </div>
            </div>

            <!-- Form Side -->
            <div class="auth-form-container">
                <div class="card glass-card" style="width: 100%; max-width: 440px; padding: 48px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); background: rgba(30,30,30,0.6); backdrop-filter: blur(20px);">
                    <div style="text-align: center; margin-bottom: 40px;">
                        <div style="font-size: 2.2rem; font-weight: 800; color: var(--accent-primary); letter-spacing: -1px; margin-bottom: 8px;">
                            MASCARDI<span style="color: var(--text-primary)">CYMS</span>
                        </div>
                        <div style="color: var(--text-muted); font-size: 0.95rem;">Yard Management System v2.0</div>
                    </div>

                    <form id="login-form">
                        <div class="form-group">
                            <label class="form-label">Select Workspace Role</label>
                            <div style="position: relative;">
                                <select class="form-input" id="role-select" required style="cursor: pointer; appearance: none; padding-right: 40px; background: rgba(0,0,0,0.2);">
                                    <option value="ADMIN">System Administrator</option>
                                    <option value="SALES">Sales Executive</option>
                                    <option value="YARD">Yard Operations</option>
                                </select>
                                <i class="fas fa-chevron-down" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none;"></i>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Access Pin</label>
                            <div style="position: relative;">
                                <input type="password" class="form-input" placeholder="••••" value="1234" required style="letter-spacing: 4px; font-weight: 700; background: rgba(0,0,0,0.2);">
                                <i class="fas fa-lock" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; margin-top: 32px; font-size: 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                            Secure Login <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>
                        </button>
                        <div style="margin-top: 24px; text-align: center; color: var(--text-muted); font-size: 0.85rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
                            Demo Mode: Select any role and click login.
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Carousel Rotating Logic
    const slides = appShell.querySelectorAll('.auth-slide');
    const indicators = appShell.querySelectorAll('.auth-indicator');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            
            currentSlide = (currentSlide + 1) % slides.length;
            
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        }, 6000);
    }

    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const roleKey = document.getElementById('role-select').value;
        const user = {
            name: roleKey === 'ADMIN' ? 'Admin User' : roleKey === 'SALES' ? 'Sales Rep' : 'Yard Staff',
            role: ROLES[roleKey],
            id: `M-${Math.floor(Math.random() * 9000) + 1000}`
        };

        state.currentUser = user;
        state.isAuthenticated = true;
        localStorage.setItem('cyms_user', JSON.stringify(user));
        
        // Brief delay for "premium" feel
        const btn = e.target.querySelector('button');
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Authenticating...';
        btn.disabled = true;

        setTimeout(() => {
            onLoginSuccess();
        }, 800);
    });
}
