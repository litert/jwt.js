import * as LibJwt from '../lib';
import * as NodeFS from 'node:fs';

const KEY_DIR = `${__dirname}/../debug`;

for (const k of [
    'ed25519',
    'ed448',
] as const) {

    const okKeyId = `ok-${k}`;
    const errKeyId = `err-${k}`;

    const okPubKeyFiles = [
        `${okKeyId}.pub.pem`,
    ];

    const errPubKeyFiles = [
        `${errKeyId}.pub.pem`,
    ];

    const okPrivKeyFiles = [
        `${okKeyId}.p8.pem`,
    ];

    const errPrivKeyFiles = [
        `${errKeyId}.p8.pem`,
    ];

    console.log(`=== Token signed with ${k} ===`);

    for (const okKey of okPrivKeyFiles) {

        const signer = new LibJwt.EddsaJwtSigner({
            privateKey: NodeFS.readFileSync(`${KEY_DIR}/${okKey}`, 'utf-8'),
            keyId: okKeyId,
        });

        const token = LibJwt.stringify({
            header: { kid: signer.keyId! },
            payload: {
                sub: '1234567890',
                name: 'John Doe',
                admin: true,
            },
            signer,
        });

        console.log(`Token[${k}][${okKey}]: ${token}`);

        for (const okPub of [
            ...okPrivKeyFiles,
            ...okPubKeyFiles,
        ]) {

            const okVerifier = new LibJwt.EddsaJwtVerifier({
                publicKey: NodeFS.readFileSync(`${KEY_DIR}/${okPub}`, 'utf-8'),
            });

            if (okVerifier.validate(LibJwt.parse(token))) {

                console.info(`${okKey} * ${okPub} should passed => OK`);
            }
            else {

                console.error(`${okKey} * ${okPub} should passed => FAILED`);
            }

            const errVerifiers = [
                ...errPrivKeyFiles,
                ...errPubKeyFiles,
            ];

            for (const errPub of errVerifiers) {

                const errVerifier = new LibJwt.EddsaJwtVerifier({
                    publicKey: NodeFS.readFileSync(`${KEY_DIR}/${errPub}`, 'utf-8'),
                });

                if (!errVerifier.validate(LibJwt.parse(token))) {

                    console.error(`${okKey} * ${errPub} should failed => OK`);
                }
                else {

                    console.info(`${okKey} * ${errPub} should failed => FAILED`);
                }
            }
        }
    }
}
