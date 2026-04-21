#!/usr/bin/env python3
"""Generate Stappenplan Website Traject PDF in Capture & Connect branding."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black, Color
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_LEFT, TA_CENTER
import os

# Register Inter fonts
pdfmetrics.registerFont(TTFont('Inter', '/tmp/InterVariable.ttf'))

# Brand colors
BG_BLACK = HexColor('#000000')
SURFACE = HexColor('#0a0a0a')
SURFACE_2 = HexColor('#111111')
BORDER = HexColor('#1a1a1a')
TEXT_WHITE = HexColor('#ffffff')
TEXT_MUTED = HexColor('#888888')
TEXT_DIM = HexColor('#444444')
ACCENT_BG = Color(1, 1, 1, alpha=0.05)

W, H = A4
MARGIN_LEFT = 40 * mm
MARGIN_RIGHT = 30 * mm
CONTENT_WIDTH = W - MARGIN_LEFT - MARGIN_RIGHT

OUTPUT = os.path.join(os.path.dirname(__file__), 'Stappenplan-Website-Traject-CaptureConnect.pdf')


def draw_bg(c):
    """Draw black background."""
    c.setFillColor(BG_BLACK)
    c.rect(0, 0, W, H, fill=1, stroke=0)


def draw_thin_line(c, y, width=None, color=BORDER):
    """Draw a subtle separator line."""
    c.setStrokeColor(color)
    c.setLineWidth(0.5)
    x_start = MARGIN_LEFT
    line_w = width or CONTENT_WIDTH
    c.line(x_start, y, x_start + line_w, y)


def draw_step_number(c, step_num, y):
    """Draw the step number indicator (circle + number)."""
    cx = 22 * mm
    cy = y - 2
    r = 12
    # Circle outline
    c.setStrokeColor(TEXT_WHITE)
    c.setLineWidth(1.5)
    c.setFillColor(BG_BLACK)
    c.circle(cx, cy, r, fill=1, stroke=1)
    # Number
    c.setFillColor(TEXT_WHITE)
    c.setFont('Inter', 11)
    c.drawCentredString(cx, cy - 4, str(step_num))


def draw_wrapped_text(c, text, x, y, font_name, font_size, color, max_width, line_height=None):
    """Draw text with word wrapping. Returns new y position."""
    if line_height is None:
        line_height = font_size * 1.6
    c.setFont(font_name, font_size)
    c.setFillColor(color)

    words = text.split()
    lines = []
    current_line = ""

    for word in words:
        test_line = f"{current_line} {word}".strip()
        if pdfmetrics.stringWidth(test_line, font_name, font_size) <= max_width:
            current_line = test_line
        else:
            if current_line:
                lines.append(current_line)
            current_line = word
    if current_line:
        lines.append(current_line)

    for line in lines:
        c.drawString(x, y, line)
        y -= line_height

    return y


def draw_bullet(c, text, x, y, font_name, font_size, color, max_width, bullet_char="\u2022"):
    """Draw a bullet point with wrapped text."""
    c.setFont(font_name, font_size)
    c.setFillColor(color)
    bullet_width = pdfmetrics.stringWidth(bullet_char + "  ", font_name, font_size)
    c.drawString(x, y, bullet_char)
    y = draw_wrapped_text(c, text, x + bullet_width, y, font_name, font_size, color, max_width - bullet_width)
    return y


def check_page_break(c, y, needed=80):
    """Check if we need a new page and create one if so."""
    if y < needed:
        c.showPage()
        draw_bg(c)
        y = H - 35 * mm
    return y


def create_pdf():
    c = canvas.Canvas(OUTPUT, pagesize=A4)
    c.setTitle("Stappenplan Website Traject - Capture & Connect")
    c.setAuthor("Capture & Connect")
    c.setSubject("Website Traject Stappenplan")

    # ============================================================
    # PAGE 1 — COVER
    # ============================================================
    draw_bg(c)

    # Top accent line
    c.setStrokeColor(TEXT_WHITE)
    c.setLineWidth(2)
    c.line(MARGIN_LEFT, H - 30 * mm, MARGIN_LEFT + 60, H - 30 * mm)

    # Brand name
    y = H - 55 * mm
    c.setFillColor(TEXT_WHITE)
    c.setFont('Inter', 10)
    c.drawString(MARGIN_LEFT, y, "CAPTURE  &  CONNECT")

    # Main title
    y -= 25 * mm
    c.setFont('Inter', 36)
    c.setFillColor(TEXT_WHITE)
    c.drawString(MARGIN_LEFT, y, "STAPPENPLAN")
    y -= 44
    c.drawString(MARGIN_LEFT, y, "WEBSITE")
    y -= 44
    c.drawString(MARGIN_LEFT, y, "TRAJECT")

    # Subtle tagline
    y -= 20 * mm
    c.setFont('Inter', 11)
    c.setFillColor(TEXT_MUTED)
    c.drawString(MARGIN_LEFT, y, "Van intake tot livegang — helder, professioneel en zonder gedoe.")

    # Decorative elements
    # Bottom line
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(MARGIN_LEFT, 40 * mm, W - MARGIN_RIGHT, 40 * mm)

    # Footer info
    c.setFont('Inter', 8)
    c.setFillColor(TEXT_DIM)
    c.drawString(MARGIN_LEFT, 32 * mm, "captureandconnect.nl")
    c.drawRightString(W - MARGIN_RIGHT, 32 * mm, "info@captureandconnect.nl")

    # ============================================================
    # PAGE 2 — STEPS 1-3
    # ============================================================
    c.showPage()
    draw_bg(c)

    y = H - 30 * mm

    # --- STAP 1 ---
    draw_step_number(c, 1, y)
    c.setFont('Inter', 18)
    c.setFillColor(TEXT_WHITE)
    c.drawString(MARGIN_LEFT, y, "Start en akkoord")

    y -= 12 * mm
    y = draw_wrapped_text(c, "Na ons contact en akkoord op de samenwerking starten we het traject.",
                          MARGIN_LEFT, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH)

    y -= 4 * mm
    y = draw_wrapped_text(c, "Je ontvangt een factuur van 50% van het totaalbedrag. Na betaling reserveren wij direct tijd in onze planning en gaan we aan de slag met jouw website.",
                          MARGIN_LEFT, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH)

    y -= 4 * mm
    y = draw_wrapped_text(c, "Dit zorgt ervoor dat we snel kunnen starten en jouw project prioriteit krijgt.",
                          MARGIN_LEFT, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH)

    y -= 10 * mm
    draw_thin_line(c, y)
    y -= 14 * mm

    # --- STAP 2 ---
    draw_step_number(c, 2, y)
    c.setFont('Inter', 18)
    c.setFillColor(TEXT_WHITE)
    c.drawString(MARGIN_LEFT, y, "Vragenlijst en input")

    y -= 12 * mm
    y = draw_wrapped_text(c, "Je ontvangt een overzichtelijke vragenlijst. Deze is speciaal opgebouwd om alle belangrijke informatie voor jouw website te verzamelen.",
                          MARGIN_LEFT, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH)

    y -= 3 * mm
    c.setFont('Inter', 10)
    c.setFillColor(TEXT_DIM)
    c.drawString(MARGIN_LEFT, y, "Duurt ongeveer 10-15 minuten")
    y -= 8 * mm

    c.setFont('Inter', 10)
    c.setFillColor(TEXT_WHITE)
    c.drawString(MARGIN_LEFT, y, "We vragen onder andere naar:")
    y -= 7 * mm

    bullets_2 = [
        "Jouw diensten of producten",
        "Jouw doelgroep",
        "Stijl en uitstraling",
        "Contactgegevens en wensen"
    ]
    for b in bullets_2:
        y = draw_bullet(c, b, MARGIN_LEFT + 4 * mm, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH - 4 * mm)
        y -= 1 * mm

    y -= 4 * mm
    # Important note box
    box_y = y
    box_h = 36
    c.setFillColor(SURFACE_2)
    c.roundRect(MARGIN_LEFT, box_y - box_h + 12, CONTENT_WIDTH, box_h, 4, fill=1, stroke=0)
    c.setStrokeColor(Color(1, 1, 1, alpha=0.1))
    c.setLineWidth(0.5)
    c.roundRect(MARGIN_LEFT, box_y - box_h + 12, CONTENT_WIDTH, box_h, 4, fill=0, stroke=1)

    c.setFont('Inter', 9)
    c.setFillColor(TEXT_WHITE)
    c.drawString(MARGIN_LEFT + 12, box_y, "BELANGRIJK")
    c.setFillColor(TEXT_MUTED)
    c.setFont('Inter', 9)
    c.drawString(MARGIN_LEFT + 12, box_y - 14, "Hoe completer je dit invult, hoe beter wij jouw website kunnen bouwen.")

    y = box_y - box_h - 6 * mm
    draw_thin_line(c, y)
    y -= 14 * mm

    # --- STAP 3 ---
    y = check_page_break(c, y, 120)
    draw_step_number(c, 3, y)
    c.setFont('Inter', 18)
    c.setFillColor(TEXT_WHITE)
    c.drawString(MARGIN_LEFT, y, "Ontwikkeling van de website")

    y -= 12 * mm
    y = draw_wrapped_text(c, "Op basis van jouw input starten wij met het bouwen van de website. We focussen hierbij op:",
                          MARGIN_LEFT, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH)
    y -= 3 * mm

    bullets_3 = [
        "Een duidelijke en overzichtelijke structuur",
        "Een professionele uitstraling",
        "Een gebruiksvriendelijke ervaring op mobiel en desktop",
        "Het stimuleren van contact en aanvragen"
    ]
    for b in bullets_3:
        y = draw_bullet(c, b, MARGIN_LEFT + 4 * mm, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH - 4 * mm)
        y -= 1 * mm

    y -= 4 * mm
    y = draw_wrapped_text(c, "De eerste versie wordt binnen enkele dagen tot een week opgeleverd.",
                          MARGIN_LEFT, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH)

    # Footer
    c.setFont('Inter', 7)
    c.setFillColor(TEXT_DIM)
    c.drawRightString(W - MARGIN_RIGHT, 20 * mm, "CAPTURE & CONNECT  |  captureandconnect.nl")

    # ============================================================
    # PAGE 3 — STEPS 4-6
    # ============================================================
    c.showPage()
    draw_bg(c)

    y = H - 30 * mm

    # --- STAP 4 ---
    draw_step_number(c, 4, y)
    c.setFont('Inter', 18)
    c.setFillColor(TEXT_WHITE)
    c.drawString(MARGIN_LEFT, y, "Feedback en optimalisatie")

    y -= 12 * mm
    y = draw_wrapped_text(c, "Je ontvangt de eerste versie van jouw website.",
                          MARGIN_LEFT, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH)
    y -= 3 * mm
    y = draw_wrapped_text(c, "Je krijgt de mogelijkheid om 1 keer feedback te geven. Denk hierbij aan kleine aanpassingen in teksten, afbeeldingen of indeling.",
                          MARGIN_LEFT, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH)
    y -= 3 * mm
    y = draw_wrapped_text(c, "Wij verwerken deze feedback zorgvuldig en optimaliseren de website tot een definitieve versie.",
                          MARGIN_LEFT, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH)

    y -= 10 * mm
    draw_thin_line(c, y)
    y -= 14 * mm

    # --- STAP 5 ---
    draw_step_number(c, 5, y)
    c.setFont('Inter', 18)
    c.setFillColor(TEXT_WHITE)
    c.drawString(MARGIN_LEFT, y, "Oplevering en afronding")

    y -= 12 * mm
    y = draw_wrapped_text(c, "Na verwerking van de feedback is de website klaar voor oplevering.",
                          MARGIN_LEFT, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH)
    y -= 3 * mm
    y = draw_wrapped_text(c, "Je ontvangt de definitieve versie ter controle. Na akkoord ontvang je de resterende factuur van 50%.",
                          MARGIN_LEFT, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH)
    y -= 3 * mm
    y = draw_wrapped_text(c, "Na betaling zorgen wij ervoor dat de website volledig klaar is voor livegang.",
                          MARGIN_LEFT, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH)

    y -= 10 * mm
    draw_thin_line(c, y)
    y -= 14 * mm

    # --- STAP 6 ---
    draw_step_number(c, 6, y)
    c.setFont('Inter', 18)
    c.setFillColor(TEXT_WHITE)
    c.drawString(MARGIN_LEFT, y, "Livegang en hosting")

    y -= 12 * mm
    y = draw_wrapped_text(c, "De website wordt online gezet op jouw domein en hosting. Je hebt hierbij twee opties:",
                          MARGIN_LEFT, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH)
    y -= 6 * mm

    # Option 1 box
    box_h = 28
    c.setFillColor(SURFACE_2)
    c.roundRect(MARGIN_LEFT, y - box_h + 12, CONTENT_WIDTH, box_h, 4, fill=1, stroke=0)
    c.setStrokeColor(Color(1, 1, 1, alpha=0.06))
    c.setLineWidth(0.5)
    c.roundRect(MARGIN_LEFT, y - box_h + 12, CONTENT_WIDTH, box_h, 4, fill=0, stroke=1)
    c.setFont('Inter', 9)
    c.setFillColor(TEXT_WHITE)
    c.drawString(MARGIN_LEFT + 12, y, "OPTIE 1")
    c.setFillColor(TEXT_MUTED)
    c.drawString(MARGIN_LEFT + 60, y, "Je regelt zelf domein en hosting")
    y -= box_h + 4 * mm

    # Option 2 box
    box_h = 68
    c.setFillColor(SURFACE_2)
    c.roundRect(MARGIN_LEFT, y - box_h + 12, CONTENT_WIDTH, box_h, 4, fill=1, stroke=0)
    c.setStrokeColor(Color(1, 1, 1, alpha=0.1))
    c.setLineWidth(0.5)
    c.roundRect(MARGIN_LEFT, y - box_h + 12, CONTENT_WIDTH, box_h, 4, fill=0, stroke=1)

    c.setFont('Inter', 9)
    c.setFillColor(TEXT_WHITE)
    c.drawString(MARGIN_LEFT + 12, y, "OPTIE 2  —  ABONNEMENT")
    c.setFillColor(TEXT_WHITE)
    c.setFont('Inter', 14)
    c.drawRightString(W - MARGIN_RIGHT - 12, y - 2, "\u20AC24,95 /mnd")

    y -= 16
    c.setFont('Inter', 9)
    c.setFillColor(TEXT_MUTED)
    c.drawString(MARGIN_LEFT + 12, y, "Wij regelen domein en hosting voor je. Dit bevat:")
    y -= 14

    abo_items = ["Hosting van de website", "Technisch onderhoud", "Kleine updates en aanpassingen (3 per maand)"]
    for item in abo_items:
        c.setFillColor(TEXT_MUTED)
        c.drawString(MARGIN_LEFT + 16, y, "\u2022  " + item)
        y -= 12

    y -= 10 * mm
    y = draw_wrapped_text(c, "Vanaf dit moment is jouw website voor iedereen bereikbaar en kunnen klanten eenvoudig contact opnemen of een aanvraag doen.",
                          MARGIN_LEFT, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH)

    # Footer
    c.setFont('Inter', 7)
    c.setFillColor(TEXT_DIM)
    c.drawRightString(W - MARGIN_RIGHT, 20 * mm, "CAPTURE & CONNECT  |  captureandconnect.nl")

    # ============================================================
    # PAGE 4 — BELANGRIJK OM TE WETEN + AFSLUITING
    # ============================================================
    c.showPage()
    draw_bg(c)

    y = H - 35 * mm

    # Section title
    c.setFont('Inter', 10)
    c.setFillColor(TEXT_DIM)
    c.drawString(MARGIN_LEFT, y, "GOED OM TE WETEN")
    y -= 4 * mm
    c.setStrokeColor(TEXT_WHITE)
    c.setLineWidth(2)
    c.line(MARGIN_LEFT, y, MARGIN_LEFT + 50, y)
    y -= 14 * mm

    important_items = [
        "De gemiddelde oplevering is binnen 2 weken, mits feedback tijdig wordt aangeleverd.",
        "Domein en hosting zijn voor eigen rekening van de klant, tenzij je kiest voor ons abonnement.",
        "1 feedbackronde is inbegrepen binnen het traject.",
        "Extra aanpassingen of uitbreidingen later zijn mogelijk tegen meerprijs.",
        "Het abonnement van \u20AC24,95 per maand is optioneel en maandelijks opzegbaar."
    ]

    for i, item in enumerate(important_items):
        # Number
        c.setFont('Inter', 10)
        c.setFillColor(TEXT_WHITE)
        num_str = f"0{i+1}"
        c.drawString(MARGIN_LEFT, y, num_str)
        # Text
        y = draw_wrapped_text(c, item, MARGIN_LEFT + 18 * mm, y, 'Inter', 10, TEXT_MUTED, CONTENT_WIDTH - 18 * mm)
        y -= 6 * mm

    # Separator
    y -= 6 * mm
    draw_thin_line(c, y)
    y -= 20 * mm

    # AFSLUITING
    c.setFont('Inter', 22)
    c.setFillColor(TEXT_WHITE)
    y = draw_wrapped_text(c, "Klaar om jouw online aanwezigheid naar een hoger niveau te tillen?",
                          MARGIN_LEFT, y, 'Inter', 22, TEXT_WHITE, CONTENT_WIDTH, line_height=30)

    y -= 10 * mm
    y = draw_wrapped_text(c, "Met dit proces zorgen we voor een snelle, duidelijke en effectieve realisatie van jouw website \u2014 zonder onnodig gedoe.",
                          MARGIN_LEFT, y, 'Inter', 11, TEXT_MUTED, CONTENT_WIDTH)

    y -= 14 * mm

    # CTA button
    btn_text = "NEEM CONTACT OP"
    c.setFont('Inter', 10)
    btn_w = pdfmetrics.stringWidth(btn_text, 'Inter', 10) + 40
    btn_h = 36
    btn_x = MARGIN_LEFT
    btn_y = y - btn_h + 12

    c.setFillColor(TEXT_WHITE)
    c.roundRect(btn_x, btn_y, btn_w, btn_h, 4, fill=1, stroke=0)
    c.setFillColor(BG_BLACK)
    c.drawString(btn_x + 20, btn_y + 12, btn_text)

    # Contact info below
    y = btn_y - 16 * mm
    c.setFont('Inter', 9)
    c.setFillColor(TEXT_MUTED)
    c.drawString(MARGIN_LEFT, y, "info@captureandconnect.nl")
    y -= 14
    c.drawString(MARGIN_LEFT, y, "captureandconnect.nl")
    y -= 14
    c.drawString(MARGIN_LEFT, y, "@captureandconnect_")

    # Footer
    c.setFont('Inter', 7)
    c.setFillColor(TEXT_DIM)
    c.drawString(MARGIN_LEFT, 20 * mm, "\u00A9 Capture & Connect")
    c.drawRightString(W - MARGIN_RIGHT, 20 * mm, "captureandconnect.nl")

    c.save()
    print(f"PDF generated: {OUTPUT}")


if __name__ == '__main__':
    create_pdf()
