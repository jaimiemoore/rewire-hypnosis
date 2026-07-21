export interface ServiceFAQ {
  serviceId: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

// General FAQs that apply to all services
const generalFAQs = [
  {
    question: "What is clinical hypnosis and how does it work?",
    answer: "Clinical hypnosis is a focused, relaxed state of awareness that allows you to access the part of your mind where habits, emotional patterns, and automatic responses are stored. You're not asleep or out of control, you're simply more receptive and inwardly focused.\n\nIn this state, we work directly with the subconscious mind to \"rewire\" outdated beliefs, reduce stress responses, and create new, supportive patterns. 90-95% of our behaviours are driven by subconscious programming. A simple example is that you are breathing right now aren't you? And blinking your eyes? You are not consciously saying to yourself \"I must take another breath now\" \"I must blink now\", they are automatic responses governed by your subconscious mind that simply just happen without your conscious awareness.\n\nDuring hypnosis, you remain aware and in control the entire time. All hypnosis is self hypnosis, guided by the hypnotist, but led by you."
  },
  {
    question: "Is hypnosis safe?",
    answer: "Yes. Hypnosis is 100% safe. In fact, one hour of hypnosis offers the same effects as four hours of deep sleep."
  },
  {
    question: "What can hypnosis help me with?",
    answer: "Rewire Hypnosis specializes in:\n\n• Weight loss\n• Smoking cessation\n• Stress management\n• Pain management\n• Sleep improvement\n• Building confidence and self trust\n• Enhancing athletic or academic performance\n• Releasing fears such as public speaking, heights, flying"
  }
];

// Service-specific FAQs
const weightLossFAQs: ServiceFAQ = {
  serviceId: 'weight-loss',
  faqs: [
    ...generalFAQs,
    {
      question: "How is hypnosis different from traditional dieting?",
      answer: "Unlike diets that focus solely on restriction and willpower, hypnosis works at the subconscious level where your eating patterns and emotional triggers originate. Instead of fighting cravings, we address why they exist in the first place, creating lasting change that doesn't require constant willpower."
    },
    {
      question: "Will I need to follow a specific meal plan?",
      answer: "No. Hypnosis doesn't require strict meal plans or rigid rules. Instead, we work with your mind to naturally shift your relationship with food. As your system feels steadier and more emotionally regulated, healthier food choices become automatic rather than forced."
    },
    {
      question: "How long until I see results?",
      answer: "Most clients begin noticing changes within the first 2-4 weeks. However, everyone's timeline is different. Typically, you'll see significant progress within 4-6 sessions, though the deeper transformation in your relationship with food and your body continues to develop over time."
    },
    {
      question: "Does it work for emotional eating?",
      answer: "Yes. Emotional eating is actually where hypnosis is most effective. We work directly with the emotional patterns that trigger eating, helping you find alternative ways to soothe, comfort, or reward yourself. This is the key to sustainable weight loss."
    }
  ]
};

const smokingCessationFAQs: ServiceFAQ = {
  serviceId: 'smoking-cessation',
  faqs: [
    ...generalFAQs,
    {
      question: "How many sessions does it take to quit smoking?",
      answer: "Most clients successfully quit smoking with 4-6 sessions. Some achieve results in just 1-2 sessions, while others benefit from ongoing support. The number depends on your individual situation, how long you've smoked, and your motivation level."
    },
    {
      question: "Will I experience withdrawal symptoms?",
      answer: "Many clients report minimal to no withdrawal symptoms because hypnosis addresses the subconscious associations driving the habit, not just the nicotine habit. Rather than white-knuckling through cravings, hypnosis rewires why you smoke in the first place."
    },
    {
      question: "What if I've tried to quit before and failed?",
      answer: "Previous failed attempts don't predict future failure with hypnosis. In fact, they often mean you needed a different approach. Willpower alone doesn't work for everyone—hypnosis offers a different mechanism for change that many find more effective and sustainable."
    },
    {
      question: "Does hypnosis work for heavy smokers?",
      answer: "Yes. Whether you smoke a few cigarettes a day or a pack a day, hypnosis can help. Some of our most successful clients were the heaviest smokers. The key is that hypnosis addresses the psychological dependence, not just the physical habit."
    }
  ]
};

const stressManagementFAQs: ServiceFAQ = {
  serviceId: 'stress-management',
  faqs: [
    ...generalFAQs,
    {
      question: "Can hypnosis help with stress?",
      answer: "Absolutely. Stress management is important. Hypnosis works by resetting your nervous system's baseline, teaching it to feel safe and in control. This reduces both the frequency and intensity of worried thoughts and physical symptoms."
    },
    {
      question: "How does hypnosis reduce stress?",
      answer: "Hypnosis communicates directly with the part of your brain responsible for the stress response. We teach it a new baseline where you naturally feel more calm, grounded, and in control. It's like retraining your nervous system to interpret situations differently."
    },
    {
      question: "What if I can't relax during hypnosis?",
      answer: "Many people worry they can't be hypnotized or won't relax. The good news is that hypnosis isn't about forcing relaxation—it's about allowing your mind to naturally shift into a focused, receptive state. Even if you don't feel \"relaxed,\" the work is still happening at the subconscious level."
    },
    {
      question: "Is this a replacement for hypnosis?",
      answer: "Hypnosis and hypnosis serve complementary purposes. While hypnosis helps you understand patterns intellectually, hypnosis helps reprogram them at the subconscious level. Many people benefit from both. We can discuss whether hypnosis alone is appropriate for your situation."
    }
  ]
};

const fearsFAQs: ServiceFAQ = {
  serviceId: 'fears',
  faqs: [
    ...generalFAQs,
    {
      question: "Can hypnosis really cure a fear?",
      answer: "Yes. Learned fears responses stored in the amygdala, the part of your brain responsible for fear. Hypnosis can rapidly retrain this response, often leading to significant relief in just a few sessions. Many people experience dramatic shifts in fear response after hypnosis."
    },
    {
      question: "How long does it take to overcome a fear?",
      answer: "Many people experience noticeable reduction in fear response within 1-3 sessions. Some see results even faster. The brain is capable of rapid learning, and hypnosis works with that natural capacity. The longer you've had the fear, the more sessions may be beneficial."
    },
    {
      question: "Will I have to face my fear during hypnosis?",
      answer: "No. In fact, facing the feared object or situation is not necessary or even recommended. Hypnosis works at the neurological level to retrain your fear response. You can overcome the fear entirely in the hypnotic state without exposure to the actual trigger."
    },
    {
      question: "What if I have multiple fears?",
      answer: "Hypnosis often creates a general reduction in fear sensitivity across multiple fears. As your nervous system learns to feel safer overall, you may notice that even fears you didn't specifically address begin to diminish."
    }
  ]
};

const confidenceFAQs: ServiceFAQ = {
  serviceId: 'confidence',
  faqs: [
    ...generalFAQs,
    {
      question: "Can hypnosis really build confidence?",
      answer: "Yes. Confidence is rooted in self-image and beliefs about your capabilities. These live in the subconscious mind. By upgrading your subconscious self-beliefs through hypnosis, real, lasting confidence develops naturally."
    },
    {
      question: "How long until I feel more confident?",
      answer: "Many people notice shifts in their thinking and behavior within the first 1-2 sessions. However, true confidence develops progressively with continued sessions. Most clients report significant confidence gains within 4-6 sessions."
    },
    {
      question: "Is this just positive thinking?",
      answer: "No. Positive thinking can help temporarily, but it doesn't change subconscious beliefs. Hypnosis goes deeper—we reprogram the actual beliefs about yourself that were installed early in life. This creates authentic, sustainable confidence."
    },
    {
      question: "Will I become arrogant or overconfident?",
      answer: "Real confidence isn't arrogance. Healthy confidence is grounded, quiet, and comes from genuine self-knowledge and capability. Hypnosis builds authentic self-trust, not inflated ego. You become more grounded and assured, not arrogant."
    }
  ]
};

const sportsPerformanceFAQs: ServiceFAQ = {
  serviceId: 'sports-performance',
  faqs: [
    ...generalFAQs,
    {
      question: "Can hypnosis improve athletic performance?",
      answer: "Absolutely. Elite athletes know that peak performance is 90% mental. Hypnosis trains the mental game—focus, visualization, confidence, pressure management, and access to peak states. When your mind is trained, your body performs at its highest level."
    },
    {
      question: "Do I need to be a professional athlete?",
      answer: "No. Hypnosis benefits athletes at any level—from recreational to competitive to elite. Whether you're looking to improve your game, manage performance pressure, or unlock peak potential, sports hypnosis can help."
    },
    {
      question: "How often should I do hypnosis sessions?",
      answer: "For athletes, we typically recommend weekly or bi-weekly sessions during training season. Many athletes benefit from ongoing sessions leading up to major competitions. The frequency depends on your goals and timeline."
    },
    {
      question: "Can hypnosis help with injury recovery?",
      answer: "Yes. Hypnosis can support injury recovery by reducing pain perception, promoting relaxation, improving sleep (when pain disrupts it), and maintaining mental focus and motivation during rehabilitation."
    }
  ]
};

const painManagementFAQs: ServiceFAQ = {
  serviceId: 'pain-management',
  faqs: [
    ...generalFAQs,
    {
      question: "Is hypnosis safe for chronic pain?",
      answer: "Yes. Hypnosis is very safe for chronic pain and complements medical treatment. In fact, many doctors recommend hypnosis for pain management. It's non-invasive and has no negative side effects. However, always inform your healthcare provider that you're using hypnosis."
    },
    {
      question: "Will I become dependent on hypnosis for pain relief?",
      answer: "No. Unlike pain medications, hypnosis teaches your nervous system a new way of responding to pain. The benefits persist and often improve over time. Many clients eventually need fewer sessions as their nervous system maintains the new pattern."
    },
    {
      question: "Can I still use my pain medications?",
      answer: "Yes. Hypnosis works well alongside medications. Many clients find they can reduce medication doses as pain perception decreases, though this should always be done under doctor's supervision. Never stop medications without consulting your healthcare provider."
    },
    {
      question: "How long until pain improves?",
      answer: "Many people notice pain reduction within the first few sessions. However, chronic pain has often been present for years, so continued sessions support deeper and more lasting relief. Most clients see significant improvement within 4-6 sessions."
    }
  ]
};

const sleepIssuesFAQs: ServiceFAQ = {
  serviceId: 'sleep-issues',
  faqs: [
    ...generalFAQs,
    {
      question: "Can hypnosis really help insomnia?",
      answer: "Yes. Insomnia is largely a nervous system issue—your body can't power down because it's stuck in activation mode. Hypnosis directly retrains the nervous system to feel safe and naturally drift into sleep. Success rates are high."
    },
    {
      question: "How quickly will I sleep better?",
      answer: "Many people notice improvement within the first 1-2 sessions. Some experience dramatic shifts immediately. Since sleep improves fairly quickly, you can evaluate effectiveness relatively fast. Most clients see significant improvement within 3-4 sessions."
    },
    {
      question: "Do I have to stop my sleep medications?",
      answer: "Not necessarily. You can use hypnosis alongside medications. However, as your sleep naturally improves, many people are able to reduce or discontinue medications under doctor's guidance. Never stop medications without consulting your healthcare provider."
    },
    {
      question: "What if nothing else has worked?",
      answer: "If you've tried everything else without success, hypnosis may be exactly what you need. The fact that other approaches haven't worked suggests your nervous system needs retraining at a deeper level, which is precisely what hypnosis provides."
    }
  ]
};

const habitBreakingFAQs: ServiceFAQ = {
  serviceId: 'habit-breaking',
  faqs: [
    ...generalFAQs,
    {
      question: "How is hypnosis different from just trying harder?",
      answer: "Trying harder doesn't work for habits because habits live in the subconscious mind, below conscious control. Willpower can't reach it. Hypnosis works at the subconscious level where the habit actually lives, making change natural and effortless."
    },
    {
      question: "How long will it take to break my habit?",
      answer: "Many people see results within 1-3 sessions. However, the length depends on how long you've had the habit and how strong the underlying need is. Most clients break their habit within 4-6 sessions, with sustained change that lasts."
    },
    {
      question: "What if I've tried to break this habit many times before?",
      answer: "Previous failed attempts mean you needed a different approach. Willpower-based attempts fail when the habit is meeting an underlying need. Hypnosis identifies and addresses that need, allowing the habit to naturally fall away."
    },
    {
      question: "Will the habit come back if I'm stressed?",
      answer: "Properly done hypnosis creates lasting change. However, if your nervous system becomes highly stressed, you may revert to old patterns temporarily. Ongoing stress management or follow-up hypnosis sessions can prevent this and maintain the gains."
    }
  ]
};

export const serviceFAQs: Record<string, ServiceFAQ> = {
  'weight-loss': weightLossFAQs,
  'stress-management': stressManagementFAQs,
  'smoking-cessation': smokingCessationFAQs,
  'fears': fearsFAQs,
  'confidence': confidenceFAQs,
  'sports-performance': sportsPerformanceFAQs,
  'pain-management': painManagementFAQs,
  'sleep-issues': sleepIssuesFAQs,
  'habit-breaking': habitBreakingFAQs,
};

export function getFAQsByService(serviceId: string): ServiceFAQ | null {
  return serviceFAQs[serviceId] || null;
}
