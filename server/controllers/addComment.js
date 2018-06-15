const {
  mysql
} = require('../qcloud')

module.exports = async (ctx) => {
  const {
    comment,
    phone,
    address,
    bookId,
    openId
  } = ctx.request.body

  try {
    await mysql('comments').insert({
      comment: comment,
      phone,
      address,
      bookid: bookId,
      openid: openId
    })
    ctx.state.data = {
      msg:'success'
    }
  } catch (error) {
    ctx.state.data = {
      msg:error
    }
  }

}
