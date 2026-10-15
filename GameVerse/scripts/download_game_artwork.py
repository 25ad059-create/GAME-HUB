import argparse
import os
import re
import sys
import time
import urllib.request


root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
out_dir = os.path.join(root, 'images', 'games')
os.makedirs(out_dir, exist_ok=True)

items = {
    'cyberpunk-2077': 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
    'grand-theft-auto-v': 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
    'call-of-duty-modern-warfare-iii': 'https://cdn.akamai.steamstatic.com/steam/apps/1938090/header.jpg',
    'counter-strike-2': 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
    'valorant': 'https://cdn.akamai.steamstatic.com/steam/apps/700480/header.jpg',
    'apex-legends': 'https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg',
    'red-dead-redemption-2': 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
    'elden-ring': 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
    'the-witcher-3-wild-hunt': 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
    'hogwarts-legacy': 'https://cdn.akamai.steamstatic.com/steam/apps/990080/header.jpg',
    "assassins-creed-shadows": 'https://cdn.akamai.steamstatic.com/steam/apps/2515620/header.jpg',
    'ghost-of-tsushima': 'https://cdn.akamai.steamstatic.com/steam/apps/2215430/header.jpg',
    'forza-horizon-5': 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
    'need-for-speed-unbound': 'https://cdn.akamai.steamstatic.com/steam/apps/1849250/header.jpg',
    'the-crew-motorfest': 'https://cdn.akamai.steamstatic.com/steam/apps/2708810/header.jpg',
    'f1-25': 'https://cdn.akamai.steamstatic.com/steam/apps/2725790/header.jpg',
    'minecraft': 'https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg',
    'ark-survival-ascended': 'https://cdn.akamai.steamstatic.com/steam/apps/2399830/header.jpg',
    'sons-of-the-forest': 'https://cdn.akamai.steamstatic.com/steam/apps/1326470/header.jpg',
    'resident-evil-4': 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
    'silent-hill-2': 'https://cdn.akamai.steamstatic.com/steam/apps/2124490/header.jpg',
    'dying-light-2': 'https://cdn.akamai.steamstatic.com/steam/apps/534380/header.jpg',
    "baldurs-gate-3": 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
    'diablo-iv': 'https://cdn.akamai.steamstatic.com/steam/apps/2344520/header.jpg',
    'black-myth-wukong': 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
    'palworld': 'https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg',
    'dota-2': 'https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg',
    'league-of-legends': 'https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg',
    'warhammer-40000-space-marine-2': 'https://cdn.akamai.steamstatic.com/steam/apps/2183900/header.jpg',
    'helldivers-2': 'https://cdn.akamai.steamstatic.com/steam/apps/553850/header.jpg',
}

def download_one(slug, url, path, timeout=30):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    data = urllib.request.urlopen(req, timeout=timeout).read()
    with open(path, 'wb') as handle:
        handle.write(data)
    return len(data)


def main(argv=None):
    parser = argparse.ArgumentParser(description='Download game artwork to images/games')
    parser.add_argument('--force', '-f', action='store_true', help='Force re-download even if file exists')
    parser.add_argument('--dry-run', action='store_true', help='List files that would be downloaded, do not fetch')
    parser.add_argument('--wait', type=float, default=0.0, help='Seconds to wait between downloads')
    args = parser.parse_args(argv)

    for slug, url in items.items():
        path = os.path.join(out_dir, f'{slug}.jpg')

        if args.dry_run:
            if os.path.exists(path):
                print(f'Exists: {slug} -> {path}')
            else:
                print(f'Would download: {slug} -> {path}')
            continue

        if os.path.exists(path) and not args.force:
            size = os.path.getsize(path)
            if size > 0:
                print(f'Skipping {slug}, already exists ({size} bytes)')
                continue

        try:
            length = download_one(slug, url, path)
            print(f'Downloaded {slug}: {length} bytes')
        except Exception as exc:
            print(f'Failed {slug}: {exc}')

        if args.wait:
            time.sleep(args.wait)


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('\nInterrupted', file=sys.stderr)
        sys.exit(1)
