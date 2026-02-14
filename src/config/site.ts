// src/config/site.ts
// Zentrale Site-Konfiguration für das Portfolio

export interface SiteConfig {
  /** Site-URL (ohne abschließenden Slash) */
  url: string;
  /** Site-Name in verschiedenen Sprachen */
  name: {
    de: string;
    en: string;
  };
  /** Standard-Titel für die Startseite */
  title: {
    de: string;
    en: string;
  };
  /** Meta-Beschreibungen für SEO */
  description: {
    de: string;
    en: string;
  };
  /** Autor-Informationen */
  author: {
    name: string;
    email: string;
    jobTitle: {
      de: string;
      en: string;
    };
  };
  /** Social Media und Kontakt-Links */
  social: {
    github: {
      url: string;
      username: string;
    };
    discord: {
      url: string;
      username: string;
    };
    itch: {
      url: string;
      username: string;
    };
    email: string;
  };
  /** Copyright-Informationen */
  copyright: {
    year: number;
    holder: string;
    tagline: {
      de: string;
      en: string;
    };
  };
  /** Standard-Einstellungen */
  defaults: {
    lang: 'de' | 'en';
    theme: 'dark' | 'light';
  };
  /** Blog-Konfiguration */
  blog: {
    title: {
      de: string;
      en: string;
    };
    description: {
      de: string;
      en: string;
    };
    postsPerPage: number;
  };
}

export const siteConfig: SiteConfig = {
  url: 'https://sven-neurath.de',

  name: {
    de: 'Sven Neurath',
    en: 'Sven Neurath',
  },

  title: {
    de: 'Sven Neurath | System Administrator & Game Developer',
    en: 'Sven Neurath | System Administrator & Game Developer',
  },

  description: {
    de: 'Sven Neurath - IT Systemintegration | Homelab, Docker, Linux & Game Development',
    en: 'Sven Neurath - IT Systems Integration | Homelab, Docker, Linux & Game Development',
  },

  author: {
    name: 'Sven Neurath',
    email: 'info@sven-neurath.de',
    jobTitle: {
      de: 'IT Systemintegration | Homelab, Docker, Linux & Game Development',
      en: 'IT Systems Integration | Homelab, Docker, Linux & Game Development',
    },
  },

  social: {
    github: {
      url: 'https://github.com/DarkSoon',
      username: 'DarkSoon',
    },
    discord: {
      url: 'https://discord.com/users/213665789952131073',
      username: 'DarkSoon',
    },
    itch: {
      url: 'https://itch.io',
      username: 'DarkSoon',
    },
    email: 'info@sven-neurath.de',
  },

  copyright: {
    year: 2026,
    holder: 'Sven Neurath',
    tagline: {
      de: 'Infrastruktur und Spiele bauen.',
      en: 'Building infrastructure and games.',
    },
  },

  defaults: {
    lang: 'de',
    theme: 'dark',
  },

  blog: {
    title: {
      de: 'Blog | Sven Neurath',
      en: 'Blog | Sven Neurath',
    },
    description: {
      de: 'Gedanken und Tutorials zu Homelab, Docker, Linux und Game Development',
      en: 'Thoughts and tutorials on Homelab, Docker, Linux and Game Development',
    },
    postsPerPage: 10,
  },
} as const;

// Hilfsfunktion zum Erstellen von Seitentiteln
export function getPageTitle(pageTitle: string, lang: 'de' | 'en' = 'de'): string {
  return `${pageTitle} | ${siteConfig.name[lang]}`;
}

// Hilfsfunktion für Meta-Beschreibungen
export function getMetaDescription(customDesc?: string, lang: 'de' | 'en' = 'de'): string {
  return customDesc || siteConfig.description[lang];
}

// Export für Manifest-URL (Homelab-Stats)
export const manifestUrl = `${siteConfig.url}/manifest.json`;
