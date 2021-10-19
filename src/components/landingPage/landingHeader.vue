<template>
  <nav class="navbar navbar-light content">
    <div class="container-fluid px-xl-0">
      <router-link to="#" class="navbar-brand">
        <img
          type="button"
          src="@/assets/images/icons/clorza-logo.svg"
          alt="Brand logo"
        />
      </router-link>
      <img
        type="button"
        id="nav-toggle"
        class="d-lg-none"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
        src="@/assets/images/icons/nav-toggle.svg"
        alt=""
      />
      <div class="collapse navbar-collapse d-lg-none" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="#landing-how-it-works-section"
            >How it works</router-link
          >
          <router-link class="nav-link" to="#landing-vendor-section"
            >vendor payment</router-link
          >
          <a class="nav-link" href="javascript:" @click="openLoginModal"
            >Login</a
          >
          <a class="nav-link" href="javascript:" @click="openSignUpModal"
            >Sign up</a
          >
        </div>
      </div>

      <div class="nav-links d-none d-lg-flex">
        <router-link class="nav-link" to="#landing-how-it-works-section"
          >How it works</router-link
        >
        <router-link class="nav-link" to="#landing-vendor-section"
          >Vendor payment</router-link
        >

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
          <button
            class="nav-link btn btn-dark-blue-outline"
            @click="openLoginModal"
          >
            Login
          </button>
          <button class="nav-link btn btn-dark-blue" @click="openSignUpModal">
            Sign up
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>
<script>
import { computed, reactive, toRefs } from '@vue/composition-api'
import UtilsService from '../../utils/UtilsService'

export default {
  name: 'LandingHeader',
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
    function openLoginModal() {
      store.dispatch('general/openModal', {
        id: 'loginModal'
      })
    }

    function openSignUpModal() {
      store.dispatch('general/openModal', {
        id: 'signUpModal'
      })
    }

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
      openLoginModal,
      openSignUpModal,
      getInitials,
      logout
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/core/mixins';
@import '../../assets/scss/core/variables';

#nav-toggle {
  max-width: toRem(32px);
  max-height: toRem(32px);
}

.content {
  padding-top: toRem(16px);
  padding-bottom: toRem(16px);
}

.navbar {
  @include screen('x-large') {
    border: 1px solid rgba(131, 133, 158, 0.16);
    box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.08);
  }
}

.navbar-brand {
  font-style: normal;
  font-weight: 500;
  font-size: toRem(32px);
  line-height: toRem(40px);
  color: $color-primary;
  @include screen('med') {
    font-size: toRem(24px);
    line-height: toRem(30px);
  }
}

.nav-links {
  display: flex;
  align-items: center;

  .nav-link {
    font-size: toRem(16px);
    line-height: toRem(20px);
    color: $color-dark-blue;
    margin-right: toRem(40px);
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
}

.navbar-toggler {
  border: 1px solid $color-primary;
  border-radius: 60px;
}

.numbered-heading {
  background: white;
  border-radius: 50%;
  color: $color-primary;
  width: toRem(56px);
  padding: toRem(13px) toRem(24px) toRem(13px) toRem(21px);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: toRem(16px);
}

.card-img {
  max-width: toRem(276px);
  max-height: toRem(280px);
  border-radius: 16px;
  margin-top: toRem(32px);
  margin-left: auto;
  margin-right: auto;

  @include screen('med') {
    margin-bottom: toRem(48px);
  }
}

.sub-heading {
  margin-bottom: toRem(8px);
  @include screen('med') {
    font-size: toRem(20px);
    line-height: toRem(32px);
  }
}

h2 {
  max-width: toRem(488px);
  @include screen('med') {
    font-size: toRem(24px);
    line-height: toRem(30px);
  }
}

.card-block {
  p {
    margin-left: auto;
    margin-right: auto;
    max-width: toRem(276px);
  }
}
</style>
