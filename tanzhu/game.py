import os
import sys
import time
import pygame
from pygame.locals import *
from pygame.font import *
#显示字体
def show_text(surface_handle, pos, text, color, font_bold = False, font_size = 16, font_italic = False):
    cur_font = pygame.font.SysFont('宋体', font_size)
    cur_font.set_bold(font_bold)
    cur_font.set_italic(font_italic)
    text_fmt = cur_font.render(text, 1, color)
    surface_handle.blit(text_fmt, pos)
#控制Player_1的挡板移动
def control(event):
    speed = [x, y] = [0, 0]
    speed_offset = 2

    if event.type  == pygame.KEYDOWN:
        if event.key == pygame.K_UP:
            speed[1] -= speed_offset
        if event.key == pygame.K_DOWN:
            speed[1] = speed_offset
    if event.type in (pygame.K_UP, pygame.K_LEFT, pygame.K_RIGHT, pygame.K_DOWN):
        speed = [0, 0]
    return speed

#控制Player_2的挡板移动
def other_control(event):
	speed = [x, y] = [0, 0]
	speed_offset = 2

	if event.type  == pygame.KEYDOWN:
		if event.key == 119:
			speed[1] -= speed_offset
		if event.key == 115:
			speed[1] = speed_offset
	if event.type in (pygame.KEYUP, pygame.K_LEFT, pygame.K_RIGHT, pygame.K_DOWN):
		speed = [0, 0]
	return speed

def play_ball_control():
	pygame.init()    #初始化
	WHITE = [255, 255, 255]  #设置颜色
	ball_speed_init = [2, 2]  #初始化小球速度
	window_size = Rect(0, 0, 900, 500)  #创建一个窗口矩形
	(width, height) = window_size.size #获得窗口宽高
	screen = pygame.display.set_mode(window_size.size)  #创建窗口
	pygame.display.set_caption('弹珠游戏')

	my_rect = pygame.Rect(10, 250, 10, 100)  #设置Player_1的挡板矩形
	other_rect = pygame.Rect(880, 250, 10, 100)  #设置Player_2的挡板矩形
	ball_circle = pygame.Rect(450, 200, 20, 20)  #设置小球矩形

	Model_one_rect = pygame.Rect(410, 280, 100, 30)  #设置Model_one矩形
	Model_two_rect = pygame.Rect(410, 320, 100, 30)  #设置Model_two矩形
	#设置速度
	ball_small_speed = pygame.Rect(800, 5, 50, 30)
	ball_middle_speed = pygame.Rect(800, 35, 50, 30)
	ball_height_speed = pygame.Rect(800, 65, 50, 30)
	#统计分数
	score_1 = 0
	score_2 = 0


	running = True
	Start1 = False
	Start2 = False
	#游戏主循环
	while running:
		for event in pygame.event.get():  #获取事件
			if event.type == pygame.QUIT:  #是否退出游戏
				pygame.quit()
				sys.exit()
			elif event.type==MOUSEBUTTONDOWN:  #是否按下鼠标
				if event.button==1 and Model_one_rect.collidepoint(event.pos):  #如果按下鼠标左键并点击model_one矩形
					Start1= True  #开启模式一
					Start2 = False  #关闭模式二
					score_1 = 0  #双方得分置零
					score_2 = 0
					ball_speed = ball_speed_init  #小球速度重置默认值
				elif event.button==1 and Model_two_rect.collidepoint(event.pos):  #如果按下鼠标左键并点击model_two矩形
					Start2 = True  #同上
					Start1= True
					score_1 = 0
					score_2 = 0
					ball_speed = ball_speed_init
				elif event.button==1 and ball_small_speed.collidepoint(event.pos):  #如果按下鼠标左键并点击低速
					ball_speed = [ball_speed_init[0] / 2 *1, ball_speed_init[1] / 2 *1]  #设置小球速度为[1, 1]
				elif event.button==1 and ball_middle_speed.collidepoint(event.pos):  #如果按下鼠标左键并点击中速
					ball_speed = ball_speed_init									 #设置小球速度为[2, 2]
				elif event.button==1 and ball_height_speed.collidepoint(event.pos):  #如果按下鼠标左键并点击高速
					ball_speed = [ball_speed_init[0] / 2 *3, ball_speed_init[1] / 2 *3]  #设置小球速度为[3, 3]
		if Start1:  #模式一

			cur_speed = control(event)  #获得Play_1的挡板移动速度
			other_speed = other_control(event)  #获得Play_2的挡板移动速度
			my_rect = my_rect.move(cur_speed).clamp(window_size)  #移动Play_1的挡板并控制不超出窗口大小
			if Start2 and ball_speed[0] > 0:  #如果模式二开启并且小球向右移动
				y = ball_circle.top      #获取小球的纵坐标
				other_rect = pygame.Rect(880, y - 50, 10, 100).clamp(window_size) #移动Play_2的挡板并控制不超出窗口大小
			else:  #如果模式二关闭
				other_rect = other_rect.move(other_speed).clamp(window_size)  #移动Play_2的挡板并控制不超出窗口大小

			ball_circle = ball_circle.move(ball_speed) #移动小球的位置
		    
			if (ball_circle .right > other_rect.left):  #Play_1是否接住小球
				if (ball_circle .top > other_rect.top) and (ball_circle .bottom < other_rect.bottom):
					ball_speed[0] =- ball_speed[0]  #接住小球并改变小球方向
			if (ball_circle .left < my_rect.right + 20):  #Play_2是否接住小球
				if (ball_circle .top > my_rect.top) and (ball_circle .bottom < my_rect.bottom):
					ball_speed[0] =- ball_speed[0]  #接住小球并改变小球方向

			if (ball_circle .top < 20) or (ball_circle .bottom > height):  #控制小球上下方向不超出窗口
				ball_speed[1] =- ball_speed[1]

			if ball_circle .left < 20: #Play_1未接接住小球
				score_2 += 1  #Play_2加一分
				ball_circle = pygame.Rect(450, 200, 20, 20) #将小球重置到中间位置开始下一轮
			if ball_circle .right > width: #Play_2未接接住小球
				
				score_1 += 1 #Play_1加一分
				ball_circle = pygame.Rect(450, 200, 20, 20) #将小球重置到中间位置开始下一轮
			screen.fill((0, 0, 0))  #刷新整个屏幕
			show_text(screen, (800, 5), 'Low Speed', WHITE, True, 20, True)  #绘制低速按钮
			show_text(screen, (800, 35), 'Middle Speed', WHITE, True, 20, True)  #绘制中速速按钮
			show_text(screen, (800, 65), 'Height Speed', WHITE, True, 20, True)  #绘制高速按钮
			circle = pygame.draw.circle(screen, WHITE, ball_circle.topleft, 20)  #绘制小球
			pygame.draw.line(screen, WHITE, (450, 0), (450, 500), 1)  #绘制中间线
			pygame.draw.rect(screen, WHITE, my_rect, 0)  #绘制Play_1的挡板
			pygame.draw.rect(screen, WHITE, other_rect, 0)  #绘制Play_2的挡板

			if score_1 ==5: #如果得分够5分
				Start1 = False  #停止游戏
				screen.fill((0, 0, 0))  #重刷屏幕
				show_text(screen, (440, 140), 'Play1 Win', (0, 0, 255), True, 24, True) #显示获胜方选手
			if score_2 ==5:
				Start1 = False
				screen.fill((0, 0, 0))
				show_text(screen, (440, 140), 'Play2 Win', (0, 0, 255), True, 24, True)
			

			text_pos = u"position: (%d,%d)" % (ball_circle .left, ball_circle.top)  
			show_text(screen, (20, 470), text_pos, WHITE, True, 20, True)  #显示小球实时位置


			text_score='Score: %s'%str(score_1)
			show_text(screen, (350, 5), text_score, WHITE, False, 24, True)  #绘制得分
			text_score='Score: %s'%str(score_2)
			show_text(screen, (500, 5), text_score, WHITE, False, 24, True)
		if not Start1:  #如果游戏停止，则回到主界面
			text_start = u"Start Game"
			show_text(screen, (390, 240), text_start, WHITE, True, 40, True)

			text_start = u"Model One"
			show_text(screen, (410, 280), text_start, WHITE, False, 24, False)

			text_start = u"Model Two"
			show_text(screen, (410, 320), text_start, WHITE, False, 24, False)
		pygame.display.update() 

        


if __name__ == "__main__":
    play_ball_control()
