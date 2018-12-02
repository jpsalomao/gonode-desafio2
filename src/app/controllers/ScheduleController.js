const moment = require('moment')
const { Op } = require('sequelize')
const { Appointment, User } = require('../models')

class ScheduleController {
  async index (req, res) {
    const date = moment(parseInt(req.query.date))
    const provider = req.session.user.id
    const appointments = await Appointment.findAll({
      where: {
        provider_id: provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      },
      include: [
        {
          model: User,
          as: 'user'
        }
      ]
    })
    const schedule = appointments.map(appointment => {
      return {
        user: appointment.user,
        date: moment(appointment.date).format('HH:mm')
      }
    })
    console.log(schedule)
    return res.render('schedule/index', { schedule })
  }
}

module.exports = new ScheduleController()
