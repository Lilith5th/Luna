import os
import requests

# Configuration
API_TOKEN = 'Your_API_Token'  # Replace with your actual API token
OUTPUT_DIR = 'midjourney_images'
NUM_IMAGES = 20

# Create output directory if it doesn't exist
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

# Headers for authorization
headers = {
    'Authorization': f'Bearer {API_TOKEN}',
    'Content-Type': 'application/json'
}

def get_recent_images(num_images):
    url = f'https://cl.imagineapi.dev/items/images/?limit={num_images}'
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()['data']
    else:
        print(f"Failed to get images: {response.status_code}")
        return []

def download_image(image_url, save_path):
    response = requests.get(image_url)
    if response.status_code == 200:
        with open(save_path, 'wb') as file:
            file.write(response.content)
        print(f"Downloaded {save_path}")
    else:
        print(f"Failed to download image: {response.status_code}")

def main():
    images = get_recent_images(NUM_IMAGES)
    for image in images:
        image_url = image['url']
        image_id = image['id']
        save_path = os.path.join(OUTPUT_DIR, f'{image_id}.jpg')
        download_image(image_url, save_path)

if __name__ == '__main__':
    main()