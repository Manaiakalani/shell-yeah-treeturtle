FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy PRD Generator app
COPY prd-generator-app/src/ /usr/share/nginx/html/prd-generator/

# Copy TreeTurtle Explorer app
COPY tree-turtle/ /usr/share/nginx/html/explorer/

# Create a landing page that links to both apps
COPY <<'EOF' /usr/share/nginx/html/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TreeTurtle 🐢🌳</title>
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    :root { --bg: #050508; --surf: #111120; --brd: #2c2c50; --text: #ededf5; --text-2: #a5a5c0; --lime: #b8f53d; --purple: #a855f7; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .container { text-align: center; max-width: 500px; padding: 40px 20px; }
    h1 { font-size: 3rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 8px; }
    .tree { background: linear-gradient(135deg, var(--lime), #2dd4bf); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .turtle { background: linear-gradient(135deg, var(--purple), #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    p { color: var(--text-2); margin-bottom: 36px; font-size: 1.05rem; line-height: 1.6; }
    .links { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    a { display: inline-block; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 1rem; transition: all 0.2s; }
    .link-prd { background: var(--surf); color: var(--lime); border: 1px solid var(--lime); }
    .link-prd:hover { background: var(--lime); color: #000; transform: translateY(-2px); }
    .link-explorer { background: var(--surf); color: var(--purple); border: 1px solid var(--purple); }
    .link-explorer:hover { background: var(--purple); color: #fff; transform: translateY(-2px); }
  </style>
</head>
<body>
  <div class="container">
    <h1><span class="tree">Tree</span><span class="turtle">Turtle</span></h1>
    <p>Two apps about trees near you and turtle facts that slap. Pick your vibe.</p>
    <div class="links">
      <a href="/prd-generator/" class="link-prd">🌲 PRD Generator</a>
      <a href="/explorer/" class="link-explorer">🐢 Explorer</a>
    </div>
  </div>
</body>
</html>
EOF

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
