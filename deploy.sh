#!/usr/bin/env bash
set -euo pipefail

printf '\033[0;93m🤔 [WARN] Tenés que tener las keys del server para hacer esto\n'
npm run prod
ssh root@143.198.129.115 'rm -r /root/pluggo/web/npm'
scp -r npm root@143.198.129.115:/root/pluggo/web/npm
ssh root@143.198.129.115 "bash -c 'PATH=/root/.nvm/versions/node/v14.17.0/bin /root/.nvm/versions/node/v14.17.0/bin/pm2 restart pluggo-fe'"
