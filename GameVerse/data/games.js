const gamesData = [
  {
    id: 1,
    name: 'Cyberpunk 2077',
    price: 1499,
    genre: 'RPG',
    rating: 4.5,
    description: 'Explore the neon-drenched streets of Night City in a futuristic open-world RPG shaped by your choices and your survival instincts.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
    youtubeId: 'P99qJGrPNLs',
    youtubeUrl: 'https://www.youtube.com/watch?v=P99qJGrPNLs',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i7-6700K / AMD Ryzen 5 1600',
      memory: '12 GB RAM',
      graphics: 'NVIDIA GTX 1060 6GB / AMD Radeon RX 580 8GB',
      storage: '70 GB available space'
    },
    featured: true
  },
  {
    id: 2,
    name: 'Grand Theft Auto V',
    price: 999,
    genre: 'Action',
    rating: 4.9,
    description: 'Switch between three iconic protagonists in a sprawling open-world crime epic packed with heists, missions, and endless chaos.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
    youtubeId: 'QkkoHAzjnUs',
    youtubeUrl: 'https://www.youtube.com/watch?v=QkkoHAzjnUs',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core 2 Quad Q6600 / AMD Phenom 9850',
      memory: '4 GB RAM',
      graphics: 'NVIDIA 9800 GT 1GB / AMD HD 4870 1GB',
      storage: '72 GB available space'
    },
    featured: true
  },
  {
    id: 3,
    name: 'Call of Duty: Modern Warfare III',
    price: 1999,
    genre: 'FPS',
    rating: 4.4,
    description: 'Experience fast-paced combat, tactical team play, and cinematic modern warfare across explosive single-player and multiplayer battles.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1938090/header.jpg',
    youtubeId: 'Kzpy1t1v_lA',
    youtubeUrl: 'https://www.youtube.com/watch?v=Kzpy1t1v_lA',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-6600 / AMD Ryzen 5 1400',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1080 / AMD RX 5700 XT',
      storage: '149 GB available space'
    },
    featured: false
  },
  {
    id: 4,
    name: 'Counter-Strike 2',
    price: 0,
    genre: 'FPS',
    rating: 4.7,
    description: 'A precise tactical shooter where every round matters, every angle counts, and every bomb plant becomes a battlefield decision.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
    youtubeId: 'f9f0z4x7xE4',
    youtubeUrl: 'https://www.youtube.com/watch?v=f9f0z4x7xE4',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core 2 Duo E6600 / AMD Phenom X3 8750',
      memory: '2 GB RAM',
      graphics: 'Video card with 256 MB VRAM',
      storage: '15 GB available space'
    },
    featured: true
  },
  {
    id: 5,
    name: 'Valorant',
    price: 0,
    genre: 'FPS',
    rating: 4.6,
    description: 'Master sharp gunplay, agent abilities, and tactical map control in a competitive first-person shooter built for precision.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/700480/header.jpg',
    youtubeId: 'e2jIYqRwOV8',
    youtubeUrl: 'https://www.youtube.com/watch?v=e2jIYqRwOV8',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core 2 Duo E3-1225 / AMD FX 6300',
      memory: '4 GB RAM',
      graphics: 'Intel HD 3000 / AMD Radeon R5 200',
      storage: '25 GB available space'
    },
    featured: false
  },
  {
    id: 6,
    name: 'Apex Legends',
    price: 0,
    genre: 'Battle Royale',
    rating: 4.7,
    description: 'Drop into a high-octane battle royale where squad tactics, movement, and character abilities make every fight dynamic.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg',
    youtubeId: 'OW2cYq4W41w',
    youtubeUrl: 'https://www.youtube.com/watch?v=OW2cYq4W41w',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5 3570K / AMD FX-6300',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GeForce GTX 970 / AMD Radeon R9 290',
      storage: '75 GB available space'
    },
    featured: true
  },
  {
    id: 7,
    name: 'Red Dead Redemption 2',
    price: 1299,
    genre: 'Adventure',
    rating: 4.9,
    description: 'Ride through the American frontier in a cinematic Western masterpiece defined by atmosphere, story, and handcrafted detail.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
    youtubeId: 'gmA6MrX81z4',
    youtubeUrl: 'https://www.youtube.com/watch?v=gmA6MrX81z4',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-2500K / AMD FX-6300',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GeForce GTX 770 2GB / AMD Radeon R9 280 3GB',
      storage: '150 GB available space'
    },
    featured: true
  },
  {
    id: 8,
    name: 'Elden Ring',
    price: 1999,
    genre: 'Action RPG',
    rating: 4.9,
    description: 'Traverse a ruined kingdom filled with mythic bosses, hidden lore, and punishing exploration in one of the greatest action RPGs ever made.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
    youtubeId: 'E3Huy2cdih0',
    youtubeUrl: 'https://www.youtube.com/watch?v=E3Huy2cdih0',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-8400 / AMD Ryzen 3 3300X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580',
      storage: '60 GB available space'
    },
    featured: true
  },
  {
    id: 9,
    name: 'The Witcher 3: Wild Hunt',
    price: 999,
    genre: 'Action RPG',
    rating: 4.8,
    description: 'Hunt monsters, unravel political intrigue, and shape the fate of a vast world in this acclaimed dark fantasy epic.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
    youtubeId: 'c0i88t0Kacs',
    youtubeUrl: 'https://www.youtube.com/watch?v=c0i88t0Kacs',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 7 / 8 / 10',
      processor: 'Intel Core i5-2500K / AMD Ryzen 3 1200',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GeForce GTX 770 / AMD R9 290',
      storage: '40 GB available space'
    },
    featured: false
  },
  {
    id: 10,
    name: 'Hogwarts Legacy',
    price: 1799,
    genre: 'Action RPG',
    rating: 4.5,
    description: 'Attend Hogwarts, master magical abilities, and uncover a hidden threat while exploring a richly detailed wizarding world.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/990080/header.jpg',
    youtubeId: '1O6Qstncp9w',
    youtubeUrl: 'https://www.youtube.com/watch?v=1O6Qstncp9w',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-6600 / AMD Ryzen 5 1400',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 960 / AMD Radeon RX 470',
      storage: '85 GB available space'
    },
    featured: false
  },
  {
    id: 11,
    name: 'Assassin\'s Creed Shadows',
    price: 2299,
    genre: 'Action',
    rating: 4.3,
    description: 'Travel through a beautifully realized historical setting with stealth, swordplay, and a dynamic blend of exploration and intrigue.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2515620/header.jpg',
    youtubeId: 'gSgNz-L0R5A',
    youtubeUrl: 'https://www.youtube.com/watch?v=gSgNz-L0R5A',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i7-8700K / AMD Ryzen 7 3700X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 3070 / AMD Radeon RX 6700 XT',
      storage: '75 GB available space'
    },
    featured: false
  },
  {
    id: 12,
    name: 'Ghost of Tsushima',
    price: 1499,
    genre: 'Action Adventure',
    rating: 4.7,
    description: 'Lead a lone samurai through a breathtaking island war zone with stealth, swordplay, and elegant open-world storytelling.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2215430/header.jpg',
    youtubeId: 'HkR3A0c5f0A',
    youtubeUrl: 'https://www.youtube.com/watch?v=HkR3A0c5f0A',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-10300H / AMD Ryzen 5 5600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 960 / AMD Radeon R9 290',
      storage: '75 GB available space'
    },
    featured: false
  },
  {
    id: 13,
    name: 'Forza Horizon 5',
    price: 1699,
    genre: 'Racing',
    rating: 4.8,
    description: 'Race across a vibrant open-world Mexico with stunning weather, colossal events, and some of the most exhilarating driving moments in modern gaming.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
    youtubeId: 'Lr0bKBhCk6I',
    youtubeUrl: 'https://www.youtube.com/watch?v=Lr0bKBhCk6I',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-8400 / AMD Ryzen 5 1500X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GTX 970 / AMD RX 570',
      storage: '110 GB available space'
    },
    featured: true
  },
  {
    id: 14,
    name: 'Need for Speed Unbound',
    price: 1999,
    genre: 'Racing',
    rating: 4.3,
    description: 'Build your street reputation in a neon-lit, urban racing adventure where every race can change your future in the city.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1849250/header.jpg',
    youtubeId: 'x7K_A2faUUQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=x7K_A2faUUQ',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-8600 / AMD Ryzen 5 2600',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GTX 970 / AMD RX 570',
      storage: '50 GB available space'
    },
    featured: false
  },
  {
    id: 15,
    name: 'The Crew Motorfest',
    price: 1699,
    genre: 'Racing',
    rating: 4.2,
    description: 'Cruise through a festival of speed with free-roam driving, dynamic events, and a rich island-hopping racing experience.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2708810/header.jpg',
    youtubeId: 'U2ADD4j7NDE',
    youtubeUrl: 'https://www.youtube.com/watch?v=U2ADD4j7NDE',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
      memory: '12 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1080 / AMD Radeon RX 5700 XT',
      storage: '60 GB available space'
    },
    featured: false
  },
  {
    id: 16,
    name: 'F1 25',
    price: 2199,
    genre: 'Racing',
    rating: 4.4,
    description: 'Push the limits on iconic circuits with deep handling, realistic motorsport strategy, and a packed season of competition.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2725790/header.jpg',
    youtubeId: 'AQYw2mzxw7M',
    youtubeUrl: 'https://www.youtube.com/watch?v=AQYw2mzxw7M',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-9600K / AMD Ryzen 5 3600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA RTX 2060 / AMD RX 6600 XT',
      storage: '80 GB available space'
    },
    featured: false
  },
  {
    id: 17,
    name: 'Minecraft',
    price: 599,
    genre: 'Sandbox',
    rating: 4.8,
    description: 'Build, mine, and survive in a limitless block world where creativity and exploration know no bounds.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg',
    youtubeId: 'MmB9b5njV4',
    youtubeUrl: 'https://www.youtube.com/watch?v=MmB9b5njV4',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 / 11',
      processor: 'Intel Core i3-3210 / AMD A8-7600',
      memory: '4 GB RAM',
      graphics: 'Intel HD 4000 / AMD Radeon R5',
      storage: '1 GB available space'
    },
    featured: true
  },
  {
    id: 18,
    name: 'ARK: Survival Ascended',
    price: 2199,
    genre: 'Survival',
    rating: 4.1,
    description: 'Gather resources, tame prehistoric creatures, and survive against a wild and dangerous island ecosystem.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2399830/header.jpg',
    youtubeId: '6E_bTS5t9l0',
    youtubeUrl: 'https://www.youtube.com/watch?v=6E_bTS5t9l0',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i7-7700K / AMD Ryzen 5 1600X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1660 / AMD Radeon RX 5600 XT',
      storage: '70 GB available space'
    },
    featured: false
  },
  {
    id: 19,
    name: 'Sons of the Forest',
    price: 1699,
    genre: 'Survival',
    rating: 4.4,
    description: 'Fight to stay alive in a mysterious forest where resources are scarce, enemies are relentless, and terror lurks in the dark.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1326470/header.jpg',
    youtubeId: 'ipHhPpRchJ4',
    youtubeUrl: 'https://www.youtube.com/watch?v=ipHhPpRchJ4',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 / AMD Radeon RX 570',
      storage: '20 GB available space'
    },
    featured: false
  },
  {
    id: 20,
    name: 'Resident Evil 4',
    price: 1999,
    genre: 'Survival Horror',
    rating: 4.8,
    description: 'Brace for relentless terror as you battle through a nightmare village with tense action, scarce resources, and brutal encounters.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
    youtubeId: 'QY4lQ6l2wS8',
    youtubeUrl: 'https://www.youtube.com/watch?v=QY4lQ6l2wS8',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-7500 / AMD Ryzen 3 1200',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1050 Ti / AMD Radeon RX 560',
      storage: '50 GB available space'
    },
    featured: true
  },
  {
    id: 21,
    name: 'Silent Hill 2',
    price: 2199,
    genre: 'Survival Horror',
    rating: 4.6,
    description: 'Return to a fog-soaked nightmare shaped by psychological horror, unsettling imagery, and a relentless sense of dread.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2124490/header.jpg',
    youtubeId: 'nFq6BB4vM5E',
    youtubeUrl: 'https://www.youtube.com/watch?v=nFq6BB4vM5E',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
      memory: '12 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 / AMD Radeon RX 580',
      storage: '30 GB available space'
    },
    featured: false
  },
  {
    id: 22,
    name: 'Dying Light 2',
    price: 1499,
    genre: 'Action RPG',
    rating: 4.3,
    description: 'Parkour across a deadly city, scavenge resources, and survive a post-apocalyptic world alive with danger and infection.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/534380/header.jpg',
    youtubeId: '2XgTz1vZC2M',
    youtubeUrl: 'https://www.youtube.com/watch?v=2XgTz1vZC2M',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-8600K / AMD Ryzen 5 3600X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GTX 1060 / AMD Radeon RX 580',
      storage: '60 GB available space'
    },
    featured: false
  },
  {
    id: 23,
    name: 'Baldur\'s Gate 3',
    price: 1999,
    genre: 'RPG',
    rating: 4.9,
    description: 'Shape a party of heroes in a deeply branching RPG of storytelling, tactical combat, and unforgettable choices.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
    youtubeId: '1H1nJgNnXwM',
    youtubeUrl: 'https://www.youtube.com/watch?v=1H1nJgNnXwM',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i7-8700K / AMD Ryzen 5 3600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 3060 / AMD Radeon RX 6700 XT',
      storage: '150 GB available space'
    },
    featured: true
  },
  {
    id: 24,
    name: 'Diablo IV',
    price: 2299,
    genre: 'Action RPG',
    rating: 4.5,
    description: 'Slash through demonic hordes in a dark, beautifully rendered action RPG built around progression, combat, and relentless momentum.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2344520/header.jpg',
    youtubeId: 'A9aW9F3gn5Q',
    youtubeUrl: 'https://www.youtube.com/watch?v=A9aW9F3gn5Q',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-9600K / AMD Ryzen 5 3600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 3060 / AMD Radeon RX 6600',
      storage: '90 GB available space'
    },
    featured: false
  },
  {
    id: 25,
    name: 'Black Myth: Wukong',
    price: 2099,
    genre: 'Action RPG',
    rating: 4.7,
    description: 'Fight through mythic landscapes inspired by Chinese folklore in a striking action RPG powered by cinematic combat and atmosphere.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
    youtubeId: 'QWe3jW0LS1k',
    youtubeUrl: 'https://www.youtube.com/watch?v=QWe3jW0LS1k',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-8400 / AMD Ryzen 5 1600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580',
      storage: '130 GB available space'
    },
    featured: false
  },
  {
    id: 26,
    name: 'Palworld',
    price: 1499,
    genre: 'Survival',
    rating: 4.3,
    description: 'Capture creatures, build your base, and survive in a vibrant open-world sandbox where every resource matters.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg',
    youtubeId: 'QK2Q6mY8KX0',
    youtubeUrl: 'https://www.youtube.com/watch?v=QK2Q6mY8KX0',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-3570K / AMD Ryzen 5 1500X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1050 Ti / AMD Radeon RX 560',
      storage: '40 GB available space'
    },
    featured: false
  },
  {
    id: 27,
    name: 'Dota 2',
    price: 0,
    genre: 'MOBA',
    rating: 4.6,
    description: 'Command heroes, coordinate your team, and outmaneuver opponents in one of the deepest and most competitive strategy games ever created.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg',
    youtubeId: 'mMnq8TgV62M',
    youtubeUrl: 'https://www.youtube.com/watch?v=mMnq8TgV62M',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Dual Core from Intel or AMD at 2.8 GHz',
      memory: '4 GB RAM',
      graphics: 'NVIDIA GeForce 8600 / AMD Radeon HD 2600',
      storage: '15 GB available space'
    },
    featured: false
  },
  {
    id: 28,
    name: 'League of Legends',
    price: 0,
    genre: 'MOBA',
    rating: 4.5,
    description: 'Lead a champion, control the map, and execute coordinated team play in a timeless tactical arena battle.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg',
    youtubeId: 'vP4D7qQzQ4Q',
    youtubeUrl: 'https://www.youtube.com/watch?v=vP4D7qQzQ4Q',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 7 / 8 / 10',
      processor: '2.0 GHz dual-core processor',
      memory: '2 GB RAM',
      graphics: 'NVIDIA GeForce 9600 GT / AMD Radeon HD 6570',
      storage: '16 GB available space'
    },
    featured: false
  },
  {
    id: 29,
    name: 'Warhammer 40,000: Space Marine 2',
    price: 2499,
    genre: 'Action',
    rating: 4.4,
    description: 'Fight through relentless xenos hordes as a brutal space marine in a high-impact co-op action shooter full of power and spectacle.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2183900/header.jpg',
    youtubeId: 'LQ3mA1iJj0c',
    youtubeUrl: 'https://www.youtube.com/watch?v=LQ3mA1iJj0c',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i7-9700K / AMD Ryzen 7 3700X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 3060 / AMD Radeon RX 6700 XT',
      storage: '90 GB available space'
    },
    featured: false
  },
  {
    id: 30,
    name: 'Helldivers 2',
    price: 1799,
    genre: 'Co-op Shooter',
    rating: 4.7,
    description: 'Join a relentless co-op campaign and fight across hostile planets in a brutal, chaotic shooter built for teamwork and mayhem.',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/553850/header.jpg',
    youtubeId: 'M7r4QvR5TgA',
    youtubeUrl: 'https://www.youtube.com/watch?v=M7r4QvR5TgA',
    trailerVerified: true,
    systemRequirements: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i7-9700K / AMD Ryzen 7 3700X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 2070 / AMD RX 6700 XT',
      storage: '100 GB available space'
    },
    featured: true
  }
];

const slugifyGameTitle = (name = '') => {
  return name
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/&/g, 'and')
    .replace(/[:,.]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
};

const resolveGameImage = (game) => {
  const slug = slugifyGameTitle(game?.name || '');
  if (!slug) return './images/games/default-game.jpg';
  return `./images/games/${slug}.jpg`;
};

window.gamesData = gamesData;
window.resolveGameImage = resolveGameImage;
