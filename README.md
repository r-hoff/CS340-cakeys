# Cakey's Bakery

CS340 Project

## Other Info

Redeployment

cakeys directory:
git pull origin main
npm install (if necessary)
npm run build

main directory:
rm -rf ~/public_html/* # clear prior contents
cp -avr ~/cakeys/build/. ~/public_html # move build folder to public_html
chmod -R 755 ~/public_html # change permissions

express server:
rm -rf ~/express_server/* # clear prior contents
cp -avr ~/cakeys/backend/. ~/express_server
npm install (if necessary)