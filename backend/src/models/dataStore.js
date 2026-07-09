/**
 * In-memory data store with optional JSON file persistence.
 * Acts as the database layer — swap with MongoDB/PostgreSQL when ready.
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/db.json');

// ─── In-Memory Store ────────────────────────────────────────────────────────
let store = {
  users: [],
  resumes: [],
};

// ─── Load from file on startup ───────────────────────────────────────────────
function loadFromFile() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      store = JSON.parse(raw);
      console.log('[DataStore] Loaded data from file.');
    }
  } catch (err) {
    console.warn('[DataStore] Could not load data file, using empty store.');
  }
}

// ─── Persist to file ─────────────────────────────────────────────────────────
function saveToFile() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
  } catch (err) {
    console.error('[DataStore] Failed to persist data:', err.message);
  }
}

// Initialize on require
loadFromFile();

// ─── User Operations ─────────────────────────────────────────────────────────
const users = {
  findAll: () => store.users,

  findById: (id) => store.users.find((u) => u.id === id),

  findByEmail: (email) =>
    store.users.find((u) => u.email.toLowerCase() === email.toLowerCase()),

  create: (userData) => {
    const user = {
      id: require('uuid').v4(),
      createdAt: new Date().toISOString(),
      ...userData,
    };
    store.users.push(user);
    saveToFile();
    return user;
  },

  update: (id, updates) => {
    const idx = store.users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    store.users[idx] = { ...store.users[idx], ...updates, updatedAt: new Date().toISOString() };
    saveToFile();
    return store.users[idx];
  },
};

// ─── Resume Operations ────────────────────────────────────────────────────────
const resumes = {
  findAll: () => store.resumes,

  findById: (id) => store.resumes.find((r) => r.id === id),

  findByUserId: (userId) => store.resumes.filter((r) => r.userId === userId),

  create: (resumeData) => {
    const resume = {
      id: require('uuid').v4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...resumeData,
    };
    store.resumes.push(resume);
    saveToFile();
    return resume;
  },

  update: (id, updates) => {
    const idx = store.resumes.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    store.resumes[idx] = {
      ...store.resumes[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveToFile();
    return store.resumes[idx];
  },

  delete: (id) => {
    const idx = store.resumes.findIndex((r) => r.id === id);
    if (idx === -1) return false;
    store.resumes.splice(idx, 1);
    saveToFile();
    return true;
  },
};

module.exports = { users, resumes };
