/* ============================================
   Rakhi Data
   ============================================
   Each Rakhi has a unique ID, display name,
   optional description, and placeholder assets.
   
   To swap in real artwork later, replace the
   `image` URL and `gradient` fallback.
   ============================================ */

export interface Rakhi {
  id: string
  name: string
  description: string
  /** Image URL — use placeholder for now, swap with real assets later */
  image: string
  /** CSS gradient used as image fallback / loading state */
  gradient: string
  /** Primary accent color for UI highlights */
  accentColor: string
  /** Secondary color for gradient accents */
  accentColorLight: string
}

export const rakhis: Rakhi[] = [
  {
    id: 'classic-pink',
    name: 'Classic Pink',
    description: 'Timeless pink threads with golden accents',
    image: '',
    gradient: 'linear-gradient(135deg, #D94F7A 0%, #F2A6BF 50%, #D94F7A 100%)',
    accentColor: '#D94F7A',
    accentColorLight: 'rgba(217, 79, 122, 0.10)',
  },
  {
    id: 'golden-elegance',
    name: 'Golden Elegance',
    description: 'Rich gold with traditional charm',
    image: '',
    gradient: 'linear-gradient(135deg, #C89B3C 0%, #E8D48B 50%, #C89B3C 100%)',
    accentColor: '#C89B3C',
    accentColorLight: 'rgba(200, 155, 60, 0.10)',
  },
  {
    id: 'saffron-bliss',
    name: 'Saffron Bliss',
    description: 'Warm saffron tones of celebration',
    image: '',
    gradient: 'linear-gradient(135deg, #E8945A 0%, #F5C9A0 50%, #E8945A 100%)',
    accentColor: '#E8945A',
    accentColorLight: 'rgba(232, 148, 90, 0.10)',
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    description: 'Delicate rose-tinted elegance',
    image: '',
    gradient: 'linear-gradient(135deg, #B76E79 0%, #E8C4C8 50%, #B76E79 100%)',
    accentColor: '#B76E79',
    accentColorLight: 'rgba(183, 110, 121, 0.10)',
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    description: 'Majestic purple with a regal touch',
    image: '',
    gradient: 'linear-gradient(135deg, #7B5EA7 0%, #C4B5D9 50%, #7B5EA7 100%)',
    accentColor: '#7B5EA7',
    accentColorLight: 'rgba(123, 94, 167, 0.10)',
  },
  {
    id: 'emerald-tradition',
    name: 'Emerald',
    description: 'Verdant green symbolizing prosperity',
    image: '',
    gradient: 'linear-gradient(135deg, #5B9A6F 0%, #A8D5B5 50%, #5B9A6F 100%)',
    accentColor: '#5B9A6F',
    accentColorLight: 'rgba(91, 154, 111, 0.10)',
  },
]
