module.exports = (req, res, next) => {
  const { provider } = req.session.user
  if (provider) {
    return next()
  }
  return res.redirect('/app/dashboard')
}
