import * as LibJwt from '../lib';

const JWT_SECRET = 'hello-world-nTqb91omeWcYYXIld76preWHFEiRNEN4';
const token = LibJwt.stringify({
    header: {
        'test': 123,
    },
    payload: {
        sub: '1234567890',
        name: 'John Doe',
        admin: true,
        data: {
            a: '123',
            b: 456,
            c: false,
        },
        "eUrl": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    signer: new LibJwt.HmacJwtSigner({
        key: JWT_SECRET,
        digestType: LibJwt.EDigestType.SHA256,
    })
});

console.log(token);

const info = LibJwt.parse(token);

console.log(info);

const verifier = new LibJwt.HmacJwtVerifier({
    key: JWT_SECRET,
    digestType: LibJwt.EDigestType.SHA256,
});

if (verifier.validate(info)) {

    console.log('Signature is valid.');
}
else {

    console.error('Signature is INVALID.');
}
