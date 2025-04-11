#!/bin/bash

# Função para verificar a existência de um comando
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo "Tentando encontrar o Node.js"
sleep 1

loading_animation() {
    for i in {1..3}; do
        echo -n "Loading"
        for j in $(seq 1 $i); do
            echo -n "."
        done
        echo
        sleep 1
        clear
    done
}

loading_animation

# Verifica se o Node.js está instalado
if ! command_exists node; then
    echo "Node.js não encontrado. Por favor, instale manualmente: https://nodejs.org/en"
    exit 1
fi

NODE_PATH=$(which node)
echo "Node.js encontrado em: $NODE_PATH"
node --version

# Instala dependências se a pasta node_modules não existir
if [ ! -d "node_modules" ]; then
    echo "Instalando dependências do npm..."
    npm install
fi

# Verifica se o tsx está instalado globalmente
if ! command_exists tsx; then
    echo "Instalando tsx..."
    npm install -g tsx
fi

# Executa o aplicativo
tsx .
