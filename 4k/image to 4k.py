from PIL import Image
import os

def resize_to_4k():
    # Increase the maximum allowed image size
    Image.MAX_IMAGE_PIXELS = None
    
    # Define the 4K resolution
    target_resolution = (3840, 2160)
    
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    for filename in os.listdir(script_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
            img_path = os.path.join(script_dir, filename)
            img = Image.open(img_path)
            resized_img = img.resize(target_resolution, Image.LANCZOS)
            output_path = os.path.join(script_dir, filename)
            resized_img.save(output_path, format='JPEG', quality=100)
            print(f"Resized {filename} to {target_resolution[0]}x{target_resolution[1]} and saved as {output_path}")

if __name__ == "__main__":
    resize_to_4k()
