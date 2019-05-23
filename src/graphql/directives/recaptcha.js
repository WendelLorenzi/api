const ReCAPTCHA = require('recaptcha2')

const recaptcha = new ReCAPTCHA({
  // eslint-disable-line new-cap
  siteKey: process.env.RECAPTCHA_SITE_KEY,
  secretKey: process.env.RECAPTCHA_SECRET_KEY
})

module.exports = {
  async recaptcha (next, _, requires, { recaptchaData }) {
    const { key, ip } = recaptchaData
    if (!key || key === '') {
      throw new Error('Recaptcha key missing')
    }
    try {
      await recaptcha.validate(key, ip)
    } catch (err) {
      throw err
    }
    return next()
  }
}
