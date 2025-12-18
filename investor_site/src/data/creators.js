// Sample creator data for the waitlist section
// This data can be updated manually by adding more creator objects

export const creators = [
  {
    handle: 'sophiarose',
    name: 'Sophia Rose',
    followers: 487000,
    verified: true,
    category: 'Lifestyle'
  },
  {
    handle: 'alexfitness',
    name: 'Alex Morgan',
    followers: 923000,
    verified: true,
    category: 'Fitness'
  },
  {
    handle: 'jessicabeauty',
    name: 'Jessica Lee',
    followers: 1250000,
    verified: true,
    category: 'Beauty'
  },
  {
    handle: 'mikeartist',
    name: 'Mike Chen',
    followers: 345000,
    verified: false,
    category: 'Art'
  },
  {
    handle: 'emilygaming',
    name: 'Emily Stone',
    followers: 2100000,
    verified: true,
    category: 'Gaming'
  },
  {
    handle: 'davidcooks',
    name: 'David Martinez',
    followers: 678000,
    verified: true,
    category: 'Food'
  },
  {
    handle: 'samanthastyle',
    name: 'Samantha Davis',
    followers: 534000,
    verified: true,
    category: 'Fashion'
  },
  {
    handle: 'chrismusicpro',
    name: 'Chris Taylor',
    followers: 1890000,
    verified: true,
    category: 'Music'
  },
  {
    handle: 'oliviatravel',
    name: 'Olivia White',
    followers: 456000,
    verified: false,
    category: 'Travel'
  },
  {
    handle: 'ryantech',
    name: 'Ryan Anderson',
    followers: 789000,
    verified: true,
    category: 'Tech'
  },
  {
    handle: 'nataliedance',
    name: 'Natalie Brown',
    followers: 612000,
    verified: true,
    category: 'Dance'
  },
  {
    handle: 'jasonphotography',
    name: 'Jason Wilson',
    followers: 398000,
    verified: false,
    category: 'Photography'
  },
  {
    handle: 'laurayoga',
    name: 'Laura Garcia',
    followers: 845000,
    verified: true,
    category: 'Wellness'
  },
  {
    handle: 'brandoncomedy',
    name: 'Brandon Moore',
    followers: 1560000,
    verified: true,
    category: 'Comedy'
  },
  {
    handle: 'rachellifestyle',
    name: 'Rachel Thomas',
    followers: 723000,
    verified: true,
    category: 'Lifestyle'
  }
];

/**
 * Format follower count to readable string
 * @param {number} count - The follower count
 * @returns {string} Formatted string (e.g., "1.2M", "487K")
 */
export function formatFollowerCount(count) {
  if (count >= 1000000000) {
    return (count / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toString();
}

