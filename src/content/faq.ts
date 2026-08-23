import type { FaqItem, Localized } from './types'

export const faqSection: Localized<{ title: string }> = {
  ar: { title: 'كل يلي بدك تعرفه' },
  en: { title: 'FAQ' },
}

export const faqItems: Localized<FaqItem[]> = {
  ar: [
    {
      id: 'pricing',
      question: 'كيف بتحددوا سعر المشروع؟',
      answer: 'منآمن إنو الشغل المتقن ما لازم يكون مبالغ بسعره.',
    },
    {
      id: 'timeline',
      question: 'قديش بياخد وقت التنفيذ؟',
      answer:
        'كل مشروع إلو وقته. ما منستعجل على حساب الجودة، ولا منخليك تنطر بلا سبب. منلتزم بجدول واضح، ومننجز كل مرحلة بإتقان.',
    },
    {
      id: 'materials',
      question: 'شو الخيارات المتاحة من الأخشاب والخامات الفاخرة؟',
      answer:
        'خياراتنا ما إلها حدود. من أرقى الخامات وأفخم التشطيبات، منقدم جودة استثنائية مصممة لتدوم وتحافظ على جمالها عبر السنين.',
    },
    {
      id: 'delivery-lebanon',
      question: 'بتوصلوا لكل لبنان؟',
      answer:
        'أكيد. منوصل لكل المناطق اللبنانية، ومنعتني بالتوصيل والتركيب من دون أي تكلفة إضافية، لأن التجربة بتهمنا من أول فكرة... لآخر تفصيل.',
    },
    {
      id: 'post-delivery',
      question: 'إذا صار في مشكلة بعد التسليم شو بصير؟',
      answer:
        'منضل معك حتى بعد التسليم. إذا صار أي شي، منتابع معك ومنلاقي الحل المناسب، لأن رضاك جزء من شغلنا.',
    },
    {
      id: 'what-we-offer',
      question: 'شو منقدم؟',
      answer: '',
      showServicesList: true,
    },
  ],
  en: [
    {
      id: 'pricing',
      question: 'How do you price a project?',
      answer: 'We believe skilled craftsmanship shouldn’t come with an inflated price tag.',
    },
    {
      id: 'timeline',
      question: 'How long does execution take?',
      answer:
        'Every project has its own timeline. We never rush at the expense of quality, and we never leave you waiting without reason. We commit to a clear schedule and complete every stage with care.',
    },
    {
      id: 'materials',
      question: 'What luxury wood and material options are available?',
      answer:
        'Our options are limitless. From the finest materials to the most exquisite finishes, we deliver exceptional quality built to last and keep its beauty for years.',
    },
    {
      id: 'delivery-lebanon',
      question: 'Do you deliver across all of Lebanon?',
      answer:
        'Absolutely. We deliver to every region in Lebanon, and we handle delivery and installation at no extra cost — because the experience matters to us, from the first idea to the final detail.',
    },
    {
      id: 'post-delivery',
      question: 'What happens if an issue comes up after delivery?',
      answer:
        'We stay with you even after delivery. If anything comes up, we follow through with you and find the right solution, because your satisfaction is part of our work.',
    },
    {
      id: 'what-we-offer',
      question: 'What do you offer?',
      answer: '',
      showServicesList: true,
    },
  ],
}
