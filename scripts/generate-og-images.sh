#!/usr/bin/env bash
set -euo pipefail

OUT="${1:-/tmp/og-gen}"
mkdir -p "$OUT"

ARIAL_BLACK="/System/Library/Fonts/Supplemental/Arial Black.ttf"
ARIAL_BOLD_ITALIC="/System/Library/Fonts/Supplemental/Arial Bold Italic.ttf"
ARIAL_BOLD="/System/Library/Fonts/Supplemental/Arial Bold.ttf"
ARIAL="/System/Library/Fonts/Supplemental/Arial.ttf"

# Build a single OG image.
# Args: out_path | label | line1 | line2_outline | accent_hex
make_og() {
  local out="$1" label="$2" line1="$3" line2="$4" accent="${5:-#ffffff}"

  # Base: black canvas + subtle radial highlight in the upper-right
  magick -size 1200x630 \
      radial-gradient:"rgba(255,255,255,0.10)-#020202" \
      -modulate 100,80,100 \
      \( -size 1200x630 xc:"#020202" -fill "rgba(255,255,255,0.06)" \
         -draw "circle 980,160 980,80" -blur 0x60 \) \
      -compose Over -composite \
      \
      \( -size 10x10 xc:"$accent" -alpha set \) \
      -gravity NorthWest -geometry +60+68 -compose Over -composite \
      \
      -fill "rgba(255,255,255,0.6)" \
      -font "$ARIAL_BOLD" -pointsize 22 -kerning 6 \
      -gravity NorthWest -annotate +88+60 "$label" \
      \
      -font "$ARIAL_BLACK" -pointsize 138 -kerning -3 \
      -fill "#ffffff" -gravity West -annotate +60-72 "$line1" \
      \
      -font "$ARIAL_BLACK" -pointsize 138 -kerning -3 \
      -stroke "#ffffff" -strokewidth 2 -fill none \
      -gravity West -annotate +60+72 "$line2" \
      \
      -font "$ARIAL_BOLD" -pointsize 20 -kerning 5 \
      -fill "rgba(255,255,255,0.55)" -stroke none \
      -gravity SouthWest -annotate +60+58 "captureandconnect.nl" \
      \
      -font "$ARIAL_BLACK" -pointsize 28 -kerning 0 \
      -fill "rgba(255,255,255,0.9)" -stroke none \
      -gravity SouthEast -annotate +60+58 "C&C" \
      \
      -quality 88 "$out"
}

make_og "$OUT/og-default.jpg" "000 // CAPTURE & CONNECT"  "Built to" "perform."
make_og "$OUT/og-home.jpg"    "001 // HOME"               "Capture &" "Connect."
make_og "$OUT/og-services.jpg" "002 // SERVICES"          "Everything" "to grow."
make_og "$OUT/og-portfolio.jpg" "003 // WORK"             "Selected" "work."
make_og "$OUT/og-results.jpg" "004 // RESULTS"            "Public" "proof."
make_og "$OUT/og-about.jpg"   "005 // ABOUT"              "Built by" "creators."
make_og "$OUT/og-contact.jpg" "006 // CONTACT"            "Let's" "talk."

ls -la "$OUT"/og-*.jpg
