"use strict"

const rand = (range) => range * Math.random()

const bolt = {
  x: 0,
  y: 0,
  newX: 0,
  newY: 0,
  angle: 0,
  size: 2,
  history: [],

  distanceFromCenter: function() {
    const dcy = Math.abs(this.newY - this.cy)
    const dcx = Math.abs(this.newX - this.cx)

    return Math.sqrt(dcy*dcy + dcx*dcx)
  },

  step: function() {
    const r = Math.random()
    this.angle += (r - 0.5)*0.8
    this.x = this.newX
    this.y = this.newY

    this.newX = Math.cos(this.angle)*this.size + this.x
    this.newY = Math.sin(this.angle)*this.size + this.y

    const dist = (this.cx < this.cy) ? this.cx*0.9 : this.cy*0.9
    if (this.distanceFromCenter() > dist) {
      // noLoop()
      for (let i = 1; i < this.history.length; i++) {
        const x1 = this.history[i-1][0]
        const y1 = this.history[i-1][1]
        const x2 = this.history[i][0]
        const y2 = this.history[i][1]
        line(x1, y1, x2, y2)
      }

      this.onEnd()
    } else {
      this.history.push([this.x, this.y])
    }
  },

  draw: function() {
    line(this.x, this.y, this.newX, this.newY)
  }
}

const makeBolt = (mixin) => {
  let newBolt = {
    angle: rand(Math.PI*2),
    history:[],

    onEnd: function() {
      bolts = bolts.filter( bolt => bolt.id !== this.id)
      bolts.push(makeBolt(mixin))
    }
  }

  return Object.assign(Object.create(bolt), newBolt, mixin || {})
}


let bolts = []

function setup() {
  createCanvas(windowWidth, windowHeight, P2D)
  stroke(255)
  fill(0,0,0,40)

  for (let i = 0; i < 20; i++)
    bolts.push(makeBolt({
      id: i,
      newX: windowWidth/2,
      newY: windowHeight/2,
      cx: windowWidth/2,
      cy: windowHeight/2,
    }))
}

function draw() {
  rect(0, 0, windowWidth, windowHeight)

  bolts.forEach( b => {
    b.step()
    b.draw()
  })
}
