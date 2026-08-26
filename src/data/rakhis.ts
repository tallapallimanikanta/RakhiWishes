/* ============================================
   Rakhi Data
   ============================================
   Each Rakhi has a unique ID, display name,
   image, and accent color.
   
   To add more rakhis:
   1. Add image to public/rakhis/
   2. Add entry here with matching filename
   ============================================ */

export interface Rakhi {
  id: string
  name: string
  description: string
  image: string
  gradient: string
  accentColor: string
  accentColorLight: string
}

export const rakhis: Rakhi[] = [
  {
    id: 'lord-ganesh',
    name: 'Lord Ganesh',
    description: 'Blessed with wisdom and prosperity',
    image: '/rakhis/Lord Ganesh Rakhi.png',
    gradient: 'linear-gradient(135deg, #C89B3C 0%, #E8D48B 50%, #C89B3C 100%)',
    accentColor: '#C89B3C',
    accentColorLight: 'rgba(200, 155, 60, 0.10)',
  },
  {
    id: 'lord-shiva',
    name: 'Lord Shiva',
    description: 'Symbol of strength and protection',
    image: '/rakhis/Lord Shiva Rakhi.png',
    gradient: 'linear-gradient(135deg, #5B7FA7 0%, #A8C4D9 50%, #5B7FA7 100%)',
    accentColor: '#5B7FA7',
    accentColorLight: 'rgba(91, 127, 167, 0.10)',
  },
  {
    id: 'om-rakhi',
    name: 'OM Rakhi',
    description: 'Sacred symbol of divine energy',
    image: '/rakhis/OM Rakhi.png',
    gradient: 'linear-gradient(135deg, #D94F7A 0%, #F2A6BF 50%, #D94F7A 100%)',
    accentColor: '#D94F7A',
    accentColorLight: 'rgba(217, 79, 122, 0.10)',
  },
  {
    id: 'salaar',
    name: 'Salaar',
    description: 'Bold and courageous spirit',
    image: '/rakhis/Salaar Rakhi.png',
    gradient: 'linear-gradient(135deg, #E8945A 0%, #F5C9A0 50%, #E8945A 100%)',
    accentColor: '#E8945A',
    accentColorLight: 'rgba(232, 148, 90, 0.10)',
  },
]
