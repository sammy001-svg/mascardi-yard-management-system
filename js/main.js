import { initAuth, getCurrentUser, logout } from './modules/auth.js';

/**
 * Mascardi CYMS - Main Controller
 */

const state = {
  currentModule: "dashboard",
  user: null
};

const modules = {
  dashboard: {
    title: "Dashboard",
    init: async () => {
      const { initDashboard } = await import("./modules/dashboard.js");
      return initDashboard();
    },
  },
  sales: {
    title: "Sales CRM",
    init: async () => {
      const { initSales } = await import("./modules/sales.js");
      return initSales();
    },
  },
  inventory: {
    title: "Inventory",
    init: async () => {
      const { initInventory } = await import("./modules/inventory.js");
      return initInventory();
    },
  },
  intake: {
    title: "Vehicle Intake",
    init: async () => {
      const { initIntake } = await import("./modules/intake.js");
      return initIntake();
    },
  },
  yard: {
    title: "Yard Mapping",
    init: async () => {
      const { initYardMap } = await import('./modules/yardMap.js');
      return initYardMap();
    }
  },
  tracking: {
    title: "Movement Tracking",
    init: async () => {
      const { initTracking } = await import('./modules/tracking.js');
      return initTracking();
    }
  },
  inspection: {
    title: "Inspections",
    init: async () => {
      const { initInspection } = await import('./modules/inspection.js');
      return initInspection();
    }
  },
  workshop: {
    title: "Workshop Management",
    init: async () => {
      const { initWorkshop } = await import('./modules/workshop.js');
      return initWorkshop();
    }
  },
  keys: {
    title: "Key Control",
    init: async () => {
      const { initKeys } = await import('./modules/keys.js');
      return initKeys();
    }
  },
  reports: {
    title: "All Company Reports",
    init: async () => {
      const { initReports } = await import('./modules/reports.js');
      return initReports();
    }
  },
};

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  initAuth(() => {
    initializeApp();
  });
});

function initializeApp() {
  state.user = getCurrentUser();
  buildAppShell(state.user);
  
  // Default module based on role
  const defaultModule = state.user.role === 'Sales' ? 'sales' : 'dashboard';
  navigateTo(defaultModule);
}

function buildAppShell(user) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="app-container">
      <aside class="sidebar">
        <div class="sidebar-header">
           <div class="logo">
            MASCARDI<span style="color: white; opacity: 0.5">CYMS</span>
          </div>
        </div>
        
        <ul class="nav-links">
          ${getNavItems(user.role)}
        </ul>

        <div class="sidebar-footer">
           <div class="user-profile">
              <div class="user-info">
                  <div class="user-name">${user.name}</div>
                  <div class="user-role">${user.role}</div>
              </div>
              <button id="logout-btn" class="logout-btn" title="Logout">
                  <i class="fas fa-sign-out-alt"></i>
              </button>
           </div>
        </div>
      </aside>
      
      <main class="main-wrapper">
        <header class="top-header">
          <div class="page-title">
            <h2 id="current-page-title">Dashboard</h2>
          </div>
          <div class="header-actions">
            <!-- Action items can be added here -->
          </div>
        </header>
        
        <section class="content-body" id="main-content">
          <!-- content will be injected here -->
        </section>
      </main>
    </div>
  `;

  // Attach logout listener
  document.getElementById('logout-btn').addEventListener('click', logout);
  
  // Attach sidebar listeners
  document.querySelectorAll('.nav-link[data-module]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const moduleName = link.getAttribute('data-module');
      navigateTo(moduleName);
    });
  });
}

function getNavItems(role) {
  const allItems = [
    { id: 'dashboard', icon: 'fas fa-chart-line', label: 'Dashboard', roles: ['Admin', 'Sales', 'Yard'] },
    { id: 'sales', icon: 'fas fa-users-viewfinder', label: 'Sales CRM', roles: ['Admin', 'Sales', 'Yard'] },
    { id: 'inventory', icon: 'fas fa-list', label: 'Inventory', roles: ['Admin', 'Sales', 'Yard'] },
    { id: 'intake', icon: 'fas fa-plus-circle', label: 'Vehicle Intake', roles: ['Admin', 'Yard'] },
    { id: 'yard', icon: 'fas fa-map-marked-alt', label: 'Yard Mapping', roles: ['Admin', 'Yard', 'Sales'] },
    { id: 'tracking', icon: 'fas fa-route', label: 'Movement Tracking', roles: ['Admin', 'Yard'] },
    { id: 'inspection', icon: 'fas fa-clipboard-check', label: 'Inspections', roles: ['Admin', 'Yard'] },
    { id: 'workshop', icon: 'fas fa-tools', label: 'Workshop', roles: ['Admin', 'Yard'] },
    { id: 'keys', icon: 'fas fa-key', label: 'Key Control', roles: ['Admin', 'Yard'] },
    { id: 'reports', icon: 'fas fa-chart-pie', label: 'Reports', roles: ['Admin', 'Sales', 'Yard'] }
  ];

  return allItems
    .map(item => `
      <li class="nav-item">
        <a href="#" class="nav-link ${item.id === state.currentModule ? 'active' : ''}" data-module="${item.id}">
          <i class="${item.icon}"></i>
          <span>${item.label}</span>
        </a>
      </li>
    `).join('');
}

async function navigateTo(moduleName) {
  const module = modules[moduleName];
  if (!module) return;

  state.currentModule = moduleName;

  // Update Title
  const titleEl = document.getElementById("current-page-title");
  if (titleEl) titleEl.textContent = module.title;

  // Update Active Link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-module") === moduleName) {
      link.classList.add("active");
    }
  });

  // Load Content
  const container = document.getElementById("main-content");
  if (!container) return;
  
  container.innerHTML = '<div class="loader">Loading...</div>';

  try {
    const content = await module.init();
    if (typeof content === "string") {
      container.innerHTML = `<div class="animate-fade-in">${content}</div>`;
    } else if (content instanceof HTMLElement) {
      container.innerHTML = "";
      const wrapper = document.createElement("div");
      wrapper.className = "animate-fade-in";
      wrapper.appendChild(content);
      container.appendChild(wrapper);
    }
  } catch (err) {
    console.error("Error loading module:", err);
    container.innerHTML = `<div class="error">Failed to load ${module.title}. Please try again.</div>`;
  }
}

export { navigateTo, state };
