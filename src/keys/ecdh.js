'use strict'

const crypto = require('crypto')

const curves = {
  'P-256': 'prime256v1',
  'P-384': 'secp384r1',
  'P-521': 'secp521r1'
}

exports.generateEphmeralKeyPair = async function (curve) { // eslint-disable-line require-await
  if (!curves[curve]) {
    throw new Error(`Unkown curve: ${curve}`)
  }
  const ecdh = crypto.createECDH(curves[curve])
  ecdh.generateKeys()

  return {
    key: ecdh.getPublicKey(),
    async genSharedKey (theirPub, forcePrivate) { // eslint-disable-line require-await
      if (forcePrivate) {
        ecdh.setPrivateKey(forcePrivate.private)
      }

      return ecdh.computeSecret(theirPub)
    }
  }
}
