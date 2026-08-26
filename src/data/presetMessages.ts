/* ============================================
   Preset Messages
   ============================================
   Categorized message templates the sender
   can choose from and then edit.
   ============================================ */

export interface PresetMessage {
  id: string
  label: string
  category: PresetCategory
  text: string
}

export type PresetCategory = 'emotional' | 'sweet' | 'funny' | 'short' | 'traditional'

export interface PresetCategoryInfo {
  id: PresetCategory
  label: string
  emoji: string
}

export const presetCategories: PresetCategoryInfo[] = [
  { id: 'emotional', label: 'Emotional', emoji: '💛' },
  { id: 'sweet', label: 'Sweet', emoji: '🌸' },
  { id: 'funny', label: 'Funny', emoji: '😄' },
  { id: 'short', label: 'Short', emoji: '✨' },
  { id: 'traditional', label: 'Traditional', emoji: '🪷' },
]

export const presetMessages: PresetMessage[] = [
  // Emotional
  {
    id: 'emo-1',
    label: 'Heartfelt Bond',
    category: 'emotional',
    text: 'You have been my protector, my guide, and my best friend since childhood. This Raksha Bandhan, I want you to know how deeply I cherish every moment we have shared. Thank you for always being there. I love you beyond words.',
  },
  {
    id: 'emo-2',
    label: 'Growing Up Together',
    category: 'emotional',
    text: 'From fighting over the remote to sharing our biggest dreams — growing up with you has been the greatest gift. You are not just my sibling, you are my soul. Happy Raksha Bandhan, dear.',
  },
  {
    id: 'emo-3',
    label: 'Always There',
    category: 'emotional',
    text: 'No matter where life takes us, I know I always have someone who truly understands me. You are my anchor and my home. Wishing you all the love and happiness today and always.',
  },

  // Sweet
  {
    id: 'sweet-1',
    label: 'Sweet Wishes',
    category: 'sweet',
    text: 'To my favorite person in the world — may this Rakhi bring you as much joy as you bring to my life every single day. You are simply the best!',
  },
  {
    id: 'sweet-2',
    label: 'Little Things',
    category: 'sweet',
    text: 'It is the little things you do — the random calls, the silly jokes, the quiet support — that mean the most. Thank you for being you. Happy Raksha Bandhan!',
  },
  {
    id: 'sweet-3',
    label: 'Lucky Me',
    category: 'sweet',
    text: 'Some people search their whole lives for a bond like ours. I got lucky — I got you. Sending you all my love today and always.',
  },

  // Funny
  {
    id: 'funny-1',
    label: 'Still Owe Me',
    category: 'funny',
    text: 'Happy Raksha Bandhan! Just a reminder that you still owe me from that bet in 2019. But hey, I will let it slide — this time. Love you, weirdo!',
  },
  {
    id: 'funny-2',
    label: 'Best Sibling',
    category: 'funny',
    text: 'Congrats on having the world\'s best sibling! Your prize is this beautiful Rakhi wish. No returns accepted. You are stuck with me forever!',
  },
  {
    id: 'funny-3',
    label: 'StillAlive',
    category: 'funny',
    text: 'Another year of tolerating each other — and we are still alive! That deserves a celebration. Happy Raksha Bandhan to the one who knows all my embarrassing secrets!',
  },

  // Short
  {
    id: 'short-1',
    label: 'Simply Love',
    category: 'short',
    text: 'Love you always. Happy Raksha Bandhan!',
  },
  {
    id: 'short-2',
    label: 'Forever Bond',
    category: 'short',
    text: 'You and me — forever and always. Happy Rakhi!',
  },
  {
    id: 'short-3',
    label: 'Best Wishes',
    category: 'short',
    text: 'Wishing you all the love and happiness. You deserve the world!',
  },

  // Traditional
  {
    id: 'trad-1',
    label: 'Blessings',
    category: 'traditional',
    text: 'On this auspicious day of Raksha Bandhan, I tie this sacred thread with a prayer for your health, happiness, and prosperity. May God bless you always.',
  },
  {
    id: 'trad-2',
    label: 'Sacred Bond',
    category: 'traditional',
    text: 'The thread of Rakhi is not just a string — it is a bond of love, trust, and protection that our parents blessed us with. I promise to honor it always. Happy Raksha Bandhan.',
  },
  {
    id: 'trad-3',
    label: 'Festive Greetings',
    category: 'traditional',
    text: 'May this Raksha Bandhan bring peace and prosperity to your life. With love and prayers, I celebrate the beautiful bond we share. Shubh Raksha Bandhan!',
  },
]
