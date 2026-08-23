import type { Localized, ProcessStep } from './types'

export const processSection: Localized<{ title: string }> = {
  ar: { title: 'رحلتك معنا' },
  en: { title: 'Journey' },
}

export const processSteps: Localized<ProcessStep[]> = {
  ar: [
    {
      id: 'plan-together',
      numeral: '١',
      title: 'منخطط سوا',
      body: 'منزورك ومنقيس كل تفصيل. لنضمن إنو كل قطعة تركب بمكانها... كأنها خِلقت إلو. ',
      imageAlt: 'صورة من جلسة التخطيط',
      imageSrc: '/process_images/hneineh-Planning-Together-1080x1080.webp',
    },
    {
      id: 'share-vision',
      numeral: '٢',
      title: 'بتخبرنا شو متخيل',
      body: 'منفوت على راسك. منسمعك، ومنفهم شو عم تتخيل، حتى قبل ما تقدر توصفه. منضيف خبرتنا لنخلق أفكار... ما بتشبه غيرك.',
      imageAlt: 'صورة من مرحلة تصور الفكرة',
      imageSrc: '/process_images/hneineh-Imagination-To-Reality-1080x1080.webp',
    },
    {
      id: 'choose-materials',
      numeral: '٣',
      title: 'منختار المواد معك',
      body: 'منختار الجودة... قبل أي شي. منساعدك تختار المواد والألوان يلي بتناسب ذوقك وأسلوب حياتك. منختار أجود الخامات لنضمن إنو كل قطعة بتبقى بنفس جمالها لسنين.',
      imageAlt: 'صورة من اختيار المواد',
      imageSrc: '/process_images/hneineh-Choosing-The-Materials-1080x1080.webp',
    },
    {
      id: 'vision-in-detail',
      numeral: '٤',
      title: 'كل تفصيل إلو سبب',
      body: 'مهندسينا المختصّين بيدرسوا كل تفصيل بدقّة، لأن الجمال وحده ما بيكفي... كل عنصر لازم يكون عملي، مريح، ومصمّم ليخدم حياتك اليومية.',
      imageAlt: 'صورة من مرحلة تصميم التفاصيل',
      imageSrc: '/process_images/hneineh-Details-With-Reason-1080x1080.webp',
    },
    {
      id: 'craft-begins',
      numeral: '٥',
      title: 'هون بتبلّش الحرفة',
      body: 'من أول خطوة لآخر تفصيل، منلتزم بالدقة، الإتقان والعناية، لنقدم قطعة تعكس ثقتكم فينا.',
      imageAlt: 'صورة من التنفيذ داخل الورشة',
      imageSrc: '/process_images/hneineh-Where-The-Craft-Begins-1080x1080.webp',
    },
    {
      id: 'deliver-more',
      numeral: '٦',
      title: 'منسلّمك أكتر من ما توقعت',
      body: 'منركب كل قطعة بمكانها. وبأول نظرة... بتحس إنو هيدا المكان خلق إلك.',
      imageAlt: 'صورة من تسليم المشروع النهائي',
      imageSrc: '/process_images/hneineh-Final-Project-Delivery-1080x1080.webp',
    },
  ],
  en: [
    {
      id: 'plan-together',
      numeral: '1',
      title: 'Designed Together',
      body: 'We visit your space, measure every detail, and ensure each piece settles perfectly into its surroundings—as if it were made exclusively for it.',
      imageAlt: 'Photo from a planning session',
      imageSrc: '/process_images/hneineh-Planning-Together-1080x1080.webp',
    },
    {
      id: 'share-vision',
      numeral: '2',
      title: 'Your Vision, Our Expertise',
      body: 'We listen beyond words. We understand your vision, even before it takes shape, and combine it with our expertise to create something truly distinctive—crafted exclusively for you.',
      imageAlt: 'Photo from the vision stage',
      imageSrc: '/process_images/hneineh-Imagination-To-Reality-1080x1080.webp',
    },
    {
      id: 'choose-materials',
      numeral: '3',
      title: 'The Finest Materials, Chosen for You',
      body: 'Because quality comes first. Together, we select refined materials and colours that reflect your taste and way of life. Every material is carefully chosen for its exceptional quality, ensuring each piece remains timeless in beauty for years to come.',
      imageAlt: 'Photo from selecting materials',
      imageSrc: '/process_images/hneineh-Choosing-The-Materials-1080x1080.webp',
    },
    {
      id: 'vision-in-detail',
      numeral: '4',
      title: 'Every Detail, Deliberately Designed',
      body: 'Our expert designers approach every detail with precision and purpose. Because true luxury is never about beauty alone—it is about the perfect balance of form, function, and comfort. Every element is thoughtfully conceived to enrich your everyday living, with an elegance that feels effortless and enduring.',
      imageAlt: 'Photo from the detailed design stage',
      imageSrc: '/process_images/hneineh-Details-With-Reason-1080x1080.webp',
    },
    {
      id: 'craft-begins',
      numeral: '5',
      title: 'Where Craftsmanship Begins',
      body: 'From the first gesture to the finest detail, every piece is shaped with precision, mastery, and meticulous care. A commitment to exceptional craftsmanship, expressed through every line, every material, and every finish—creating furniture worthy of your trust, and designed to endure.',
      imageAlt: 'Photo from the workshop floor',
      imageSrc: '/process_images/hneineh-Where-The-Craft-Begins-1080x1080.webp',
    },
    {
      id: 'deliver-more',
      numeral: '6',
      title: 'More Than You Imagined',
      body: 'We take care of every detail, from the precise placement of each piece to the final finishing touch. And when you see it for the first time, you don’t simply see a beautifully furnished space—you feel that it was created especially for you.',
      imageAlt: 'Photo from the final project handover',
      imageSrc: '/process_images/hneineh-Final-Project-Delivery-1080x1080.webp',
    },
  ],
}
