import os
import re

root = r'C:\Users\Administrator\Desktop\GameVerse'
images_dir = os.path.join(root, 'images', 'games')
js_path = os.path.join(root, 'data', 'games.js')
text = open(js_path, 'r', encoding='utf-8').read()
name_pattern = re.compile(r"name:\s*'([^']+)'")
names = name_pattern.findall(text)

for name in names:
    slug = name.lower().replace('&', 'and')
    slug = re.sub(r"['’]", '', slug)
    slug = re.sub(r'[:,.]', '', slug)
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = re.sub(r'-+', '-', slug).strip('-')
    target = os.path.join(images_dir, f'{slug}.jpg')
    print(name, '=>', slug, 'exists=', os.path.exists(target))
