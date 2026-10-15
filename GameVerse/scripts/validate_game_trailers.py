import json
import re
import urllib.request

path = r'C:\Users\Administrator\Desktop\GameVerse\data\games.js'
text = open(path, 'r', encoding='utf-8').read()
entries = re.findall(r"name:\s*'([^']+)'[\s\S]*?youtubeId:\s*'([^']+'?)", text)
print(f'Found {len(entries)} entries')
for name, youtube_id in entries:
    video_id = youtube_id.strip("'")
    url = f'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=25) as response:
            payload = json.loads(response.read().decode('utf-8'))
        print(f'OK | {name} | {video_id} | {payload.get("title", "")[:80]}')
    except Exception as exc:
        print(f'FAIL | {name} | {video_id} | {exc}')
