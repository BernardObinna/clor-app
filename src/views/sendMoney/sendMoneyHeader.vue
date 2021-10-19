<template>
  <div class="header">
    <a
      href="/"
      aria-label="Go back to the home page"
      class="brand-logo mx-lg-0"
    >
      <img src="@/assets/images/icons/clorza-logo.svg" alt="Click to go back" />
    </a>
    <h3 class="heading d-none d-lg-block">Send money</h3>

    <template v-if="user">
      <div class="dropdown">
        <div
          class="dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div class="avatar-initials">
            <h4 class="mb-0">{{ getInitials(user.name) }}</h4>
          </div>
          <div class="avatar-details">
            <p class="mb-0">{{ user.name }}</p>
            <span>{{ user.email }}</span>
          </div>
        </div>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="javascript:">Profile</a></li>
          <li>
            <a
              class="dropdown-item"
              :class="{ disabled: loading }"
              href="javascript:"
              @click="logout"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <a href="/" aria-label="Go back to the home page" class="close-img-tag">
        <img
          src="@/assets/images/icons/close-icon-black.svg"
          alt="Click to go back"
        />
      </a>
    </template>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from '@vue/composition-api'
import UtilsService from '../../utils/UtilsService'

export default {
  name: 'SendMoneyHeader',

  setup(props, { root }) {
    const store = root.$store
    const data = reactive({
      loading: false
    })

    //computed
    const user = computed(() => {
      return store.getters['auth/getUserX']
    })

    //methods
    function getInitials(name) {
      return UtilsService.getInitialsFromName(name)
    }

    const logout = async () => {
      if (data.loading) return
      data.loading = true
      await store.dispatch('auth/logout')
      data.loading = false
    }

    return {
      ...toRefs(data),
      user,
      getInitials,
      logout
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/core/mixins';
@import '../../assets/scss/core/variables';

.header {
  display: flex;
  background: white;
  justify-content: space-between;
  align-items: center;
  padding: toRem(20px) toRem(128px);
  @include screen('med') {
    padding: toRem(20px) toRem(32px);
  }
}

.close-img-tag {
  img {
    width: toRem(40px);
    height: toRem(40px);
  }
}

.brand-logo {
  width: toRem(90px);
  height: toRem(40px);
  img {
    width: 100%;
  }
}

.heading {
  text-align: center;
  font-weight: 500;
  font-size: toRem(20px);
  font-family: 'Recoleta' !important;
  color: $color-dark-blue;
  margin: 0;
}

.dropdown {
  font-family: 'Circular', sans-serif !important;

  .dropdown-toggle {
    display: flex;
    &:after {
      align-self: center;
      margin-left: toRem(9px);
      border-top-color: $color-grey;
    }
    .avatar-initials {
      display: flex;
      align-items: center;
      border: 1px solid $color-primary;
      border-radius: 50%;
      background: #dbdbfb;
      padding: toRem(14px) toRem(10px);
      margin-right: toRem(8px);
      font-family: inherit !important;

      h4 {
        font-size: toRem(20px);
        line-height: toRem(20px);
        color: $color-primary;
        font-family: inherit !important;
      }
    }

    .avatar-details {
      p {
        font-size: toRem(16px);
        line-height: toRem(24px);
        color: $color-dark-blue;
      }
      span {
        font-size: toRem(14px);
        line-height: toRem(20px);
        color: $color-dark-blue;
      }
    }
  }
  .dropdown-menu {
    margin-top: 0.4rem !important;
  }
}
</style>
