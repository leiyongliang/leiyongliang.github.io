
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

    ball_rect = ball_image.get_rect()

    frames_per_sec = 50
    fps_clock = pygame.time.Clock()

    while True:

        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()
                sys.exit()

        ball_rect =  ball_rect.move(speed)

        if (ball_rect.left < 0) or (ball_rect.right > width):
            speed[0] =- speed[0]

        if (ball_rect.top < 0) or (ball_rect.bottom > height):
            speed[1] =- speed[1]
        screen.fill(color_balck)

        screen.blit(ball_image, ball_rect)

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
        if event.key == pygame.K_LEFT:
            speed[0] -= speed_offset
        if event.key == pygame.K_RIGHT:
            speed[0] = speed_offset
        if event.key == pygame.K_UP:
            speed[1] -= speed_offset
        if event.key == pygame.K_DOWN:
            speed[1] = speed_offset
    if event.type in (pygame.KEYUP, pygame.K_LEFT, pygame.K_RIGHT, pygame.K_DOWN) :
        speed = [0, 0]
    return speed

def play_ball_control():
    pygame.init()
    ball_speed = [1, 1]
    window_size = Rect(0, 0, 700, 500)
    (width, height) = window_size.size
    screen = pygame.display.set_mode(window_size.size)
    pygame.display.set_caption('控制_ball')

    ball_image = load_image('ball.png')

    ball_rect = ball_image.get_rect()
    my_rect = pygame.Rect(100, 450, 100, 10)

    frames_per_sec = 50
    fps_clock = pygame.time.Clock()
    delay = 0
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
        delay = delay + 1
        if (delay % 5 == 0):
            ball_rect = ball_rect.move(ball_speed)
        cur_speed = control(event)
        my_rect = my_rect.move(cur_speed).clamp(window_size)
        if (ball_rect.left < 0) or (ball_rect.right > width):
            ball_speed[0] =- ball_speed[0]

        if (ball_rect.top < 0) or (ball_rect.bottom > height):
            ball_speed[1] =- ball_speed[1]
        screen.fill((0, 0, 0))
        pygame.draw.rect(screen,[255,0,0],my_rect,0)
        screen.blit(ball_image, ball_rect)

        text_time = u"时间:%s" % time.strftime("%H:%M:%S", time.gmtime())
        show_text(screen, (20, 400), text_time, (0, 255, 0), True)

        text_pos = u"小球位置:(%d,%d)" % (my_rect.left, my_rect.top)
        show_text(screen, (20, 420), text_pos, (0, 255, 255), True)

        author_info = u"作者:yoler"
        show_text(screen, (20, 440), author_info, (0, 0, 255), True, 13, True)

        pygame.display.update()

        # fps_clock.tick(frames_per_sec)


if __name__ == "__main__":
    play_ball_control()
