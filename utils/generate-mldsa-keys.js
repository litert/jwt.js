const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const OUT_DIR = path.join(__dirname, '../test-data');

if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
}

const algs = ['ml-dsa-44', 'ml-dsa-65', 'ml-dsa-87'];

for (const alg of algs) {
    console.log(`Generating ML-DSA key pair for ${alg}...`);
    for (const tag of ['ok', 'err']) {
        try {
            const { privateKey, publicKey } = crypto.generateKeyPairSync(alg, {
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem'
                }
            });

            fs.writeFileSync(path.join(OUT_DIR, `${tag}-${alg}.p8.pem`), privateKey);
            fs.writeFileSync(path.join(OUT_DIR, `${tag}-${alg}.pub.pem`), publicKey);
        } catch (e) {
            console.warn(`Skipping ${alg}: ${e.message}`);
        }
    }
}
