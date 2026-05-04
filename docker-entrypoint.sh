#!/bin/sh
set -e

: "${VITE_BASE_URL:?VITE_BASE_URL is not set}"

cat > /usr/share/nginx/html/config.js <<EOF
window.__APP_CONFIG__ = {
  baseURL: "${VITE_BASE_URL}"
};
EOF
