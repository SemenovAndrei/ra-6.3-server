const http = require('http')
const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const koaBody = require('koa-body')

const app = new Koa()

app.use(cors())
app.use(koaBody({ json: true }))

const answers = [
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content: 'Спишь?',
  },
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content: 'Маску носишь?',
  },
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content: 'Дождь идет :(',
  },
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content: 'Скоро пятница!!!',
  },
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content: 'Как успевать делать ДЗ?!',
  },
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content: 'Zzz...',
  },
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content: 'Пауки-сенокосцы ловят свою добычу, набрасывая на неё паутину, как лассо',
  },
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content: 'ДНК человека на 30% совпадает с ДНК салата',
  },
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content: 'Коричневые яйца дают куры с красными перьями, белые — с белыми.',
  },
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content: 'Тигры имеют не только полосатый мех, но и полосатую кожу.',
  },
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content: 'У жирафа нет голосовых связок.',
  },
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content:
      'В Финляндии есть щенок Джеки, который при упоминании Гитлера делает «Зиг хайль!»',
  },
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content:
      'В большинстве рекламных объявлений, в том числе газеты, время, показанное на часах 10:10.',
  },
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content:
      'После 1680 г каждому фpанцузу стаpше 7 лет вменялось в обязанность потpеблять ежегодно 7 фунтов соли. За наpушение этого закона виновного пpиговаpивали к штpафу в 300 ливpов.',
  },
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content: 'Пауки-крестовики каждое утро съедают свою сеть, а потом строят её заново.',
  },
  {
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content:
      'Зоопаpк в Токио каждый год закpывается на 2 месяца, чтобы звеpи могли отдохнyть от посетителей',
  },
]

const messages = [
  {
    id: 1,
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content: 'Привет!',
  },
  {
    id: 2,
    userId: '5f2d9da0-f624-4309-a598-8ba35d6c4bb6',
    content: 'Как дела? :)',
  },
]
let nextId = 3

const router = new Router()

router.get('/messages', async (ctx, next) => {
  console.log(Number(ctx.request.query.from))
  const from = Number(ctx.request.query.from)
  if (ctx.request.query.from === 0) {
    ctx.response.body = messages
    return
  }

  const fromIndex = messages.findIndex((o) => o.id === from)
  if (fromIndex === -1) {
    ctx.response.body = messages
    return
  }

  console.log('slice')
  ctx.response.body = messages.slice(fromIndex + 1)
})

router.post('/messages', async (ctx, next) => {
  messages.push({ ...JSON.parse(ctx.request.body), id: nextId++ })
  console.log(JSON.parse(ctx.request.body))
  ctx.response.status = 204

  const cnt = Math.floor(Math.random() * 4 + 1)
  const addAnswers = setInterval(() => {
    const index = Math.floor(Math.random() * (answers.length - 1))
    console.log(index)
    messages.push({ ...answers[index], id: nextId++ })
  }, 1000)
  setTimeout(() => clearInterval(addAnswers), cnt * 1000)
})

app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 7777
const server = http.createServer(app.callback())
server.listen(port, () => console.log('server started'))
