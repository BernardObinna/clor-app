<template>
  <section class="row bg-faded-blue content">
    <div>
      <h6 class="text-center mb-0">FAQs</h6>
      <h2 class="sect-header w-lg-50">Let’s answer your questions</h2>
      <div class="accordion" id="faqAccordion">
        <div
          class="question"
          v-for="(faq, index) in faqs"
          :key="index"
          :class="index + 1 === faqs.length ? 'mb-0' : ''"
        >
          <div
            class="d-flex"
            id="`question-header-${index}`"
            data-bs-toggle="collapse"
            :data-bs-target="`#question-${index}`"
            aria-expanded="false"
            :aria-controls="`#question-${index}`"
            @click="toggleFAQ(index)"
          >
            <h5>
              {{ faq.question }}
            </h5>
            <img
              src="@/assets/images/landing/plus-circle.svg"
              class="expand-icon"
              alt="Expand question icon"
              v-if="activeQuestionIndex !== index"
            />

            <img
              src="@/assets/images/landing/minus-circle.svg"
              class="expand-icon"
              alt="Expand question icon"
              v-if="activeQuestionIndex === index"
            />
          </div>

          <div
            :id="`question-${index}`"
            class="accordion-collapse collapse"
            :aria-labelledby="`#question-header-${index}`"
            data-bs-parent="#faqAccordion"
          >
            <div class="accordion-body p-0">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'

export default {
  name: 'LandingFAQSection',
  setup() {
    const data = reactive({
      faqs: [
        {
          question: 'What is Clorza about ?',
          answer:
            "We do all three. But you get to decide which works best for you. If you need food, we'll get you delicious meals everyday, once a week, or every two weeks. Dirty laundry? We'll pick them up and bring back your clothes, freshly washed folded/ironed. Does your home need cleaning? We'll get that done efficiently as well. You can even subscribe for more than one service, and we'll run it. Perfectly."
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
        }
      ],

      activeQuestionIndex: null
    })

    function toggleFAQ(index) {
      if (index === data.activeQuestionIndex) data.activeQuestionIndex = null
      else data.activeQuestionIndex = index
    }

    return { ...toRefs(data), toggleFAQ }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/assets/scss/core/mixins';
@import 'src/assets/scss/core/variables';

.content {
  padding-bottom: 0 !important;
  @include screen('med') {
    padding-top: toRem(64px);
  }
}

.expand-icon {
  width: toRem(24px);
  height: toRem(24px);
}

.accordion {
  margin-bottom: toRem(206px);
  @include screen('med') {
    margin-bottom: toRem(96px);
  }
}

.question {
  cursor: pointer;
  max-width: toRem(770px);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: toRem(48px);
  padding-bottom: toRem(16px);
  font-weight: 500;
  font-size: toRem(20px);
  line-height: toRem(32px);
  border-bottom: 1px solid rgba(228, 232, 230, 0.82);

  p {
    margin-top: toRem(8px);
    margin-bottom: 0;
  }

  img {
    margin-left: auto;
  }
}

.sect-header {
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

h6 {
  @include screen('med') {
    display: none;
  }
}
</style>
