# Cakey's Bakery

CS340 Project

## Other Info

Redeployment

cakeys_app directory:
git fetch
npm install (if necessary)
npm run build

main directory:
rm -rf ~/public_html/* # clear prior contents
cp -avr ~/cakeys_app/build/. ~/public_html # move build folder to public_html
chmod -R 755 ~/public_html # change permissions

cp -avr ~/cakeys_app/backend/. ~/express_server