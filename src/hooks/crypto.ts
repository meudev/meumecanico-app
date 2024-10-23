import * as Crypto from 'expo-crypto';

export default async function crypto(value: string) {
    const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, value);

    return digest;
}