from PIL import Image
import os

# Increase the decompression bomb limit
Image.MAX_IMAGE_PIXELS = None

def convert_png_to_jpg():
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    for filename in os.listdir(script_dir):
        if filename.endswith('.png'):
            img_path = os.path.join(script_dir, filename)
            try:
                img = Image.open(img_path)
                rgb_img = img.convert('RGB')
                output_path = os.path.join(script_dir, f"{os.path.splitext(filename)[0]}.jpg")
                rgb_img.save(output_path, format='JPEG', quality=100)
                print(f"Converted {filename} to {output_path}")
            except Exception as e:
                print(f"Failed to convert {filename}: {e}")

if __name__ == "__main__":
    convert_png_to_jpg()
