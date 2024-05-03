import base64

def image_to_base64(image_path):
    with open(image_path, 'rb') as image_file:
        # Read the image file as binary data
        image_data = image_file.read()
        # Convert the binary data to base64 string
        base64_string = base64.b64encode(image_data).decode('utf-8')
    return base64_string