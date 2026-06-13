import cv2
import numpy as np
import os

# Paths
input_path = "Footer Founder signature/Screenshot 2026-06-09 at 10.46.12 PM.png"
output_svg = "public/assets/signature-traced.svg"
output_png = "public/assets/signature-processed.png"

# Read the image
img = cv2.imread(input_path)
if img is None:
    print("ERROR: Could not read image")
    exit(1)

print(f"Image shape: {img.shape}")

# Convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Apply Otsu's thresholding to isolate dark signature from light background
# Invert so signature is white on black (for contour detection)
_, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

# Apply morphological operations to clean up noise
kernel = np.ones((3, 3), np.uint8)
thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=1)
thresh = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=1)

# Save processed PNG (transparent background)
# Create RGBA image: white background becomes transparent
h, w = gray.shape
rgba = np.zeros((h, w, 4), dtype=np.uint8)
# Invert threshold: signature pixels stay, background becomes transparent
mask = cv2.bitwise_not(thresh)
# Copy original image where mask is white (signature area)
for c in range(3):
    rgba[:, :, c] = img[:, :, c]
# Set alpha: signature = 255 (opaque), background = 0 (transparent)
rgba[:, :, 3] = mask

cv2.imwrite(output_png, rgba)
print(f"Saved processed PNG: {output_png}")

# Find contours for SVG path generation
contours, hierarchy = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
print(f"Found {len(contours)} contours")

# Filter small contours (noise)
min_contour_area = 50
significant_contours = [c for c in contours if cv2.contourArea(c) > min_contour_area]
print(f"Significant contours (area > {min_contour_area}): {len(significant_contours)}")

# Build SVG path data from contours
svg_paths = []
for contour in significant_contours:
    # Simplify contour
    epsilon = 1.0
    approx = cv2.approxPolyDP(contour, epsilon, False)
    
    if len(approx) < 2:
        continue
    
    path_data = ""
    for i, point in enumerate(approx):
        x, y = point[0]
        if i == 0:
            path_data += f"M {x},{y} "
        else:
            path_data += f"L {x},{y} "
    
    svg_paths.append(path_data)

# Create SVG with viewBox matching the image dimensions
svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
  <!-- Signature tracing - extracted from screenshot -->
  <g fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
'''

for path_data in svg_paths:
    svg_content += f'    <path d="{path_data.strip()}" />\n'

svg_content += '''  </g>
</svg>'''

with open(output_svg, 'w') as f:
    f.write(svg_content)

print(f"Saved SVG: {output_svg}")
print(f"SVG has {len(svg_paths)} path elements")
print("Done!")
