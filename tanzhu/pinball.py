# coding: utf-8
import Tkinter
from Tkinter import *
import random
import time

scoreList = []
def play_game():
    game = Tkinter.Tk()
    game.geometry('600x500')
    game.title("pinball")
    
    canvas = Canvas(game,bg = 'skyblue', width=600, height=500)
    canvas.pack()
    game.update()
    paddle = Paddle(canvas,'blue')
    ball = Ball(canvas,paddle,'red', 1)
    level = "First"
    level_text = canvas.create_text(290,20,text= level,font=("Courier",12),fill='yellow')
    store = "Score %s "
    store_text = canvas.create_text(540,30,text= store % (ball.num * 10),font=("Courier",16),fill="yellow")

    while 1:
        if ball.hit_bottom == False:
            store = "Score %s "
            speed = 1
            canvas.itemconfig(store_text,text=store % (ball.num * 10))
            if ball.num >= 5 and ball.num < 10:
                level = 'Second'
                speed = 3
                paddle.set_width(160)
                canvas.itemconfig(level_text,text=level)
            elif ball.num >= 10 and ball.num < 15:
                level = 'Third'
                speed = 4
                paddle.set_width(120)
                canvas.itemconfig(level_text,text=level)
            elif ball.num == 15:
                canvas.create_text(300,150,text="Congratulations on completing the game", \
                font=("Courier",20),fill='yellow')
                string = "Score %s "
                canvas.create_text(280,200,text= string % (ball.num * 10),font=("Courier",20),fill="yellow")
                scoreList.append(ball.num * 10)
                break
            ball.draw(speed)
            paddle.draw()
        else:
            time.sleep(1)
            canvas.create_text(300,150,text="The game failed and keep trying", \
            font=("Courier",20),fill='yellow')
            string = "Score %s "
            canvas.create_text(280,200,text= string % (ball.num * 10),font=("Courier",20),fill="yellow")
            scoreList.append(ball.num * 10)
            break
        game.update_idletasks()
        game.update()
        time.sleep(0.01)


def get_score():
    score = Tkinter.Tk()
    score.geometry('600x500')
    score.title("Historical performance")

    label=Tkinter.Label(score, height=2, text="Historical performance",font=('Arial',14));
    label.pack();
    for i in scoreList:
        label=Tkinter.Label(score, text=i, font=('Arial',20), fg="blue",);
        label.pack();
    if len(scoreList) == 0:
        label=Tkinter.Label(score, text="There is no history", font=('Arial',20), fg="blue",);
        label.pack();
    
top = Tkinter.Tk()
top.geometry('600x500')
top.title("pinball")

label=Tkinter.Label(top, height=6);
label.pack();

label=Tkinter.Label(top, text="Pinball Game", font=('Arial',20), fg="blue");
label.pack();

label=Tkinter.Label(top, height=2);
label.pack();

b1 = Tkinter.Button(top,text='Start the game',width=15,  height=2, font=('Arial',16),command=play_game)
b1.pack()

label=Tkinter.Label(top, height=2);
label.pack();

b1 = Tkinter.Button(top,text='Scoring record',width=15,  height=2, font=('Arial',16),command=get_score)
b1.pack()


class Ball:
    def __init__(self, canvas,paddle,color, speed):
        self.canvas = canvas
        self.paddle = paddle
        self.speed = speed
        self.id = canvas.create_oval(10,10,25,25,fill=color) #在画布上画出一个球
        self.canvas.move(self.id,240,100)      #初始球的位置
        self.x = 0
        self.y = 0
        self.canvas_height=self.canvas.winfo_height()  #获取画布的的高度
        self.canvas_width=self.canvas.winfo_width()
        self.hit_bottom=False
        self.num = 0
        self.canvas.bind_all('<Button-1>', self.turn_sb)
    def turn_sb(self,evt):
        start = [-1,1]
        random.shuffle(start)
        self.x = start[0]
        self.y = 1
    def hit(self,pos):
        pos_paddle = self.canvas.coords(self.paddle.id)
        if pos[3] <= pos_paddle[3] and pos[3] >= pos_paddle[1]:
            if pos[2] >= pos_paddle[0] and pos[0] <= pos_paddle[2]:
                return True
        return False
    def draw(self, speed):
        
        pos = self.canvas.coords(self.id)
        if pos[0] <= 0:
            self.x = speed
        if pos[2] >= self.canvas_width:
            self.x = -speed
        if pos[1] <= 0:
            self.y = speed
        if pos[3] >= self.canvas_height:
            self.hit_bottom = True
        if self.hit(pos) == True:
            self.y = -speed
            self.num += 1
        self.canvas.move(self.id,self.x,self.y)
class Paddle:
    def __init__(self,canvas,color):
        self.canvas = canvas
        self.width = 220
        self.id = canvas.create_rectangle(0,0,self.width,10,fill=color)
        self.canvas.move(self.id,250,450)
        self.x = 250
        self.canvas_width = self.canvas.winfo_width()
        self.canvas.bind_all('<KeyPress-Left>',self.turn_left)
        self.canvas.bind_all('<KeyPress-Right>',self.turn_right)
    def draw(self):
        self.canvas.coords(self.id, self.x,450,self.x + self.width,460)
        #self.canvas.move(self.id,self.x,0)
        
    def turn_left(self,evt):
        self.x -= 6
        pos = self.canvas.coords(self.id)
        if pos[0] <= 0:
            self.x = 0
    def turn_right(self,evt):
        self.x += 6
        pos = self.canvas.coords(self.id)
        if pos[2] >= self.canvas_width:
            self.x = self.canvas_width - self.width
    def set_width(self, width):
        self.width = width
# 进入消息循环

top.mainloop()


