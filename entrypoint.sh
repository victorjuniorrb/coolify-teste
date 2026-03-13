#!/bin/sh
# Gera o HTML dinamicamente com as variáveis passadas pelo Coolify
echo "<html>
<body style='font-family:sans-serif; background:#f4f4f4; padding:50px'>
    <div style='background:white; padding:20px; border-radius:10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1)'>
        <h1 style='color:#2c3e50'>Monitor de Deploy - LABIC/UFG</h1>
        <hr>
        <p><strong>Status:</strong> Online</p>
        <p><strong>Ambiente:</strong> $TARGET_ENV</p>
        <p><strong>Versão do Build:</strong> $BUILD_VERSION</p>
        <p><strong>ID do Container (Hostname):</strong> $(hostname)</p>
        <p><strong>Data/Hora do Sistema:</strong> $(date)</p>
    </div>
</body>
</html>" > /usr/share/nginx/html/index.html

# Inicia o Nginx
nginx -g "daemon off;"
