#!/usr/bin/env python3
"""Generate Vragenlijst Website PDF in Capture & Connect branding."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, Color
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# Register Inter font
pdfmetrics.registerFont(TTFont('Inter', '/tmp/InterVariable.ttf'))

# Brand colors
BG_BLACK = HexColor('#000000')
SURFACE = HexColor('#0a0a0a')
SURFACE_2 = HexColor('#111111')
BORDER = HexColor('#1a1a1a')
BORDER_LIGHT = Color(1, 1, 1, alpha=0.08)
TEXT_WHITE = HexColor('#ffffff')
TEXT_MUTED = HexColor('#888888')
TEXT_DIM = HexColor('#444444')
FIELD_BG = HexColor('#0d0d0d')
FIELD_BORDER = Color(1, 1, 1, alpha=0.12)

W, H = A4
MARGIN_LEFT = 36 * mm
MARGIN_RIGHT = 28 * mm
CONTENT_WIDTH = W - MARGIN_LEFT - MARGIN_RIGHT

OUTPUT = os.path.join(os.path.dirname(__file__), 'Vragenlijst-Website-CaptureConnect.pdf')


def draw_bg(c):
    c.setFillColor(BG_BLACK)
    c.rect(0, 0, W, H, fill=1, stroke=0)


def draw_footer(c, page_num=None):
    c.setFont('Inter', 7)
    c.setFillColor(TEXT_DIM)
    c.drawString(MARGIN_LEFT, 18 * mm, "CAPTURE & CONNECT")
    c.drawRightString(W - MARGIN_RIGHT, 18 * mm, "captureandconnect.nl")
    if page_num:
        c.drawCentredString(W / 2, 18 * mm, str(page_num))


def draw_section_title(c, title, y):
    """Draw a section header with accent line."""
    c.setFont('Inter', 9)
    c.setFillColor(TEXT_DIM)
    c.drawString(MARGIN_LEFT, y, title.upper())
    y -= 5
    c.setStrokeColor(TEXT_WHITE)
    c.setLineWidth(1.5)
    c.line(MARGIN_LEFT, y, MARGIN_LEFT + 40, y)
    return y - 14


def draw_question(c, question, y, field_height=24):
    """Draw a question with an input field below it."""
    c.setFont('Inter', 10)
    c.setFillColor(TEXT_WHITE)
    # Word wrap the question
    words = question.split()
    lines = []
    current = ""
    for word in words:
        test = f"{current} {word}".strip()
        if pdfmetrics.stringWidth(test, 'Inter', 10) <= CONTENT_WIDTH:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)

    for line in lines:
        c.drawString(MARGIN_LEFT, y, line)
        y -= 15

    y -= 3
    # Input field
    c.setFillColor(FIELD_BG)
    c.setStrokeColor(FIELD_BORDER)
    c.setLineWidth(0.5)
    c.roundRect(MARGIN_LEFT, y - field_height + 8, CONTENT_WIDTH, field_height, 3, fill=1, stroke=1)

    return y - field_height - 6


def draw_question_large(c, question, y, field_height=52):
    """Draw a question with a larger text area."""
    return draw_question(c, question, y, field_height)


def draw_separator(c, y):
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(MARGIN_LEFT, y, W - MARGIN_RIGHT, y)
    return y - 12


def check_page(c, y, needed=80, page_num_ref=None):
    if y < needed:
        if page_num_ref:
            draw_footer(c, page_num_ref[0])
            page_num_ref[0] += 1
        c.showPage()
        draw_bg(c)
        y = H - 30 * mm
    return y


def create_pdf():
    c = canvas.Canvas(OUTPUT, pagesize=A4)
    c.setTitle("Vragenlijst Website - Capture & Connect")
    c.setAuthor("Capture & Connect")

    page = [2]  # mutable counter for pages (cover = 1)

    # ============================================================
    # PAGE 1 — COVER
    # ============================================================
    draw_bg(c)

    # Top accent line
    c.setStrokeColor(TEXT_WHITE)
    c.setLineWidth(2)
    c.line(MARGIN_LEFT, H - 30 * mm, MARGIN_LEFT + 60, H - 30 * mm)

    # Brand name
    y = H - 52 * mm
    c.setFillColor(TEXT_WHITE)
    c.setFont('Inter', 10)
    c.drawString(MARGIN_LEFT, y, "CAPTURE  &  CONNECT")

    # Main title
    y -= 25 * mm
    c.setFont('Inter', 38)
    c.setFillColor(TEXT_WHITE)
    c.drawString(MARGIN_LEFT, y, "VRAGENLIJST")
    y -= 46
    c.drawString(MARGIN_LEFT, y, "WEBSITE")

    # Subtitle
    y -= 18 * mm
    c.setFont('Inter', 11)
    c.setFillColor(TEXT_MUTED)
    c.drawString(MARGIN_LEFT, y, "Alle informatie die wij nodig hebben om jouw website te bouwen.")

    # Intro box
    y -= 22 * mm
    box_h = 70
    c.setFillColor(SURFACE_2)
    c.roundRect(MARGIN_LEFT, y - box_h + 12, CONTENT_WIDTH, box_h, 5, fill=1, stroke=0)
    c.setStrokeColor(Color(1, 1, 1, alpha=0.06))
    c.setLineWidth(0.5)
    c.roundRect(MARGIN_LEFT, y - box_h + 12, CONTENT_WIDTH, box_h, 5, fill=0, stroke=1)

    inner_y = y
    c.setFont('Inter', 9)
    c.setFillColor(TEXT_WHITE)
    c.drawString(MARGIN_LEFT + 16, inner_y, "HOE WERKT HET?")
    inner_y -= 18
    c.setFont('Inter', 9)
    c.setFillColor(TEXT_MUTED)
    c.drawString(MARGIN_LEFT + 16, inner_y, "Dit formulier duurt ongeveer 10 tot 15 minuten.")
    inner_y -= 14
    c.drawString(MARGIN_LEFT + 16, inner_y, "Hoe completer je dit invult, hoe beter en sneller wij")
    inner_y -= 14
    c.drawString(MARGIN_LEFT + 16, inner_y, "jouw website kunnen bouwen.")

    # Bottom
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(MARGIN_LEFT, 38 * mm, W - MARGIN_RIGHT, 38 * mm)

    c.setFont('Inter', 8)
    c.setFillColor(TEXT_DIM)
    c.drawString(MARGIN_LEFT, 30 * mm, "captureandconnect.nl")
    c.drawRightString(W - MARGIN_RIGHT, 30 * mm, "info@captureandconnect.nl")

    # ============================================================
    # PAGE 2 — BEDRIJFSGEGEVENS
    # ============================================================
    c.showPage()
    draw_bg(c)
    y = H - 30 * mm

    y = draw_section_title(c, "Bedrijfsgegevens", y)

    questions_bedrijf = [
        "Wat is de naam van jouw bedrijf?",
        "In welke plaats is jouw bedrijf gevestigd?",
        "Wat is het adres van jouw bedrijf?",
        "Wat is het telefoonnummer van jouw bedrijf?",
        "Wat is het e-mailadres van jouw bedrijf?",
    ]

    for q in questions_bedrijf:
        y = check_page(c, y, 70, page)
        y = draw_question(c, q, y)

    y -= 4
    y = draw_separator(c, y)

    # OVER JOUW BEDRIJF
    y = check_page(c, y, 120, page)
    y = draw_section_title(c, "Over jouw bedrijf", y)

    questions_over = [
        ("Wat doet jouw bedrijf?", True),
        ("Voor wie is jouw bedrijf bedoeld?", True),
        ("Wat maakt jouw bedrijf anders dan anderen?", True),
        ("Waarom moeten klanten voor jou kiezen?", True),
    ]

    for q, large in questions_over:
        y = check_page(c, y, 90, page)
        if large:
            y = draw_question_large(c, q, y, 46)
        else:
            y = draw_question(c, q, y)

    draw_footer(c, page[0])
    page[0] += 1

    # ============================================================
    # PAGE 3 — DIENSTEN + DOEL + CONTACT
    # ============================================================
    c.showPage()
    draw_bg(c)
    y = H - 30 * mm

    y = draw_section_title(c, "Diensten of producten", y)

    y = draw_question_large(c, "Welke diensten of producten bied je aan?", y, 46)
    y = draw_question(c, "Wat zijn je belangrijkste diensten of producten?", y)
    y = draw_question(c, "Wil je prijzen tonen op de website? Ja of nee?", y)
    y = check_page(c, y, 70, page)
    y = draw_question_large(c, "Zo ja, kun je je prijslijst toevoegen?", y, 46)

    y -= 4
    y = draw_separator(c, y)

    # DOEL VAN DE WEBSITE
    y = check_page(c, y, 120, page)
    y = draw_section_title(c, "Doel van de website", y)

    y = draw_question_large(c, "Wat is het belangrijkste doel van jouw website?", y, 46)
    y = check_page(c, y, 70, page)
    y = draw_question(c, "Wil je meer aanvragen, meer klanten of meer zichtbaarheid?", y)
    y = check_page(c, y, 70, page)
    y = draw_question(c, "Is er nog een ander doel dat belangrijk is?", y)

    draw_footer(c, page[0])
    page[0] += 1

    # ============================================================
    # PAGE 4 — CONTACT + OPENINGSTIJDEN + CONTENT
    # ============================================================
    c.showPage()
    draw_bg(c)
    y = H - 30 * mm

    y = draw_section_title(c, "Contact en aanvragen", y)

    y = draw_question(c, "Hoe wil je dat klanten contact met je opnemen?", y)
    y = draw_question(c, "Wil je dat klanten bellen, WhatsApp sturen, e-mailen of een formulier invullen?", y)
    y = draw_question(c, "Maak je gebruik van een boekingssysteem?", y)
    y = check_page(c, y, 60, page)
    y = draw_question(c, "Zo ja, wat is de link naar jouw boekingssysteem?", y)

    y -= 4
    y = draw_separator(c, y)

    # OPENINGSTIJDEN
    y = check_page(c, y, 100, page)
    y = draw_section_title(c, "Openingstijden", y)

    y = draw_question_large(c, "Wat zijn je openingstijden?", y, 46)
    y = check_page(c, y, 60, page)
    y = draw_question(c, "Werk je op afspraak of met vrije inloop?", y)

    y -= 4
    y = draw_separator(c, y)

    # CONTENT
    y = check_page(c, y, 100, page)
    y = draw_section_title(c, "Content", y)

    y = draw_question(c, "Heb je foto's van je bedrijf of werk die we kunnen gebruiken?", y)
    y = check_page(c, y, 60, page)
    y = draw_question(c, "Heb je een logo dat je kunt aanleveren?", y)
    y = check_page(c, y, 60, page)
    y = draw_question(c, "Welke kleuren gebruik je of wil je gebruiken op de website?", y)

    draw_footer(c, page[0])
    page[0] += 1

    # ============================================================
    # PAGE 5 — STIJL + TEKSTEN + SOCIAL MEDIA
    # ============================================================
    c.showPage()
    draw_bg(c)
    y = H - 30 * mm

    y = draw_section_title(c, "Stijl", y)

    y = draw_question(c, "Welke stijl wil je voor de website? Modern, luxe, simpel, zakelijk of stoer?", y)
    y = draw_question(c, "Heb je voorbeelden van websites die je mooi vindt?", y)
    y = check_page(c, y, 60, page)
    y = draw_question_large(c, "Zo ja, kun je links toevoegen?", y, 46)

    y -= 4
    y = draw_separator(c, y)

    # TEKSTEN
    y = check_page(c, y, 120, page)
    y = draw_section_title(c, "Teksten", y)

    y = draw_question_large(c, "Kun je een korte beschrijving van je bedrijf geven?", y, 52)
    y = check_page(c, y, 60, page)
    y = draw_question(c, "Heb je een slogan?", y)
    y = check_page(c, y, 60, page)
    y = draw_question(c, "Wat moet er bovenaan de website staan?", y)

    y -= 4
    y = draw_separator(c, y)

    # SOCIAL MEDIA
    y = check_page(c, y, 100, page)
    y = draw_section_title(c, "Social media", y)

    y = draw_question(c, "Wat is de link naar je Instagram?", y)
    y = check_page(c, y, 60, page)
    y = draw_question(c, "Wat is de link naar je TikTok?", y)

    draw_footer(c, page[0])
    page[0] += 1

    # ============================================================
    # PAGE 6 — SOCIAL MEDIA (cont) + EXTRA + CTA + AFSLUITING
    # ============================================================
    c.showPage()
    draw_bg(c)
    y = H - 30 * mm

    # Social media continued
    y = draw_section_title(c, "Social media (vervolg)", y)
    y = draw_question(c, "Wat is de link naar je Facebook?", y)
    y = draw_question(c, "Gebruik je nog andere social media kanalen?", y)

    y -= 4
    y = draw_separator(c, y)

    # EXTRA
    y = draw_section_title(c, "Extra", y)

    y = draw_question(c, "Wil je reviews tonen op de website?", y)
    y = draw_question_large(c, "Zo ja, kun je deze toevoegen?", y, 46)
    y = check_page(c, y, 60, page)
    y = draw_question(c, "Heb je acties of aanbiedingen die op de website moeten komen?", y)
    y = check_page(c, y, 70, page)
    y = draw_question_large(c, "Zijn er nog andere dingen die je op de website wil hebben?", y, 46)

    draw_footer(c, page[0])
    page[0] += 1

    # ============================================================
    # PAGE 7 — CALL TO ACTION + AFSLUITING
    # ============================================================
    c.showPage()
    draw_bg(c)
    y = H - 30 * mm

    y = draw_section_title(c, "Call to action", y)

    y = draw_question_large(c, "Wat moet een bezoeker doen op jouw website?", y, 46)
    y = draw_question(c, "Wil je dat bezoekers een aanvraag doen, contact opnemen, bellen of een WhatsApp sturen?", y)
    y = draw_question(c, "Is er nog een andere actie die belangrijk is?", y)

    y -= 4
    y = draw_separator(c, y)

    # AFSLUITING
    y -= 8
    c.setFont('Inter', 9)
    c.setFillColor(TEXT_DIM)
    c.drawString(MARGIN_LEFT, y, "AFSLUITING")
    y -= 5
    c.setStrokeColor(TEXT_WHITE)
    c.setLineWidth(1.5)
    c.line(MARGIN_LEFT, y, MARGIN_LEFT + 40, y)
    y -= 18

    # Info box
    box_h = 58
    c.setFillColor(SURFACE_2)
    c.roundRect(MARGIN_LEFT, y - box_h + 12, CONTENT_WIDTH, box_h, 5, fill=1, stroke=0)
    c.setStrokeColor(Color(1, 1, 1, alpha=0.08))
    c.setLineWidth(0.5)
    c.roundRect(MARGIN_LEFT, y - box_h + 12, CONTENT_WIDTH, box_h, 5, fill=0, stroke=1)

    c.setFont('Inter', 9)
    c.setFillColor(TEXT_WHITE)
    c.drawString(MARGIN_LEFT + 16, y, "GOED OM TE WETEN")
    y -= 18
    c.setFillColor(TEXT_MUTED)
    c.setFont('Inter', 9)
    c.drawString(MARGIN_LEFT + 16, y, "Je krijgt 1 feedbackronde na oplevering.")
    y -= 14
    c.drawString(MARGIN_LEFT + 16, y, "Zorg dat alles zo compleet mogelijk is ingevuld")
    y -= 14
    c.drawString(MARGIN_LEFT + 16, y, "zodat we snel kunnen bouwen.")

    y -= box_h - 30

    # Closing message
    y -= 16
    c.setFont('Inter', 18)
    c.setFillColor(TEXT_WHITE)
    c.drawString(MARGIN_LEFT, y, "Bedankt voor het invullen!")
    y -= 14
    c.setFont('Inter', 10)
    c.setFillColor(TEXT_MUTED)
    y -= 10
    c.drawString(MARGIN_LEFT, y, "Wij gaan direct aan de slag met jouw website.")

    y -= 20
    c.setFont('Inter', 9)
    c.setFillColor(TEXT_MUTED)
    c.drawString(MARGIN_LEFT, y, "info@captureandconnect.nl")
    y -= 14
    c.drawString(MARGIN_LEFT, y, "captureandconnect.nl")
    y -= 14
    c.drawString(MARGIN_LEFT, y, "@captureandconnect_")

    draw_footer(c, page[0])

    c.save()
    print(f"PDF generated: {OUTPUT}")


if __name__ == '__main__':
    create_pdf()
