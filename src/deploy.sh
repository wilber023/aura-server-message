#!/bin/bash
# ----------------------------------------------------
# SCRIPT DE DESPLIEGUE COMPLETO - MICROSERVICIO DE MENSAJERÍA
# Objetivo: Despliegue en AWS EC2 (Ubuntu) con PM2, Nginx, Redis y SSL
# ----------------------------------------------------



# --- 1. Preparación del Sistema y Dependencias ---
echo "--- 1. Actualizando sistema e instalando dependencias básicas ---"
sudo apt update
sudo apt upgrade -y
sudo apt install -y curl git nginx python3-certbot-nginx mysql-client

# --- 2. Instalación de Node.js (v18+) ---
echo "--- 2. Instalando Node.js y PM2 ---"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# --- 3. Instalación y Configuración de Redis ---
echo "--- 3. Instalando y configurando Redis ---"
sudo apt install -y redis-server
# La configuración del Redis Adapter está en el código Node.js.

# --- 4. Configuración del Firewall (UFW) ---
echo "--- 4. Configurando Firewall ---"
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw allow 3306/tcp # Puerto MySQL (Si la DB está local)
sudo ufw allow 6379/tcp # Puerto Redis
sudo ufw --force enable

# --- 5. Despliegue del Código Fuente ---
echo "--- 5. Clonando repositorio y configurando proyecto ---"
if [ ! -d "$PROJECT_DIR" ]; then
    sudo mkdir -p $PROJECT_DIR
    sudo git clone $GIT_REPO $PROJECT_DIR
else
    echo "Directorio ya existe. Saltando clonación."
fi
cd $PROJECT_DIR

echo "--- Instalando dependencias ---"
npm install

# --- 6. Configuración y Migraciones ---
echo "--- 6. Configurando variables de entorno (Crear archivo .env) ---"
# Deberías tener un mecanismo para copiar el .env seguro a $PROJECT_DIR
# Ejemplo:
# echo "DB_HOST=localhost\nDB_USER=root\nDB_PASSWORD=secret\nDB_NAME=messaging_db\nREDIS_URL=redis://localhost:6379\nJWT_SECRET=super_seguro" > .env

echo "--- Ejecutando Migraciones DB (Requiere .env y sequelize-cli configurados) ---"
npm run migrate # Asumiendo que este script usa sequelize-cli para la ejecución

# --- 7. Configuración de Nginx (Reverse Proxy + WebSockets) ---
echo "--- 7. Configurando Nginx para soporte WSS/WebSockets ---"
sudo bash -c "cat > $NGINX_CONF_PATH" <<EOF
server {
    listen 80;
    server_name $DOMAIN_NAME;
    
    location / {
        proxy_pass http://localhost:$APP_PORT;
        proxy_http_version 1.1;
        
        # Headers ESSENCIALES para WebSocket
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -s $NGINX_CONF_PATH /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# --- 8. Configuración SSL con Certbot (WSS) ---
echo "--- 8. Configurando SSL con Certbot ---"
# Detener Nginx temporalmente si es necesario, o usar el modo webroot
# Instalación del certificado SSL
sudo certbot --nginx -d $DOMAIN_NAME -m $EMAIL --agree-tos --non-interactive

# --- 9. Iniciar Aplicación con PM2 (Modo Clúster para WebSockets) ---
echo "--- 9. Iniciando aplicación con PM2 en modo clúster ---"
# El modo clúster de PM2 funcionará con Socket.io gracias al Redis Adapter.
pm2 start src/server.js --name $PROJECT_NAME -i max 
pm2 save

echo "✅ Despliegue Completo: El microservicio está corriendo y escalando con PM2/Redis/Nginx."