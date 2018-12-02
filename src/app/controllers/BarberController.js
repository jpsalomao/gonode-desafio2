class BarberController {
  index (req, res) {
    return res.render('barber/index')
  }
}

module.exports = new BarberController()
