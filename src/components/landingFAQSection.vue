<template>
  <section class="row bg-faded-blue content pb-0">
    <div>
      <h6 class="text-center mb-0">FAQs</h6>
      <h2 class="sect-header w-lg-50">Let’s answer your questions</h2>
      <div class="accordion" id="faqAccordion">
        <div class="question" v-for="(faq, index) in faqs" :key="index" :class="( (index + 1) === faqs.length) ? 'mb-0' : ''">
          <h5 id="`question-header-${index}`"  data-bs-toggle="collapse" :data-bs-target="`#question-${index}`" aria-expanded="false" :aria-controls="`#question-${index}`">
            {{ faq.question }}
            <img
                src="@/assets/images/landing/plus-circle.svg"
                class="expand-icon"
                alt="Expand question icon"
            />
          </h5>
          <div :id="`question-${index}`" class="accordion-collapse collapse" :aria-labelledby="`#question-header-${index}`" data-bs-parent="#faqAccordion">
            <div class="accordion-body px-0">
              <strong>{{faq.answer}}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {reactive} from '@vue/composition-api'
export default {
  name: "LandingFAQSection",
  setup(){
    const data = reactive({
      faqs: [
        {
          question: 'What is Clorza about ?',
          answer: 'Working on this'
        },
        {
          question: 'How long till I recieve my money?',
          answer: 'Working on this'
        },
        {
          question: 'Can I send other currencies?',
          answer: 'Working on this'
        },
        {
          question: 'Which crypto currencies do you support?',
          answer: 'Working on this'
        },
        {
          question: 'How long till I recieve my money?',
          answer: 'Working on this'
        },
        {
          question: 'How long till I recieve my money?',
          answer: 'Working on this'
        },

      ]
    })

    return {...data}
  },
};
</script>
<style lang="scss" scoped>
@import 'src/assets/scss/core/mixins';
@import 'src/assets/scss/core/variables';

.content {
  padding-bottom: toRem(143px);
  @include screen('med') {
    padding-bottom: toRem(80px);
  }
}

.expand-icon{
  width: toRem(24px);
  height: toRem(24px);
}

.accordion{
  margin-bottom: toRem(206px);
}

.question {
  cursor: pointer;
  max-width: toRem(770px);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: toRem(48px);
  font-weight: 500;
  font-size: toRem(20px);
  line-height: toRem(32px);

  img{
    float: right;
  }
}

.sect-header{
  margin-top: toRem(4px);
  margin-bottom: toRem(64px);
  max-width: toRem(504px);
}

h2 {
  max-width: toRem(488px);
  @include screen('med') {
    font-size: toRem(24px);
    line-height: toRem(30px);
  }
}
</style>

