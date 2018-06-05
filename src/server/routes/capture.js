const timeout = ms => new Promise(res => setTimeout(res, ms))

const captureOptions = {
  fullPage: false,
  omitBackground: true,
  type: 'png',
  clip: {
    x: 0,
    y: 0,
    width: 550,
    height: 550
  }
}

module.exports = browser => async (req, res, next) => {
  console.log('CAPTURING')
  const page = await browser.newPage()
  await page.goto('http://localhost:3000/storycubes')
  await page.setViewport({ width: 550, height: 550 })

  await timeout(1000)
  const img = await page.screenshot(captureOptions)
  res.set({ 'Content-Type': 'image/png' })
  res.end(img, 'binary')
}
