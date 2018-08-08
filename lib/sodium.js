var sodiumSignatures = require('sodium-signatures')

class SodiumSigner {
  constructor(key) {
    this.secretKey = Buffer.from(key, 'hex')
    this.type = 'sodium'
    this.message = ''
  }
  createSign(alg) {
    this.alg = alg
    console.log("creating signature with alg", alg)
    return this
  }
  update(str) {
    this.message += str
  }
  sign() {
    console.log("signing message", this.message)
    const sig = sodiumSignatures.sign(Buffer.from(this.message), this.secretKey)
    console.log("sig:", sig.toString('hex'))
    return {
      hashAlgorithm: this.alg,
      toString: () => sig.toString('base64')
    }
  }
}

class SodiumVerifier {
  constructor(pubKey) {
    this.publicKey = Buffer.from(pubKey, 'hex')
    this.type = 'sodium'
    this.message = ''
  }
  createVerify(alg) {
    console.log("creating verifier with", alg)
    this.alg = alg
    return this
  }
  update(str) {
    this.message += str
  }
  verify(signature, encoding) {
    const valid = sodiumSignatures.verify(Buffer.from(this.message), Buffer.from(signature, encoding), this.publicKey)
    return valid
  }
}

module.exports = {
  SodiumSigner,
  SodiumVerifier
}
