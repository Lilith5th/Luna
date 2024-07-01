import os
import hashlib
from PIL import Image
import imagehash
import shutil

def calculate_image_hash(image_path):
    try:
        with Image.open(image_path) as img:
            return imagehash.average_hash(img)
    except Exception as e:
        print(f"ERROR: Failed to calculate hash for {image_path}. Exception: {e}")
        return None

def find_duplicates(folder_path):
    images = {}
    duplicates = []
    
    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.lower().endswith(('png', 'jpg', 'jpeg', 'bmp', 'tiff')):
                file_path = os.path.join(root, file)
                image_hash = calculate_image_hash(file_path)
                if image_hash:
                    if image_hash in images:
                        duplicates.append((images[image_hash], file_path))
                    else:
                        images[image_hash] = file_path
    
    return duplicates

def compare_and_remove(image1, image2):
    try:
        with Image.open(image1) as img1, Image.open(image2) as img2:
            size1 = img1.size
            size2 = img2.size
            
            if size1 == size2:
                if len(image1) > len(image2):
                    print(f"DEBUG: Removing {image1}")
                    os.remove(image1)
                else:
                    print(f"DEBUG: Removing {image2}")
                    os.remove(image2)
            elif size1[0] * size1[1] < size2[0] * size2[1]:
                print(f"DEBUG: Removing {image1}")
                os.remove(image1)
            else:
                print(f"DEBUG: Removing {image2}")
                os.remove(image2)
    except Exception as e:
        print(f"ERROR: Failed to compare and remove {image1} and {image2}. Exception: {e}")

def clean_duplicates(folder_path):
    duplicates = find_duplicates(folder_path)
    
    for image1, image2 in duplicates:
        compare_and_remove(image1, image2)

# Example usage
folder_path = 'path_to_your_image_folder'  # Change this to your folder path
clean_duplicates(folder_path)