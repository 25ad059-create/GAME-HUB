import os
import re

root = r'C:\Users\Administrator\Desktop\GameVerse'
text = open(os.path.join(root, 'data', 'games.js'), 'r', encoding='utf-8').read()
name_pattern = re.compile(r"name:\s*'([^']+)'")
names = name_pattern.findall(text)
files = set(os.path.basename(f) for f in os.listdir(os.path.join(root, 'images', 'games')) if f.lower().endswith('.jpg'))


def slugify(name):
    name = name.lower().replace('&', 'and')
    name = re.sub(r'[^a-z0-9]+', '-', name)
    name = re.sub(r'-+', '-', name).strip('-')
    return name

missing = []
for n in names:
    slug = slugify(n) + '.jpg'
    if slug not in files:
        missing.append(n + ' -> ' + slug)

print('TOTAL_FILES', len(files))
print('TOTAL_GAMES', len(names))
print('MISSING', len(missing))
for item in missing:
    print(item)
