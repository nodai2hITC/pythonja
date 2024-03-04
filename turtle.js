"use strict";

const turtle_py = `
from pathlib import Path
Path("turtle.py").write_text("""\
import js
import json
import math

class Vec2D(tuple):
    def __new__(cls, x, y):
        return tuple.__new__(cls, (x, y))
    def __add__(self, other):
        return Vec2D(self[0]+other[0], self[1]+other[1])
    def __mul__(self, other):
        if isinstance(other, Vec2D):
            return self[0]*other[0]+self[1]*other[1]
        return Vec2D(self[0]*other, self[1]*other)
    def __rmul__(self, other):
        if isinstance(other, int) or isinstance(other, float):
            return Vec2D(self[0]*other, self[1]*other)
        return NotImplemented
    def __sub__(self, other):
        return Vec2D(self[0]-other[0], self[1]-other[1])
    def __neg__(self):
        return Vec2D(-self[0], -self[1])
    def __abs__(self):
        return math.hypot(*self)
    def rotate(self, angle):
        perp = Vec2D(-self[1], self[0])
        angle = math.radians(angle)
        c, s = math.cos(angle), math.sin(angle)
        return Vec2D(self[0]*c+perp[0]*s, self[1]*c+perp[1]*s)
    def __getnewargs__(self):
        return (self[0], self[1])
    def __repr__(self):
        return "(%.2f,%.2f)" % self

class Turtle:
    def __init__(self):
        self._pos = Vec2D(0.0, 0.0)
        self._angle = 0.0
        self._speed = 3
        self._pensize = 1
        self._pendown = True
        self._log = []

    def forward(self, distance):
        new_pos = self._pos + Vec2D(distance, 0).rotate(self._angle)
        pensize = self._pensize if self._pendown else 0
        time = abs(distance) / 2 / self._speed if self._speed > 0 else 0
        self._log.append([new_pos[0], new_pos[1], self._angle, time, pensize])
        self._pos = new_pos
    fd = forward

    def back(self, distance):
        self.forward(-distance)
    bk = back
    backward = back

    def left(self, angle):
        new_angle = self._angle + angle
        time = abs(angle) / 2 / self._speed if self._speed > 0 else 0
        self._log.append([self._pos[0], self._pos[1], new_angle, time, 0])
        self._angle = new_angle
    lt = left

    def right(self, angle):
        self.left(-angle)
    rt = right

    def goto(self, x, y=None):
        if y is None:
            new_pos = x
        else:
            new_pos = Vec2D(x, y)
        pensize = self._pensize if self._pendown else 0
        time = math.sqrt((self._pos[0] - new_pos[0])**2 + (self._pos[1] - new_pos[1])**2) / 2 / self._speed if self._speed > 0 else 0
        self._log.append([new_pos[0], new_pos[1], self._angle, time, pensize])
        self._pos = new_pos

    setpos = goto
    setposition = goto

    def setx(self, x):
        self.goto(x, self._pos[1])

    def sety(self, y):
        self.goto(self._pos[0], y)

    def setheading(self, angle):
        new_angle = angle
        time = abs(self._angle - angle) % 360 / 4 / self._speed if self._speed > 0 else 0
        self._log.append([self._pos[0], self._pos[1], new_angle, time, 0])
        self._angle = new_angle
    seth = setheading

    def home(self):
        self.goto(0, 0)
        self.setheading(0)

    def penup(self):
        self._pendown = False
    pu = penup
    up = penup

    def pendown(self):
        self._pendown = True
    pd = pendown
    down = pendown

    def pensize(self, size):
        self._pensize = size
    width = pensize

    def speed(self, sp=None):
        if sp is None:
            return self._speed
        speeds = {'fastest': 0, 'fast': 10, 'normal': 6, 'slow': 3, 'slowest': 1 }
        if sp in speeds:
            self._speed = speeds[sp]
        else:
            self._speed = sp

    def to_json(self):
        return json.dumps(self._log)

def forward(distance):
    turtles[0].forward(distance)
fd = forward

def back(distance):
    turtles[0].back(distance)
bk = back
backward = back

def left(angle):
    turtles[0].left(angle)
lt = left

def right(angle):
    turtles[0].right(angle)
rt = right

def goto(x, y=None):
    turtles[0].goto(x, y)
setpos = goto
setposition = goto

def setx(x):
    turtles[0].setx(x)

def sety(x):
    turtles[0].sety(x)

def setheading(angle):
    turtles[0].setheading(angle)
seth = setheading

def home():
    turtles[0].home()

def speed(sp=None):
    turtles[0].speed(sp)

def pensize(size):
    turtles[0].pensize(size)
width = pensize

def penup():
    turtles[0].penup()
pu = penup
up = penup

def pendown():
    turtles[0].pendown()
pd = pendown
down = pendown

def done():
    js.done(turtles[0].to_json())

turtles = [Turtle()]
"""
)
`

const ct = document.getElementById("turtle").getContext("2d");
ct.translate(300, 300);
ct.scale(1, -1);
let log = null

function done(json_log){
    time = 0
    running = true
    log = JSON.parse(json_log)
    beginTime = (new Date()).getTime()
}

let time = 0;
let beginTime = null;
let running = false;

function draw(){
    window.requestAnimationFrame(draw);
    if (!log) return;
    if (!running) return;
    time = ((new Date()).getTime() - beginTime) * 60 / 1000
    let x = 0.0;
    let y = 0.0;
    let angle = 0
    let t = time;
    let i = 0;
    ct.clearRect(-300, -300, 600, 600);
    ct.beginPath();
    ct.moveTo(0, 0);
    while (t >= 0 && i < log.length) {
        let [new_x, new_y, new_angle, dt, pensize] = log[i];
        [x, y, angle] = line(x, y, new_x, new_y, angle, new_angle, t, dt, pensize);
        t -= dt
        i++;
    }
    ct.beginPath()
    ct.moveTo(x, y)
    ct.lineTo(x + 10 * Math.cos((angle + 150) * Math.PI * 2 / 360), y + 10 * Math.sin((angle + 150) * Math.PI * 2 / 360))
    ct.lineTo(x + 10 * Math.cos((angle + 210) * Math.PI * 2 / 360), y + 10 * Math.sin((angle + 210) * Math.PI * 2 / 360))
    ct.closePath()
    ct.fill()

}

function line(x1, y1, x2, y2, angle, new_angle, t, dt, pensize) {
    if (pensize > 0) {
        ct.beginPath();
        ct.moveTo(x1, y1);
        ct.lineWidth = pensize;
        if (t < dt) {
            x2 = x1 + (x2 - x1) * t / dt
            y2 = y1 + (y2 - y1) * t / dt
            new_angle = angle + (new_angle - angle) * t / dt;
        }
        ct.lineTo(x2, y2);
        ct.stroke();
    }
    return [x2, y2, new_angle % 360];
}

function clear_turtle() {
    running = false;
    ct.clearRect(-300, -300, 600, 600);
    log = null
}
