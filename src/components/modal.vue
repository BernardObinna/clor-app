<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    :aria-labelledby="modalTitleId"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      :class="{ md: modalSize === 'md' }"
    >
      <div class="modal-content" :class="{ rounded }">
        <div class="modal-header">
          <template v-if="!useCustomHeader">
            <h5 class="modal-title" :id="modalTitleId">{{ modalTitle }}</h5>
            <a
              href="javascript:"
              aria-label="Close modal"
              data-bs-dismiss="modal"
              class="close-img-tag"
              @click="$emit('closeModal')"
            >
              <img
                src="@/assets/images/icons/close-icon-black.svg"
                alt="Click to close modal"
              />
            </a>
          </template>
          <template v-else>
            <slot name="modalHeader"></slot>
          </template>
        </div>
        <div class="modal-body">
          <slot name="modalBody"></slot>
        </div>
        <div class="modal-footer">
          <slot name="modalFooter"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'modal',
  props: {
    modalId: {
      type: String,
      default: '#modalId'
    },
    modalTitleId: {
      type: String,
      default: '#title'
    },

    modalTitle: {
      type: String,
      default: 'Title'
    },

    modalSize: {
      type: String,
      default: 'md'
    },

    rounded: {
      type: Boolean,
      default: true
    },

    useModalClose: {
      type: Boolean,
      default: true
    },

    useCustomHeader: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/core/mixins';
@import '../assets/scss/core/variables';

.modal-dialog {
  &.md {
    max-width: toRem(378px);
    margin: 0 auto;
    .modal-header,
    .modal-body,
    .modal-footer {
      padding: 0 toRem(20px);
    }

    &.rounded {
      border-radius: toRem(16px) !important;
    }

    .modal-header {
      padding-top: toRem(20px);
    }
  }
}

.modal-header {
  border-bottom: none;

  .modal-title {
    font-family: 'Circular', sans-serif !important;
    font-style: normal;
    font-weight: normal;
    font-size: toRem(24px);
    line-height: toRem(32px);
    color: $color-dark-blue;
  }

  .close-img-tag {
    img {
      width: toRem(28px);
      height: toRem(28px);
    }
  }
}
.modal-footer {
  display: block;
  border-top: none;
}
</style>
