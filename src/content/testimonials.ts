import type { Localized, Testimonial } from './types'

export const reviewsSection: Localized<{
  title: string
  slideLabel: (index: number) => string
  prevLabel: string
  nextLabel: string
}> = {
  ar: {
    title: 'شغلنا بيحكي عنا',
    slideLabel: (i) => `رأي العميل ${i + 1}`,
    prevLabel: 'السابق',
    nextLabel: 'التالي',
  },
  en: {
    title: 'Testimonials',
    slideLabel: (i) => `Client review ${i + 1}`,
    prevLabel: 'Previous',
    nextLabel: 'Next',
  },
}

export const testimonials: Localized<Testimonial[]> = {
  ar: [
    {
      id: 'testimonial-1',
      name: 'حسن غملوش',
      verified: true,
      badgeLabel: 'عميل موثّق',
      text: 'الحمد لله الله رزقنا بجماعة أوادم بيشتغلوا من قلبن و بيعطوا الشغل حقه ، الحق يقال كانت تجربه جدا رائعة معاملتهم و التزامهم و شغلهم النضيف كان كتير واضح و ان شاء الله بفرش كل البيت من عندهم',
    },
    {
      id: 'testimonial-2',
      name: 'فاطمة رزق',
      verified: true,
      badgeLabel: 'عميل موثّق',
      text: 'كانت تجربة اكثر من رائعة طلبت غرفة نوم من عندهم خشب و نظافة شغل و سرعة بالشغل و أسعارهم جدا ممتازة اقل من السوق و تعاملهم روعه الله يوفقهم و يرزقه يا رب',
    },
    {
      id: 'testimonial-3',
      name: 'هلا جابر',
      verified: true,
      badgeLabel: 'عميل موثّق',
      text: 'من أول زيارة، فهموا شو بدي قبل ما حتى عبّر عنه. كان كأنن قرأوا أفكاري. ما خلّوني إحكي كتير، لأنن كانوا فاهمين رؤيتي من التفاصيل الصغيرة. كانت تجربة مميّزة، والنتيجة طلعت أجمل بكتير من ما كنت متخيّلة.',
    },
    {
      id: 'testimonial-4',
      name: 'إلياس الخوري',
      verified: true,
      badgeLabel: 'عميل موثّق',
      text: 'أكتر شي حبيتوا إنن ما حاولوا يبيعونا تصميم جاهز، بالعكس فهموا ذوقنا وحوّلوا أفكارنا لواقع. الحرفية، الدقة، والاهتمام بأصغر التفاصيل خلّوا كل زاوية تحكي',
    },
    {
      id: 'testimonial-5',
      name: 'ميرا أبي ناضر',
      verified: true,
      badgeLabel: 'عميل موثّق',
      text: 'قبل ما اتعامل مع حنينة، جرّبت نجّارين غيرن، بس كنت دايماً حاسّ إنو عم ينفرض عليّي ستايل معيّن بدل ما حدا يسمع شو بدي. مع حنينة كان الفرق كبير، سمعونا وفهموا رؤيتنا، واشتغلوا معنا تفصيل بتفصيل لنوصل للنتيجة اللي كنا نحلم فيها. بيتي طلع أحلى بكتير من ما كنت متخيّل.',
    },
    {
      id: 'testimonial-6',
      name: 'خالد منصور',
      verified: true,
      badgeLabel: 'عميل موثّق',
      text: 'كنت مفكّر إنو الفرش بهالمستوى من الفخامة والتصميم رح يكون سعره عالي كتير، خصوصاً بعد تجارب سابقة مع غاليريات دفعت عندها مبالغ كبيرة. بس مع حنينة انبهرت. صراحة ما كنت متخيّل إنو فيني احصل على هالنوع من الفخامة والحرفية بسعر بهالقيمة.',
    },
    {
      id: 'testimonial-7',
      name: 'ليال شدياق',
      verified: true,
      badgeLabel: 'عميل موثّق',
      text: 'أكتر شي لفتني بتجربتي مع حنينة هو الاحترافية والاهتمام بكل تفصيل صغير. حسّيت إنو في حدا فعلاً مهتم يطلع البيت بأجمل صورة، مش بس ينجز الطلب. من أول فكرة لآخر لمسة، كان في ثقة وراحة، والنتيجة فاقت كل توقعاتي.',
    },
  ],
  en: [
    {
      id: 'testimonial-1',
      name: 'Hassan Ghamloush',
      verified: true,
      badgeLabel: 'Verified Client',
      text: 'Thank God we were blessed with genuine people who work from the heart and give the work its due. Truthfully, it was a wonderful experience — their treatment, commitment, and clean work were very clear, and God willing I’ll furnish my whole house through them.',
    },
    {
      id: 'testimonial-2',
      name: 'Fatima Rizk',
      verified: true,
      badgeLabel: 'Verified Client',
      text: 'It was more than a wonderful experience — I ordered a bedroom from them. The quality of the wood, the cleanliness of the work, and the speed were excellent, and their prices are very competitive, below market rate. Their service was wonderful — may God grant them success.',
    },
    {
      id: 'testimonial-3',
      name: 'Hala jaber',
      verified: true,
      badgeLabel: 'Verified Client',
      text: 'From the very first visit, they understood what I wanted before I even said it — it felt like they’d read my mind. They didn’t need me to explain much, because they already understood my vision from the smallest details. It was a remarkable experience, and the result turned out far more beautiful than I’d imagined.',
    },
    {
      id: 'testimonial-4',
      name: 'Elias Khoury',
      verified: true,
      badgeLabel: 'Verified Client',
      text: 'What we loved most is that they never tried to sell us a ready-made design — instead, they understood our taste and turned our ideas into reality. The craftsmanship, precision, and attention to the smallest details made every corner tell a story.',
    },
    {
      id: 'testimonial-5',
      name: 'Mira Abi Nader',
      verified: true,
      badgeLabel: 'Verified Client',
      text: 'Before working with Hneineh, I tried other carpenters, but I always felt a certain style was being imposed on me instead of anyone actually listening to what I wanted. With Hneineh it was completely different — they listened, understood our vision, and worked with us detail by detail to reach the result we’d been dreaming of. My home turned out far more beautiful than I imagined.',
    },
    {
      id: 'testimonial-6',
      name: 'Khaled Mansour',
      verified: true,
      badgeLabel: 'Verified Client',
      text: 'I assumed furniture at this level of luxury and design would come with a very high price tag, especially after past experiences paying large sums at galleries. But Hneineh amazed me — honestly, I didn’t expect to get this level of luxury and craftsmanship at such a fair price.',
    },
    {
      id: 'testimonial-7',
      name: 'Layal Chidiac',
      verified: true,
      badgeLabel: 'Verified Client',
      text: 'What stood out most in my experience with Hneineh was their professionalism and attention to every small detail. I felt like someone genuinely cared about making the home look its absolute best, not just completing an order. From the first idea to the final touch, there was trust and ease throughout — and the result exceeded all my expectations.',
    },
  ],
}
