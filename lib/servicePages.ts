export interface ServicePageContent {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];

  hero: {
    headline: string;
    subheadline: string;
  };

  introduction: {
    title: string;
    paragraphs: string[];
  };

  benefits: {
    title: string;
    items: Array<{ title: string; description: string }>;
  };

  deepContent: {
    title?: string;
    paragraphs: string[];
  };

  schema: {
    serviceType: string;
    areaServed: string[];
  };
}

export const servicePages: Record<string, ServicePageContent> = {
  'weight-loss': {
    id: 'weight-loss',
    slug: 'weight-loss',
    title: 'Weight Loss Hypnosis',
    metaTitle: 'Weight Loss Hypnosis Cobourg | Clinical Hypnosis for Sustainable Weight Loss',
    metaDescription: 'Evidence-based weight loss hypnosis in Cobourg, ON. Address emotional eating, transform your relationship with food, and achieve sustainable results with clinical hypnosis.',
    keywords: [
      'weight loss hypnosis port hope',
      'clinical hypnosis weight loss ontario',
      'hypnosis for emotional eating',
      'weight loss hypnosis',
      'sustainable weight loss solution'
    ],

    hero: {
      headline: 'Transform Your Relationship With Food',
      subheadline: 'Address the root causes of overeating and achieve sustainable weight loss through evidence-based clinical hypnosis'
    },

    introduction: {
      title: 'A Different Approach to Weight Loss',
      paragraphs: [
        'Most weight loss approaches focus on restriction, willpower, and external rules. But lasting change happens when you address what\'s driving your eating patterns at the deepest level.',
        'Clinical hypnosis works differently. Instead of fighting against yourself, we work with your mind to naturally shift your relationship with food, your body, and yourself.',
        'Have you ever looked in the mirror and not fully recognized the person looking back at you?',
        'Maybe your clothes fit tighter. Maybe your body feels unfamiliar. Maybe you\'re moving through a season of life where everything is shifting and your body seems to be changing in ways you can\'t control. Perhaps the dialogue in your mind is noisy and unforgiving after every meal telling you "I shouldn\'t have eaten that", as if shaming yourself actually changes anything.',
        'For many people, weight is not about laziness or lack of discipline. It\'s about protection. When we fight against our body, our body fights back, and willpower alone is not enough to create a new mind-body relationship.',
        'You\'ve likely tried before. Diets. Rules. Cutting things out. Starting over on Monday. New Year resolutions.',
        'Today there is more information about weight loss than ever and yet people are more confused than ever. One expert says eat less. Another says eat more. Carbs are bad. Carbs are necessary. Fast. Don\'t fast. Track everything. Don\'t track anything.',
        'When your mind is overwhelmed, your brain defaults to what feels certain and reliable.',
        'Human beings are wired for comfort, connection, and enjoyable experiences. Food quickly becomes the most available way to meet those needs.',
        'Hypnosis works at the level where these associations live. Instead of forcing yourself to resist urges, we change why they exist. We calm the internal alarm system that tells your body to hold on, soothe, or seek relief through food.',
        'As your system feels steadier, choices begin to change naturally. Cravings lose urgency. Eating slows down. Trust replaces control.',
        'This isn\'t about punishment or strict rules. It\'s about creating enough inner stability that your body no longer needs to protect you in the same way.',
        'Thousands of people have reshaped their relationship with food and their body through hypnosis.',
        'And when you\'re ready, we can begin.'
      ]
    },

    benefits: {
      title: 'How Hypnosis Helps You Lose Weight',
      items: [
        {
          title: 'Address Emotional Eating',
          description: 'Identify and resolve the emotional triggers that drive overeating, so food no longer becomes your go-to comfort.'
        },
        {
          title: 'Rewire Your Subconscious',
          description: 'Change the automatic patterns and beliefs about food that keep you stuck, creating new, supportive neural pathways.'
        },
        {
          title: 'Build Sustainable Habits',
          description: 'Create lasting change that doesn\'t require white-knuckling willpower or obsessive discipline.'
        },
        {
          title: 'Increase Body Confidence',
          description: 'Develop genuine self-trust and confidence in your ability to make choices that honor your health.'
        },
        {
          title: 'Release Shame and Guilt',
          description: 'Free yourself from the internal dialogue that shames you after eating, breaking the shame-eat cycle.'
        },
        {
          title: 'Feel Calmer and More Grounded',
          description: 'Develop emotional regulation skills that reduce stress-eating and help you respond instead of react.'
        }
      ]
    },

    deepContent: {
      paragraphs: [
        'Have you ever looked in the mirror and not fully recognized the person looking back at you?',
        'Maybe your clothes fit tighter. Maybe your body feels unfamiliar. Maybe you\'re moving through a season of life where everything is shifting and your body seems to be changing in ways you can\'t control. Perhaps the dialogue in your mind is noisy and unforgiving after every meal telling you "I shouldn\'t have eaten that", as if shaming yourself actually changes anything.',
        'For many people, weight is not about laziness or lack of discipline. It\'s about protection. When we fight against our body, our body fights back, and willpower alone is not enough to create a new mind-body relationship.',
        'You\'ve likely tried before. Diets. Rules. Cutting things out. Starting over on Monday. New Year resolutions.',
        'Today there is more information about weight loss than ever and yet people are more confused than ever. One expert says eat less. Another says eat more. Carbs are bad. Carbs are necessary. Fast. Don\'t fast. Track everything. Don\'t track anything.',
        'When your mind is overwhelmed, your brain defaults to what feels certain and reliable.',
        'Human beings are wired for comfort, connection, and enjoyable experiences. Food quickly becomes the most available way to meet those needs.',
        'Hypnosis works at the level where these associations live. Instead of forcing yourself to resist urges, we change why they exist. We calm the internal alarm system that tells your body to hold on, soothe, or seek relief through food.',
        'As your system feels steadier, choices begin to change naturally. Cravings lose urgency. Eating slows down. Trust replaces control.',
        'This isn\'t about punishment or strict rules. It\'s about creating enough inner stability that your body no longer needs to protect you in the same way.',
        'Thousands of people have reshaped their relationship with food and their body through hypnosis.',
        'And when you\'re ready, we can begin.'
      ]
    },

    schema: {
      serviceType: 'Clinical Hypnosis for Weight Loss',
      areaServed: ['Port Hope', 'Cobourg', 'Newcastle', 'Peterborough', 'Oshawa', 'Durham Region']
    }
  },

  'smoking-cessation': {
    id: 'smoking-cessation',
    slug: 'smoking-cessation',
    title: 'Stop Smoking Hypnosis',
    metaTitle: 'Stop Smoking Hypnosis Cobourg | Quit Smoking with Clinical Hypnosis',
    metaDescription: 'Break free from smoking with evidence-based clinical hypnosis in Cobourg, ON. High success rate, no willpower required. Book your free screening today.',
    keywords: [
      'quit smoking hypnosis port hope',
      'stop smoking hypnosis ontario',
      'smoking cessation hypnosis',
      'how to quit smoking',
      'stop smoking program'
    ],

    hero: {
      headline: 'Break Free From Smoking. Reclaim Your Freedom.',
      subheadline: 'Address the subconscious patterns keeping you stuck and quit smoking for good with clinical hypnosis'
    },

    introduction: {
      title: 'Freedom Awaits',
      paragraphs: [
        'Smoking starts as a choice, but over time it becomes something that feels like it\'s choosing you. If you\'ve tried to quit before, you know that willpower alone isn\'t enough.',
        'Hypnosis works differently. Instead of fighting cravings with sheer determination, we address the patterns keeping you stuck at the subconscious level.',
        'What would happen if you were no longer controlled by the urge to smoke?',
        'Imagine getting lost in the things you love without being interrupted by the need for a cigarette. No more stepping outside in the cold. No more planning your day around smoke breaks. Just freedom — clear, steady, calm freedom.',
        'Whether it\'s cigarettes, vaping, or cannabis, smoking often begins as a choice… and slowly becomes something that feels like it\'s choosing you. You may have tried to quit before. You may have told yourself you "should" stop. And part of you already knows you\'ve outgrown this habit.',
        'Hypnosis works by addressing the subconscious patterns that keep the cycle going. The automatic reach, the stress response, the identity of being "a smoker." Instead of fighting cravings with willpower alone, we rewire the association at its root.',
        'Thousands of people have successfully stopped smoking using hypnosis and you can too. When your mind is on board, change becomes natural. Effortless. Permanent.',
        'Imagine breathing deeply without restriction. Moving your body freely. Waking up without that heavy feeling in your chest. Feeling proud of yourself for following through.',
        'You are not weak. You are not lacking willpower. You are simply ready for a new pattern.',
        'And when you\'re ready, we can begin.'
      ]
    },

    benefits: {
      title: 'What Hypnosis for Smoking Cessation Does',
      items: [
        {
          title: 'Eliminate Cravings',
          description: 'Address the subconscious triggers and automatic reach that keep you smoking throughout the day.'
        },
        {
          title: 'Break the Stress Response',
          description: 'Rewire how your nervous system responds to stress, so you no longer reach for a cigarette when overwhelmed.'
        },
        {
          title: 'Reclaim Your Identity',
          description: 'Move beyond the identity of "being a smoker" and step into your power as someone who is free.'
        },
        {
          title: 'Regain Control',
          description: 'Feel empowered and in control of your choices, rather than controlled by the habit.'
        },
        {
          title: 'Improve Your Health',
          description: 'Stop the cycle of damage, guilt, and shame. Reclaim your health, energy, and self-respect.'
        },
        {
          title: 'Save Money and Time',
          description: 'Stop spending money on cigarettes and reclaim the hours previously lost to smoke breaks and cravings.'
        }
      ]
    },

    deepContent: {
      paragraphs: [
        'What would happen if you were no longer controlled by the urge to smoke?',
        'Imagine getting lost in the things you love without being interrupted by the need for a cigarette. No more stepping outside in the cold. No more planning your day around smoke breaks. Just freedom — clear, steady, calm freedom.',
        'Whether it\'s cigarettes, vaping, or cannabis, smoking often begins as a choice… and slowly becomes something that feels like it\'s choosing you. You may have tried to quit before. You may have told yourself you "should" stop. And part of you already knows you\'ve outgrown this habit.',
        'Hypnosis works by addressing the subconscious patterns that keep the cycle going. The automatic reach, the stress response, the identity of being "a smoker." Instead of fighting cravings with willpower alone, we rewire the association at its root.',
        'Thousands of people have successfully stopped smoking using hypnosis and you can too. When your mind is on board, change becomes natural. Effortless. Permanent.',
        'Imagine breathing deeply without restriction. Moving your body freely. Waking up without that heavy feeling in your chest. Feeling proud of yourself for following through.',
        'You are not weak. You are not lacking willpower. You are simply ready for a new pattern.',
        'And when you\'re ready, we can begin.'
      ]
    },

    schema: {
      serviceType: 'Clinical Hypnosis for Smoking Cessation',
      areaServed: ['Port Hope', 'Cobourg', 'Newcastle', 'Peterborough', 'Oshawa', 'Durham Region']
    }
  },

  'stress-management': {
    id: 'stress-management',
    slug: 'stress-management',
    title: 'Stress Management Hypnosis',
    metaTitle: 'Stress Management Hypnosis Cobourg | Reduce Stress with Clinical Hypnosis',
    metaDescription: 'Reduce chronic stress and restore inner peace with clinical hypnosis in Cobourg, ON. Regain calm clarity and emotional freedom. Book your free screening.',
    keywords: [
      'stress management hypnosis port hope',
      'reduce stress hypnosis',
      'stress hypnosis ontario',
      'stress relief hypnosis',
      'calm nervous system hypnosis'
    ],

    hero: {
      headline: 'Find Calm. Regain Control. Live Freely.',
      subheadline: 'Reset your stress response and restore inner peace through evidence-based clinical hypnosis'
    },

    introduction: {
      title: 'Your Nervous System Can Feel Safe Again',
      paragraphs: [
        'Chronic stress is like a smoke alarm that won\'t turn off. Your nervous system is in constant activation mode, ready to fight threats that aren\'t actually there.',
        'Hypnosis works by gently resetting your nervous system to a healthier baseline—a place where you feel safe, grounded, and capable of handling life\'s challenges.',
        'Do you feel like your mind never fully shuts off?',
        'Maybe you\'re constantly thinking ahead. Replaying conversations. Managing everyone else\'s needs. Holding everything together or holding on to resentment from the past. From the outside, you look capable. On the inside, your nervous system feels stretched thin.',
        'Stress isn\'t a weakness. It\'s a survival response. It\'s feedback to yourself that you need help with something.',
        'Your brain is wired to keep you safe. When it perceives pressure, uncertainty, or responsibility, it activates. It prepares. And over time, that constant activation can begin to feel normal even when it\'s exhausting.',
        'You may have tried to relax. Deep breathing. Time off. Telling yourself to "calm down." But when your body doesn\'t feel safe enough to power down, it won\'t.',
        'At the same time, chronic stress steals your freedom. Freedom to be present. Freedom to enjoy your family. Freedom to think clearly and respond instead of react.',
        'Hypnosis works by gently resetting the stress response at its root. We communicate directly with the part of your mind responsible for protection and teach it a new baseline. One where you can feel steady, grounded, and in control of yourself.',
        'When your nervous system feels safe, it no longer needs to over-function. When your mind quiets, you regain choice. When your body relaxes, you reclaim energy.',
        'Imagine moving through your day with calm clarity. Responding instead of snapping. Sleeping deeply. Feeling both secure and free inside your own life.',
        'Thousands of people have used hypnosis to reduce stress and restore balance.',
        'And when you\'re ready, we can begin.'
      ]
    },

    benefits: {
      title: 'How Stress Management Hypnosis Helps',
      items: [
        {
          title: 'Calm Your Nervous System',
          description: 'Reset your stress response so your body no longer operates in constant fight-or-flight mode.'
        },
        {
          title: 'Reduce Overwhelm',
          description: 'Process and release emotional buildup so you feel lighter and more capable of handling daily demands.'
        },
        {
          title: 'Improve Sleep Quality',
          description: 'When your nervous system feels safe, your body naturally relaxes into deeper, more restorative sleep.'
        },
        {
          title: 'Think More Clearly',
          description: 'As stress diminishes, mental clarity returns, allowing you to make better decisions and focus on what matters.'
        },
        {
          title: 'Respond Instead of React',
          description: 'Develop emotional regulation so you handle challenges with calm clarity instead of reactive stress.'
        },
        {
          title: 'Reclaim Your Freedom',
          description: 'Experience genuine freedom—to be present with loved ones, to enjoy your life, to feel like yourself again.'
        }
      ]
    },

    deepContent: {
      paragraphs: [
        'Do you feel like your mind never fully shuts off?',
        'Maybe you\'re constantly thinking ahead. Replaying conversations. Managing everyone else\'s needs. Holding everything together or holding on to resentment from the past. From the outside, you look capable. On the inside, your nervous system feels stretched thin.',
        'Stress isn\'t a weakness. It\'s a survival response. It\'s feedback to yourself that you need help with something.',
        'Your brain is wired to keep you safe. When it perceives pressure, uncertainty, or responsibility, it activates. It prepares. And over time, that constant activation can begin to feel normal even when it\'s exhausting.',
        'You may have tried to relax. Deep breathing. Time off. Telling yourself to "calm down." But when your body doesn\'t feel safe enough to power down, it won\'t.',
        'At the same time, chronic stress steals your freedom. Freedom to be present. Freedom to enjoy your family. Freedom to think clearly and respond instead of react.',
        'Hypnosis works by gently resetting the stress response at its root. We communicate directly with the part of your mind responsible for protection and teach it a new baseline. One where you can feel steady, grounded, and in control of yourself.',
        'When your nervous system feels safe, it no longer needs to over-function. When your mind quiets, you regain choice. When your body relaxes, you reclaim energy.',
        'Imagine moving through your day with calm clarity. Responding instead of snapping. Sleeping deeply. Feeling both secure and free inside your own life.',
        'Thousands of people have used hypnosis to reduce stress and restore balance.',
        'And when you\'re ready, we can begin.'
      ]
    },

    schema: {
      serviceType: 'Clinical Hypnosis for Stress Management',
      areaServed: ['Port Hope', 'Cobourg', 'Newcastle', 'Peterborough', 'Oshawa', 'Durham Region']
    }
  },

  'fears': {
    id: 'fears',
    slug: 'fears',
    title: 'Overcome Your Fears',
    metaTitle: 'Overcome Your Fears Hypnosis Cobourg | Clinical Hypnosis for Stress Relief',
    metaDescription: 'Overcome fears and fears with evidence-based clinical hypnosis in Cobourg, ON. Rapid relief from fear of flying, public speaking, heights, and more. Book your free screening.',
    keywords: [
      'fear fear hypnosis port hope',
      'fear of flying hypnosis',
      'public speaking stress hypnosis',
      'overcome fears hypnosis',
      'fear relief hypnosis'
    ],

    hero: {
      headline: 'Break Free From Fear. Reclaim Your Life.',
      subheadline: 'Overcome fears with rapid, evidence-based clinical hypnosis'
    },

    introduction: {
      title: 'Fear Doesn\'t Have To Control You',
      paragraphs: [
        'Fear is a natural survival mechanism, but when it becomes disproportionate to the actual threat, it limits your life. Whether it\'s fear of flying, heights, public speaking, or social situations, hypnosis offers rapid relief.',
        'The brain can be retrained. The fearful response can be reset. And you can reclaim the freedom to do the things you want to do.',
        'Do you avoid situations because of fear?',
        'Maybe you won\'t fly, even when you want to travel. Maybe you won\'t speak up in meetings, even when you have valuable insights. Maybe you avoid social gatherings or crowded places. Maybe you\'re terrified of heights, animals, or being trapped.',
        'Living with a fear isn\'t just uncomfortable—it\'s restrictive. It limits your career opportunities, your relationships, and your sense of freedom.',
        'The truth is, your fear response is automatic. It\'s stored in the part of your brain that prioritizes survival. Logic doesn\'t reach it. Willpower can\'t override it. Avoidance only reinforces it.',
        'That\'s where hypnosis comes in. Instead of fighting fear, we retrain the response at its source.',
        'Hypnosis works by directly communicating with the part of your brain responsible for the fear response. We teach it that the threat isn\'t actually as dangerous as it believes. We create new neural pathways of safety and confidence.',
        'The result? Fear loses its grip. The automatic panic response diminishes. You regain freedom.',
        'Thousands of people have used hypnosis to overcome fears that plagued them for years. When your mind is recalibrated, change can happen rapidly.',
        'And when you\'re ready, we can begin.'
      ]
    },

    benefits: {
      title: 'How Fear Hypnosis Helps',
      items: [
        {
          title: 'Rapid Fear Relief',
          description: 'Experience significant reduction in fear response, often within just a few sessions.'
        },
        {
          title: 'Reset the Brain\'s Fear Response',
          description: 'Retrain your amygdala to perceive safety instead of threat, creating lasting change.'
        },
        {
          title: 'Regain Freedom and Confidence',
          description: 'Do the things you\'ve avoided: travel, speak publicly, socialize, and live fully.'
        },
        {
          title: 'Remove the Physical Symptoms',
          description: 'Eliminate panic attacks, racing heart, sweating, and other physical fear responses.'
        },
        {
          title: 'Create Lasting Change',
          description: 'Move beyond surface-level coping to actual rewiring of your fear response.'
        },
        {
          title: 'Reclaim Your Power',
          description: 'Stop letting fear make your decisions. Take back control of your choices and your life.'
        }
      ]
    },

    deepContent: {
      paragraphs: [
        'Do you avoid situations because of fear?',
        'Maybe you won\'t fly, even when you want to travel. Maybe you won\'t speak up in meetings, even when you have valuable insights. Maybe you avoid social gatherings or crowded places. Maybe you\'re terrified of heights, animals, or being trapped.',
        'Living with a fear isn\'t just uncomfortable—it\'s restrictive. It limits your career opportunities, your relationships, and your sense of freedom.',
        'The truth is, your fear response is automatic. It\'s stored in the part of your brain that prioritizes survival. Logic doesn\'t reach it. Willpower can\'t override it. Avoidance only reinforces it.',
        'That\'s where hypnosis comes in. Instead of fighting fear, we retrain the response at its source.',
        'Hypnosis works by directly communicating with the part of your brain responsible for the fear response. We teach it that the threat isn\'t actually as dangerous as it believes. We create new neural pathways of safety and confidence.',
        'The result? Fear loses its grip. The automatic panic response diminishes. You regain freedom.',
        'Thousands of people have used hypnosis to overcome fears that plagued them for years. When your mind is recalibrated, change can happen rapidly.',
        'And when you\'re ready, we can begin.'
      ]
    },

    schema: {
      serviceType: 'Clinical Hypnosis for Fear Relief',
      areaServed: ['Port Hope', 'Cobourg', 'Newcastle', 'Peterborough', 'Oshawa', 'Durham Region']
    }
  },

  'confidence': {
    id: 'confidence',
    slug: 'confidence',
    title: 'Build Self-Confidence',
    metaTitle: 'Self-Confidence Hypnosis Cobourg | Build Confidence with Clinical Hypnosis',
    metaDescription: 'Build genuine self-confidence and overcome self-doubt with clinical hypnosis in Cobourg, ON. Develop unshakeable confidence and step into your full potential. Book your free screening.',
    keywords: [
      'confidence building hypnosis',
      'self-esteem hypnosis',
      'overcome self-doubt hypnosis',
      'self-confidence port hope',
      'build confidence naturally'
    ],

    hero: {
      headline: 'Step Into Your Full Potential',
      subheadline: 'Build genuine, unshakeable confidence through evidence-based clinical hypnosis'
    },

    introduction: {
      title: 'Confidence Comes From Within',
      paragraphs: [
        'Self-doubt is a pattern. A learned response. A collection of beliefs about yourself that were formed based on past experiences, feedback, and conclusions you made early in life.',
        'The good news? Patterns can be changed. Beliefs can be rewritten. And confidence can be built from the inside out.',
        'Do you hold yourself back because of self-doubt?',
        'Maybe you don\'t speak up in meetings, even when you have good ideas. Maybe you avoid new challenges because you\'re afraid you\'ll fail. Maybe you compare yourself to others and come up short. Maybe you struggle with imposter syndrome—the nagging feeling that you\'re not good enough, that you\'ll be "found out."',
        'Self-doubt is exhausting. It drains your energy, limits your potential, and keeps you smaller than you actually are.',
        'Confidence isn\'t about arrogance or ego. Real confidence is quiet inner knowing. It\'s the belief that you\'re capable, worthy, and deserving of success and happiness.',
        'Hypnosis builds confidence at the deepest level—the subconscious level where self-image lives.',
        'Instead of trying to think your way to confidence (which never works), we directly upgrade your subconscious beliefs about yourself. We rewrite the story you\'ve been telling yourself. We strengthen your sense of self-worth and capability.',
        'When your mind accepts that you\'re capable, competent, and worthy, your behavior shifts naturally. You speak up. You take chances. You move forward with clarity and calm.',
        'Thousands of people have built unshakeable confidence through hypnosis. When your subconscious supports you, everything becomes easier.',
        'And when you\'re ready, we can begin.'
      ]
    },

    benefits: {
      title: 'How Confidence Hypnosis Helps',
      items: [
        {
          title: 'Overcome Self-Doubt',
          description: 'Replace limiting self-beliefs with genuine confidence in your abilities and worth.'
        },
        {
          title: 'Build Authentic Confidence',
          description: 'Develop quiet, grounded confidence that comes from within, not from external validation.'
        },
        {
          title: 'Improve Self-Image',
          description: 'Strengthen your subconscious self-perception, leading to natural behavioral change.'
        },
        {
          title: 'Take Bolder Action',
          description: 'Speak up, take risks, pursue goals, and step into opportunities with quiet assurance.'
        },
        {
          title: 'Reduce Imposter Syndrome',
          description: 'Move beyond the fear that you\'ll be "found out," and own your accomplishments and value.'
        },
        {
          title: 'Unlock Your Potential',
          description: 'Stop holding yourself back and step into the capabilities and dreams you already have within you.'
        }
      ]
    },

    deepContent: {
      paragraphs: [
        'Do you hold yourself back because of self-doubt?',
        'Maybe you don\'t speak up in meetings, even when you have good ideas. Maybe you avoid new challenges because you\'re afraid you\'ll fail. Maybe you compare yourself to others and come up short. Maybe you struggle with imposter syndrome—the nagging feeling that you\'re not good enough, that you\'ll be "found out."',
        'Self-doubt is exhausting. It drains your energy, limits your potential, and keeps you smaller than you actually are.',
        'Confidence isn\'t about arrogance or ego. Real confidence is quiet inner knowing. It\'s the belief that you\'re capable, worthy, and deserving of success and happiness.',
        'Hypnosis builds confidence at the deepest level—the subconscious level where self-image lives.',
        'Instead of trying to think your way to confidence (which never works), we directly upgrade your subconscious beliefs about yourself. We rewrite the story you\'ve been telling yourself. We strengthen your sense of self-worth and capability.',
        'When your mind accepts that you\'re capable, competent, and worthy, your behavior shifts naturally. You speak up. You take chances. You move forward with clarity and calm.',
        'Thousands of people have built unshakeable confidence through hypnosis. When your subconscious supports you, everything becomes easier.',
        'And when you\'re ready, we can begin.'
      ]
    },

    schema: {
      serviceType: 'Clinical Hypnosis for Confidence Building',
      areaServed: ['Port Hope', 'Cobourg', 'Newcastle', 'Peterborough', 'Oshawa', 'Durham Region']
    }
  },

  'sports-performance': {
    id: 'sports-performance',
    slug: 'sports-performance',
    title: 'Sports Performance Hypnosis',
    metaTitle: 'Sports Performance Hypnosis Cobourg | Mental Training for Athletes Ontario',
    metaDescription: 'Enhance athletic performance with clinical hypnosis and mental training in Cobourg, ON. Improve focus, manage pressure, and unlock peak performance. Book your free screening.',
    keywords: [
      'sports hypnosis',
      'athletic performance hypnosis',
      'mental training athletes',
      'sports performance coaching',
      'peak performance hypnosis'
    ],

    hero: {
      headline: 'Unlock Your Peak Performance',
      subheadline: 'Use the power of hypnosis and mental training to elevate your athletic performance'
    },

    introduction: {
      title: 'The Mental Game Wins Championships',
      paragraphs: [
        'Elite athletes know the truth: the competition isn\'t just physical. It\'s mental.',
        'You can train your body. But unless you train your mind, you\'ll always hit a ceiling. Performance stress, pressure choking, self-doubt, and mental fatigue all have their roots in the subconscious.',
        'Hypnosis is the competitive edge that separates good athletes from great ones.',
        'Do you underperform when it matters most?',
        'Maybe you have the skills, but when pressure is on, you tighten up. Maybe your mind gets in your own way. Maybe you struggle with focus, confidence, or the mental resilience needed to perform at your highest level in competition.',
        'Physical training is necessary, but it\'s not sufficient. Your mind has to be just as trained as your body.',
        'Athletes at the highest levels—Olympic competitors, professional teams, elite performers—use hypnosis and visualization to reprogram their mental responses.',
        'Hypnosis trains your mind to:',
        'Focus with laser precision even under pressure. Manage performance stress and nervousness. Visualize success automatically. Build unshakeable confidence. Develop mental toughness and resilience. Access your peak state on demand.',
        'When your mind is performing at its peak, your body follows. Your technique flows. Your decisions come automatically. You\'re in the zone.',
        'Thousands of elite athletes have used hypnosis to unlock the next level of performance. When your mind and body work together, you become unstoppable.',
        'And when you\'re ready, we can begin.'
      ]
    },

    benefits: {
      title: 'How Sports Performance Hypnosis Helps',
      items: [
        {
          title: 'Improve Focus and Concentration',
          description: 'Train your mind to maintain laser-focused concentration even under pressure and distractions.'
        },
        {
          title: 'Manage Performance Stress',
          description: 'Overcome nerves and pressure choking, allowing your training to shine when it counts.'
        },
        {
          title: 'Build Unshakeable Confidence',
          description: 'Develop the quiet confidence that allows you to trust your abilities under any circumstance.'
        },
        {
          title: 'Enhance Visualization',
          description: 'Program your mind to automatically visualize success, priming your nervous system for peak performance.'
        },
        {
          title: 'Develop Mental Toughness',
          description: 'Build resilience, grit, and the ability to handle setbacks and maintain performance throughout competition.'
        },
        {
          title: 'Unlock Peak Performance States',
          description: 'Learn to access the zone—that state of effortless excellence—on demand, when you need it most.'
        }
      ]
    },

    deepContent: {
      paragraphs: [
        'Do you underperform when it matters most?',
        'Maybe you have the skills, but when pressure is on, you tighten up. Maybe your mind gets in your own way. Maybe you struggle with focus, confidence, or the mental resilience needed to perform at your highest level in competition.',
        'Physical training is necessary, but it\'s not sufficient. Your mind has to be just as trained as your body.',
        'Athletes at the highest levels—Olympic competitors, professional teams, elite performers—use hypnosis and visualization to reprogram their mental responses.',
        'Hypnosis trains your mind to focus with laser precision, manage performance stress, visualize success automatically, build unshakeable confidence, develop mental toughness, and access peak states on demand.',
        'When your mind is performing at its peak, your body follows. Your technique flows. Your decisions come automatically. You\'re in the zone.',
        'Thousands of elite athletes have used hypnosis to unlock the next level of performance. When your mind and body work together, you become unstoppable.',
        'And when you\'re ready, we can begin.'
      ]
    },

    schema: {
      serviceType: 'Clinical Hypnosis for Sports Performance Enhancement',
      areaServed: ['Port Hope', 'Cobourg', 'Newcastle', 'Peterborough', 'Oshawa', 'Durham Region']
    }
  },

  'pain-management': {
    id: 'pain-management',
    slug: 'pain-management',
    title: 'Pain Management Hypnosis',
    metaTitle: 'Pain Management Hypnosis Cobourg | Chronic Pain Relief Clinical Hypnosis',
    metaDescription: 'Reduce chronic pain and improve quality of life with clinical hypnosis in Cobourg, ON. Non-invasive pain management for fibromyalgia, arthritis, and more. Book your free screening.',
    keywords: [
      'chronic pain hypnosis',
      'pain relief hypnosis',
      'fibromyalgia hypnosis',
      'pain management hypnosis port hope',
      'natural pain relief'
    ],

    hero: {
      headline: 'Reclaim Your Life From Chronic Pain',
      subheadline: 'Reduce chronic pain and improve quality of life through evidence-based clinical hypnosis'
    },

    introduction: {
      title: 'Pain Is More Than Physical',
      paragraphs: [
        'Chronic pain isn\'t just a physical sensation. It\'s a communication from your nervous system. And the nervous system can be recalibrated.',
        'Hypnosis doesn\'t mask pain or ignore it. Instead, we work with your mind to change how your body perceives and responds to pain signals, reducing both the intensity and emotional weight of chronic pain.',
        'Are you exhausted by chronic pain?',
        'Maybe pain limits your activities, disrupts your sleep, and affects your quality of life. Maybe you\'ve tried medications, physical treatment, or other treatments with limited relief.',
        'Chronic pain changes the brain. It creates heightened pain sensitivity, increased stress response, and sometimes depression. The pain becomes central to your identity and daily experience.',
        'But here\'s what research shows: pain perception is modifiable. The mind plays a much larger role in pain experience than we once believed.',
        'Hypnosis works by communicating directly with the nervous system, teaching it a new relationship with pain.',
        'We don\'t ignore the pain or pretend it isn\'t there. Instead, we reduce the brain\'s pain amplification, lower nervous system reactivity, and help your mind develop a more neutral relationship with pain signals.',
        'The result? Pain intensity decreases. Your emotional reaction to pain diminishes. Your ability to function improves.',
        'Thousands of people with chronic pain conditions have found significant relief through hypnosis. When your nervous system relaxes, pain perception naturally decreases.',
        'And when you\'re ready, we can begin.'
      ]
    },

    benefits: {
      title: 'How Pain Management Hypnosis Helps',
      items: [
        {
          title: 'Reduce Pain Perception',
          description: 'Lower the brain\'s pain amplification, reducing the intensity of chronic pain signals.'
        },
        {
          title: 'Decrease Pain Reactivity',
          description: 'Calm your nervous system\'s response to pain, reducing the stress and emotional suffering associated with it.'
        },
        {
          title: 'Improve Sleep Quality',
          description: 'Break the pain-sleep disruption cycle, allowing your body to rest and heal naturally.'
        },
        {
          title: 'Increase Functional Capacity',
          description: 'Regain ability to move, work, and enjoy activities with reduced pain and limitation.'
        },
        {
          title: 'Reduce Medication Dependence',
          description: 'Many clients reduce pain medication use, though this should always be discussed with your doctor.'
        },
        {
          title: 'Restore Quality of Life',
          description: 'Move beyond pain management to actual pain reduction, reclaiming your life and your future.'
        }
      ]
    },

    deepContent: {
      paragraphs: [
        'Are you exhausted by chronic pain?',
        'Maybe you live with fibromyalgia, arthritis, back pain, or another chronic condition. Maybe pain limits your activities, disrupts your sleep, and affects your quality of life. Maybe you\'ve tried medications, physical treatment, or other treatments with limited relief.',
        'Chronic pain changes the brain. It creates heightened pain sensitivity, increased stress response, and sometimes depression. The pain becomes central to your identity and daily experience.',
        'But here\'s what research shows: pain perception is modifiable. The mind plays a much larger role in pain experience than we once believed.',
        'Hypnosis works by communicating directly with the nervous system, teaching it a new relationship with pain. We don\'t ignore the pain or pretend it isn\'t there. Instead, we reduce the brain\'s pain amplification, lower nervous system reactivity, and help your mind develop a more neutral relationship with pain signals.',
        'The result? Pain intensity decreases. Your emotional reaction to pain diminishes. Your ability to function improves.',
        'Thousands of people with chronic pain conditions have found significant relief through hypnosis. When your nervous system relaxes, pain perception naturally decreases.',
        'And when you\'re ready, we can begin.'
      ]
    },

    schema: {
      serviceType: 'Clinical Hypnosis for Chronic Pain Management',
      areaServed: ['Port Hope', 'Cobourg', 'Newcastle', 'Peterborough', 'Oshawa', 'Durham Region']
    }
  },

  'sleep-issues': {
    id: 'sleep-issues',
    slug: 'sleep-issues',
    title: 'Sleep Improvement Hypnosis',
    metaTitle: 'Sleep Hypnosis Cobourg | Overcome Insomnia with Clinical Hypnosis',
    metaDescription: 'Improve sleep and overcome insomnia with clinical hypnosis in Cobourg, ON. Natural sleep solutions without medications. Book your free screening.',
    keywords: [
      'insomnia hypnosis',
      'sleep improvement',
      'sleep hypnosis',
      'natural sleep remedy',
      'hypnosis for better sleep'
    ],

    hero: {
      headline: 'Sleep Deeply Again. Wake Refreshed.',
      subheadline: 'Overcome insomnia and sleep issues with evidence-based clinical hypnosis'
    },

    introduction: {
      title: 'Quality Sleep Is Essential To Your Health',
      paragraphs: [
        'Sleep deprivation affects everything: your mood, your immune system, your mental clarity, your weight, your health.',
        'But when insomnia becomes chronic, your mind gets stuck in a pattern. You lie awake, frustrated. You worry about not sleeping, which keeps you awake. The harder you try to sleep, the more elusive it becomes.',
        'Hypnosis breaks this pattern. It retrains your mind and nervous system to naturally fall asleep and stay asleep.',
        'Do you struggle with sleep?',
        'Maybe you can\'t fall asleep, even though you\'re exhausted. Maybe you wake up in the middle of the night and can\'t get back to sleep. Maybe you wake too early and your mind won\'t quiet down. Maybe your mind races with thoughts and worries the moment your head hits the pillow.',
        'Sleep issues are incredibly common, but they\'re also incredibly treatable.',
        'Insomnia isn\'t a failure of willpower. It\'s a nervous system that\'s stuck in activation mode—ready, alert, unable to power down.',
        'Your body wants to sleep. Your mind wants to sleep. But something in your nervous system learned to stay vigilant, to worry, to stay on alert.',
        'Hypnosis retrains that system. We communicate directly with the part of your brain responsible for sleep-wake cycles and teach it to feel safe enough to let go.',
        'When your nervous system trusts that it\'s safe to rest, sleep comes naturally. No fighting. No frustration. Just deep, restorative sleep.',
        'Most people notice improvement within the first few sessions. As your mind learns the new pattern, sleep becomes easier and deeper.',
        'Thousands of people have reclaimed their sleep using hypnosis. When your nervous system relaxes, sleep follows naturally.',
        'And when you\'re ready, we can begin.'
      ]
    },

    benefits: {
      title: 'How Sleep Hypnosis Helps',
      items: [
        {
          title: 'Fall Asleep Naturally',
          description: 'Quiet your racing mind and naturally drift into sleep without medications or struggle.'
        },
        {
          title: 'Stay Asleep Through the Night',
          description: 'Reduce nighttime wakings and sleep through without interruption.'
        },
        {
          title: 'Sleep Deeply and Restoratively',
          description: 'Achieve the deep sleep your body needs for healing, recovery, and optimal health.'
        },
        {
          title: 'Wake Refreshed',
          description: 'Eliminate grogginess and wake feeling genuinely rested and ready for your day.'
        },
        {
          title: 'Eliminate Sleep Stress',
          description: 'Break the cycle of worrying about sleep, which only keeps you awake longer.'
        },
        {
          title: 'Improve Overall Health',
          description: 'Quality sleep improves mood, immune function, metabolism, and overall well-being.'
        }
      ]
    },

    deepContent: {
      paragraphs: [
        'Do you struggle with sleep?',
        'Maybe you can\'t fall asleep, even though you\'re exhausted. Maybe you wake up in the middle of the night and can\'t get back to sleep. Maybe you wake too early and your mind won\'t quiet down. Maybe your mind races with thoughts and worries the moment your head hits the pillow.',
        'Sleep issues are incredibly common, but they\'re also incredibly treatable.',
        'Insomnia isn\'t a failure of willpower. It\'s a nervous system that\'s stuck in activation mode—ready, alert, unable to power down.',
        'Your body wants to sleep. Your mind wants to sleep. But something in your nervous system learned to stay vigilant, to worry, to stay on alert.',
        'Hypnosis retrains that system. We communicate directly with the part of your brain responsible for sleep-wake cycles and teach it to feel safe enough to let go.',
        'When your nervous system trusts that it\'s safe to rest, sleep comes naturally. No fighting. No frustration. Just deep, restorative sleep.',
        'Most people notice improvement within the first few sessions. As your mind learns the new pattern, sleep becomes easier and deeper.',
        'Thousands of people have reclaimed their sleep using hypnosis. When your nervous system relaxes, sleep follows naturally.',
        'And when you\'re ready, we can begin.'
      ]
    },

    schema: {
      serviceType: 'Clinical Hypnosis for Sleep Improvement',
      areaServed: ['Port Hope', 'Cobourg', 'Newcastle', 'Peterborough', 'Oshawa', 'Durham Region']
    }
  },

  'habit-breaking': {
    id: 'habit-breaking',
    slug: 'habit-breaking',
    title: 'Habit Breaking Hypnosis',
    metaTitle: 'Habit Breaking Hypnosis Cobourg | Change Unwanted Habits Hypnosis',
    metaDescription: 'Break unwanted habits and create lasting change with clinical hypnosis in Cobourg, ON. Address nail biting, procrastination, and more. Book your free screening.',
    keywords: [
      'break bad habits hypnosis',
      'habit breaking hypnosis',
      'nail biting hypnosis',
      'procrastination hypnosis',
      'unwanted habits hypnosis port hope'
    ],

    hero: {
      headline: 'Break Free From Unwanted Habits',
      subheadline: 'Replace old patterns with new behaviors through evidence-based clinical hypnosis'
    },

    introduction: {
      title: 'Habits Are Automatic. Until You Change Them.',
      paragraphs: [
        'A habit is something your subconscious mind does automatically. You don\'t think about it. It just happens.',
        'That\'s why willpower doesn\'t work for habit breaking. You can\'t think your way out of something that lives below conscious awareness.',
        'Hypnosis works at the level where habits actually live—the subconscious mind.',
        'Are you stuck in an unwanted habit?',
        'Maybe you bite your nails, even though you\'ve tried a hundred times to stop. Maybe you procrastinate, even though you know it creates stress. Maybe you have repetitive behaviors—skin picking, fidgeting, overeating in certain situations—that you\'ve tried unsuccessfully to quit.',
        'Habits start for a reason. They serve a purpose. Usually, they\'re a way of managing stress, stress, boredom, or discomfort. Your subconscious mind thinks it\'s helping you, even when the habit is now causing problems.',
        'When you try to break a habit through willpower alone, you\'re fighting against your own protective mechanism. That\'s exhausting and rarely successful.',
        'Hypnosis works differently. We identify the underlying need the habit fulfills. We address the stress or discomfort driving it. Then we reprogram your subconscious to meet those needs in healthier ways.',
        'When the underlying need is met, the habit naturally falls away. You don\'t have to white-knuckle through it. You just stop doing it, because your mind no longer feels the need.',
        'Thousands of people have broken habits that plagued them for years. When your subconscious is on board, change happens naturally and easily.',
        'And when you\'re ready, we can begin.'
      ]
    },

    benefits: {
      title: 'How Habit Breaking Hypnosis Helps',
      items: [
        {
          title: 'Identify the Root Cause',
          description: 'Discover the underlying need or stress your habit is trying to meet.'
        },
        {
          title: 'Address the Real Problem',
          description: 'Work with your subconscious to meet those needs in healthier, more constructive ways.'
        },
        {
          title: 'Break Automatic Patterns',
          description: 'Reprogram the automatic response so the habit no longer feels necessary or appealing.'
        },
        {
          title: 'Replace With Healthy Behaviors',
          description: 'Install new, supportive patterns that serve you better than the old habit ever could.'
        },
        {
          title: 'Eliminate Stress About the Habit',
          description: 'Stop the shame, frustration, and self-criticism associated with struggling with the habit.'
        },
        {
          title: 'Create Lasting Change',
          description: 'Move beyond temporary willpower-based change to permanent, automatic habit transformation.'
        }
      ]
    },

    deepContent: {
      paragraphs: [
        'Are you stuck in an unwanted habit?',
        'Maybe you bite your nails, even though you\'ve tried a hundred times to stop. Maybe you procrastinate, even though you know it creates stress. Maybe you have repetitive behaviors—skin picking, fidgeting, overeating in certain situations—that you\'ve tried unsuccessfully to quit.',
        'Habits start for a reason. They serve a purpose. Usually, they\'re a way of managing stress, stress, boredom, or discomfort. Your subconscious mind thinks it\'s helping you, even when the habit is now causing problems.',
        'When you try to break a habit through willpower alone, you\'re fighting against your own protective mechanism. That\'s exhausting and rarely successful.',
        'Hypnosis works differently. We identify the underlying need the habit fulfills. We address the stress or discomfort driving it. Then we reprogram your subconscious to meet those needs in healthier ways.',
        'When the underlying need is met, the habit naturally falls away. You don\'t have to white-knuckle through it. You just stop doing it, because your mind no longer feels the need.',
        'Thousands of people have broken habits that plagued them for years. When your subconscious is on board, change happens naturally and easily.',
        'And when you\'re ready, we can begin.'
      ]
    },

    schema: {
      serviceType: 'Clinical Hypnosis for Habit Breaking',
      areaServed: ['Port Hope', 'Cobourg', 'Newcastle', 'Peterborough', 'Oshawa', 'Durham Region']
    }
  }
};

export function getServicePageContent(serviceId: string): ServicePageContent | null {
  return servicePages[serviceId] || null;
}

export function getAllServicePages(): ServicePageContent[] {
  return Object.values(servicePages);
}
