const {
  mysql
} = require('../qcloud')
module.exports = async (ctx) => {
  const {
    id
  } = ctx.request.query
  const detail = await mysql('books')
    .select('books.*', 'cSessionInfo.user_Info')
    .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
    .where('id', id)
    .first()

  await mysql('books')
    .where('id', id)
    .increment('count', 1)

  const info = JSON.parse(detail.user_Info)
  ctx.state.data = Object.assign({}, detail, {
    tags:detail.tags.split(','),
    summary:detail.summary.split('\n'),
    user_Info:{
      nickName:info.nickName,
      avatar:info.avatarUrl
    }
  })

}
