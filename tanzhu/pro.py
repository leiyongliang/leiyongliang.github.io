
import os
import sys
import time
import pygame
from pygame.locals import *
from pygame.font import *

def hello_word():
    pygame.init()
    pygame.display.set_mode((680, 480))
    pygame.display.set_caption('hello word')

    while True:
        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()
                sys.exit()
        pygame.display.update()

def play_ball():
    pygame.init()

    window_size = (width, height) = (700, 500)
    speed = [1, 1]
    color_balck = (0, 0, 0)
    screen = pygame.display.set_mode(window_size)
    pygame.display.set_caption('play_ball')

    ball_image = pygame.image.load('ball.png')

    ball_circle  = ball_image.get_rect()

    frames_per_sec = 50
    fps_clock = pygame.time.Clock()

    while True:

        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()
                sys.exit()

        ball_circle  =  ball_circle .move(speed)

        if (ball_circle .left < 0) or (ball_circle .right > width):
            speed[0] =- speed[0]

        if (ball_circle .top < 0) or (ball_circle .bottom > height):
            speed[1] =- speed[1]
        screen.fill(color_balck)

        screen.blit(ball_image, ball_circle )

        pygame.display.update()

        fps_clock.tick(frames_per_sec)

def load_image(pic_naame):
    current_dir = os.path.split(os.path.abspath(__file__))[0]
    path = os.path.join(current_dir, '', pic_naame)

    return pygame.image.load(path).convert()

def show_text(surface_handle, pos, text, color, font_bold = False, font_size = 16, font_italic = False):
    cur_font = pygame.font.SysFont('宋体', font_size)
    cur_font.set_bold(font_bold)
    cur_font.set_italic(font_italic)
    text_fmt = cur_font.render(text, 1, color)
    surface_handle.blit(text_fmt, pos)
def control(event):
    speed = [x, y] = [0, 0]
    speed_offset = 1

    if event.type  == pygame.KEYDOWN:
        # if event.key == pygame.K_LEFT:
        #     speed[0] -= speed_offset
        # if event.key == pygame.K_RIGHT:
        #     speed[0] = speed_offset
        if event.key == pygame.K_UP:
            speed[1] -= speed_offset
        if event.key == pygame.K_DOWN:
            speed[1] = speed_offset
    if event.type in (pygame.KEYUP, pygame.K_LEFT, pygame.K_RIGHT, pygame.K_DOWN) :
        speed = [0, 0]
    return speed

def play_ball_control():
    pygame.init()
    WHITE = [255, 255, 255]
    ball_speed = [1, 1]
    window_size = Rect(0, 0, 900, 500)
    (width, height) = window_size.size
    screen = pygame.display.set_mode(window_size.size)
    pygame.display.set_caption('控制_ball')

    # ball_image = load_image('ball.png')

    # ball_circle  = ball_image.get_rect()
    my_rect = pygame.Rect(10, 250, 10, 100)
    ball_circle = pygame.Rect(450, 200, 20, 20)
    #统计分数
    score=0

    frames_per_sec = 50
    fps_clock = pygame.time.Clock()
    delay = 0
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
        delay = delay + 1
        cur_speed = control(event)
        my_rect = my_rect.move(cur_speed).clamp(window_size)
        if (delay % 1 == 0):
        	ball_circle = ball_circle.move(ball_speed)
        	if (ball_circle .left < my_rect.right + 20):
	        	if (ball_circle .top > my_rect.top) and (ball_circle .bottom < my_rect.bottom):
	        		score += 1
        
        if (ball_circle .right > width):
            ball_speed[0] =- ball_speed[0]
        if (ball_circle .left < my_rect.right + 20):
        	if (ball_circle .top > my_rect.top) and (ball_circle .bottom < my_rect.bottom):
        		ball_speed[0] =- ball_speed[0]

        if (ball_circle .top < 20) or (ball_circle .bottom > height):
        	ball_speed[1] =- ball_speed[1]

        if ball_circle .left < 20:
        	show_text(screen, (340, 240), 'Game Over', (0, 0, 255), True, 24, True)
        	pygame.quit()
        screen.fill((0, 0, 0))
        
        circle = pygame.draw.circle(screen, WHITE, ball_circle.topleft, 20)
        pygame.draw.line(screen, WHITE, (450, 0), (450, 500), 1)
        pygame.draw.rect(screen, WHITE, my_rect, 0)
        # screen.blit(ball_image, ball_circle )

        text_time = u"时间:%s" % time.strftime("%H:%M:%S", time.gmtime())
        show_text(screen, (20, 400), text_time, WHITE, True)

        text_pos = u"小球位置:(%d,%d)" % (ball_circle .left, ball_circle.top)
        show_text(screen, (20, 420), text_pos, WHITE, True, 20, True)

        author_info = u"作者:yoler"
        show_text(screen, (20, 440), author_info, WHITE, True, 13, True)

        text_score='Score:%s'%str(score)
        show_text(screen, (10, 5), text_score, WHITE, True, 18, True)

        pygame.display.update()

        # fps_clock.tick(frames_per_sec)


if __name__ == "__main__":
    play_ball_control()
