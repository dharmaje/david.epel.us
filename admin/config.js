// Deployment configuration for the david.epel.us Admin SPA.
window.ADMIN_CONFIG = {
  // Microsoft Entra ID app registration (epel.us tenant).
  // The Enterprise Application has "Assignment required = Yes" and is assigned
  // to the security group "SSO david.epel.us admin" (Jason + David).
  auth: {
    clientId: "0dc8585d-6c73-442d-af79-68f9516598bf",
    tenantId: "889bc158-f0fb-4ffc-a54f-1def45b6e809",
    // Normalized so /admin/index.html and /admin/ both resolve to the single
    // registered redirect URI (https://david.epel.us/admin/).
    redirectUri: window.location.origin + window.location.pathname.replace(/index\.html$/, ""),
  },
  // GitHub repositories.
  github: {
    owner: "dharmaje",
    publicRepo: "david.epel.us",            // GitHub Pages site (ciphertext + gate)
    privateRepo: "david.epel.us-internal",  // plaintext sources + access-codes.xlsx
    branch: "main",
  },
  site: {
    baseUrl: "https://david.epel.us",
  },
  // Auth proxy (self-hosted on mm; source in david.epel.us-internal under
  // admin-proxy/, built from handoff-build-david-epel-us-api.md). When baseUrl
  // is set the app never asks for a GitHub token: it sends the signed Entra ID
  // token from login and the proxy makes the GitHub calls with a server-held
  // PAT. Leave "" to fall back to the per-session PAT gate.
  proxy: {
    baseUrl: "https://david-api.epel.us",
  },
  publishing: {
    pollIntervalMs: 15000,   // how often to check a pending page
    pollTimeoutMs: 600000,   // 10 min without success -> error state
    pageSize: 12,            // rows per page before pagination appears
    // Upload cap. Large files are supported (reads over 1 MB go through the
    // git blobs API), so this is a sanity bound, not an API limit — the gate
    // decrypts the whole page in the browser, so keep pages lean.
    maxUploadBytes: 26214400, // 25 MB
  },
  helpDesk: {
    // Two-person project: "help desk" is Jason's inbox.
    url: "mailto:j@epel.us?subject=david.epel.us%20admin",
    label: "Jason",
  },
};
