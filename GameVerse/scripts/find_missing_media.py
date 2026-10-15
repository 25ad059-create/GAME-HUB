import json
import os
import re
import urllib.request

root = r'C:\Users\Administrator\Desktop\GameVerse'
js_path = os.path.join(root, 'data', 'games.js')
image_dir = os.path.join(root, 'images', 'games')
text = open(js_path, 'r', encoding='utf-8').read()
# Match names as escaped JS strings
names = re.findall(r"name:\s*'([^']*(?:\\'[^']*)*)'", text)

def slugify(name):
    name = name.replace("\\'", "'")
    value = name.lower().replace('&', 'and')
    value = re.sub(r"['’]", '', value)
    value = re.sub(r'[:,.]', '', value)
    value = re.sub(r'[^a-z0-9]+', '-', value)
    return re.sub(r'-+', '-', value).strip('-')

missing = []
for name in names:
    slug = slugify(name)
    target = os.path.join(image_dir, f'{slug}.jpg')
    if not os.path.exists(target):
        missing.append((name, slug, target))

print('MISSING_COUNT', len(missing))
for name, slug, target in missing:
    print(name, '=>', slug)

# check steam API for the app id tied to each missing title when possible
for name, slug, target in missing:
    match = re.search(r"name:\s*'" + re.escape(name) + r"'[\s\S]*?image:\s*'([^']+)'", text)
    if match:
        image_url = match.group(1)
        print('URL', name, image_url)
