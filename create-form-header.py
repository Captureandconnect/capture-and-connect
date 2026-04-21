#!/usr/bin/env python3
"""Create a branded header image for the Google Form."""

from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1600, 400
OUTPUT = os.path.join(os.path.dirname(__file__), 'form-header-captureconnect.png')

# Create black background
img = Image.new('RGB', (W, H), '#000000')
draw = ImageDraw.Draw(img)

# Try to load Inter font
font_path = '/tmp/InterVariable.ttf'

try:
    font_brand = ImageFont.truetype(font_path, 16)
    font_title = ImageFont.truetype(font_path, 52)
    font_sub = ImageFont.truetype(font_path, 18)
except:
    font_brand = ImageFont.load_default()
    font_title = ImageFont.load_default()
    font_sub = ImageFont.load_default()

# Subtle top accent line
draw.line([(80, 60), (160, 60)], fill='#ffffff', width=3)

# Brand name
draw.text((80, 85), "CAPTURE  &  CONNECT", fill='#ffffff', font=font_brand)

# Main title
draw.text((80, 140), "VRAGENLIJST", fill='#ffffff', font=font_title)
draw.text((80, 205), "WEBSITE", fill='#ffffff', font=font_title)

# Subtitle
draw.text((80, 295), "Alle informatie die wij nodig hebben om jouw website te bouwen.", fill='#888888', font=font_sub)

# Subtle decorative line on the right side
for i in range(3):
    y_pos = 120 + (i * 80)
    alpha = 40 - (i * 12)
    color = f'#{alpha:02x}{alpha:02x}{alpha:02x}'
    draw.line([(1400, y_pos), (1520, y_pos)], fill=color, width=1)

# Bottom subtle gradient line
draw.line([(0, H-1), (W, H-1)], fill='#1a1a1a', width=1)

img.save(OUTPUT, 'PNG', quality=95)
print(f"Header image saved: {OUTPUT}")
print(f"Size: {W}x{H}px")
