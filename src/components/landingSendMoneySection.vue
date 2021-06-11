<template>
  <section class="row content" id="landing-send-money-section">
    <div class="col-12 col-lg-6">
      <div class="text-block">
        <h1>Send Money from <span class="gradient-text usa-text">USA</span> to Nigeria with Card or Crypto</h1>
        <p>Send money from USA and receive it in your Nigerian bank account</p>
      </div>
    </div>

    <div class="col-12 col-lg-6">
      <div class="form-container ms-lg-auto me-lg-5">
        <img
            src="@/assets/images/landing/quarter-pie.svg"
            alt="Fancy image"
            class="pie-img"
        />
          <form class="form-block">
            <div class="d-flex ">
              <div class="input-group input-group-lg">
                <div class="form-floating send-input">
                  <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                  <label for="floatingInput">You send</label>
                  <span class="input-group-text" id="inputGroup-sizing-default"> <img class="me-1" src="@/assets/images/landing/us-flag.svg" alt="U.S flag"> USD</span>
                </div>
              </div>
            </div>

            <p class="text-center">1 USD = 465 NGN</p>

            <div class="d-flex">
              <div class="input-group input-group-lg">
                <div class="form-floating receive-input">
                  <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                  <label for="floatingInput">Recipient gets</label>
                  <span class="input-group-text" id="inputGroup-sizing-default"> <img class="me-1" src="@/assets/images/landing/ng-flag.svg" alt="Nigerian flag"> NGN</span>
                </div>
              </div>
            </div>

            <div class="button-container">
              <button class="btn btn-primary-white w-m-100">Request Money</button>
              <button class="btn btn-primary-blue w-m-100">Send Money</button>
            </div>
          </form>
        <img
            src="@/assets/images/landing/dot-group.svg"
            alt="Fancy image"
            class="dot-group-img"
        />
    </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'LandingSendMoneySection'
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/core/mixins';
@import 'src/assets/scss/core/variables';

.content {
  padding-bottom: toRem(203px);
  @include screen('med') {
    padding-bottom: toRem(80px);
  }
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

.text-block {
  max-width: toRem(480px);

  h1{
  @include screen('med') {
    font-size: toRem(32px);
    line-height: toRem(48px);
    text-align: center;
  }
  }

  .usa-text {
    background-color: #f3ec78;
    background-image: linear-gradient(45deg, #68FFA4, #FF6AE7);
    margin-top: toRem(16px);
  }

  p {
    font-size: toRem(24px);
    line-height: toRem(40px);
    @include screen('med') {
      font-size: toRem(16px);
      line-height: toRem(24px);
      text-align: center;
    }
  }
}

.form-container{
  position: relative;
  max-width: toRem(479px);

  @include screen('med') {
  max-width: toRem(327px);
    margin-top: toRem(40px);
    margin-right: auto;
    margin-left: auto;
  }


.pie-img {
  z-index: 1;

  position: absolute;
  top: -4rem;
  left: -4rem;
  max-width: toRem(160px);
  max-height: toRem(160px);

  @include screen('med') {
    max-width: toRem(120px);
    max-height: toRem(120px);
    top: -3rem;
    left: -3rem;
  }
}

.dot-group-img {
  z-index: 1;
  position: absolute;
  bottom: -7rem;
  right: -3.8rem;
  max-width: toRem(176px);
  max-height: toRem(176px);

  @include screen('med') {
    bottom: -1.47rem;
    right: -0.8rem;
    max-width: toRem(120px);
    max-height: toRem(120px);
  }
}

.form-block {
  position: relative;
  padding: toRem(30px) toRem(20px) toRem(40px);
  border: 1px solid rgba(12, 17, 66, 0.08);
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.08);
  border-radius: 16px;
    background: white;
  z-index: 10;

  @include screen('med') {
    padding: toRem(24px) toRem(24px) toRem(32px);
  }

  .form-floating {
    display: flex;
    width: 100%;
  }

  .receive-input {
    margin-bottom: toRem(40px);
  }


  p {
    margin: toRem(64px) 0;
    @include screen('med') {
      margin: toRem(40px) 0;
    }
  }

  input{
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    font-weight: 500;
    //font-size: toRem(24px);
    //line-height: toRem(30px);
  }

  span.input-group-text {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    background: white;
    min-width: 23%;
    @include screen('med') {
      font-size: toRem(14px);
      line-height: toRem(18px);
      min-width: 30%;
padding: 6px;
    }
  }
}

.button-container {
  @include screen('x-large') {
    display: flex;
    justify-content: space-between;
  }
  button {
    //  mobile
    @include screen('med') {
      margin-top: toRem(16px);
    }

    //  desktop
    @include screen('x-large') {
      width: 48%;
    }
  }
}
}
</style>