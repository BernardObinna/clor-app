<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    :aria-labelledby="modalTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <template v-if="!useCustomHeader">
            <h5 class="modal-title" :id="modalTitleId">{{ modalTitle }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
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
.modal-header {
  border-bottom: none;
}
.modal-footer {
  display: block;
  border-top: none;
}
</style>
