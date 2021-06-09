<template>
  <section class="row content">
    <div class="col-lg-6">
      <h1>Send Money from USA to Nigeria with Card or Crypto</h1>
      <p>Send money from USA and receive it in your Nigerian bank account</p>
      <div class="d-flex">
        <img
            src="@/assets/images/landing/Flutterwave-Logo-1.svg"
            alt="Flutterwave Logo"
        />
        <img
            src="@/assets/images/landing/Thepeer-Logo-1.svg"
            alt="Thepeer Logo"
        />
      </div>
    </div>

    <div class="col-lg-6">
      <form action="">
        <img
            src="@/assets/images/landing/quarter-pie.svg"
            alt="Thepeer Logo"
        />
        <div>
          <div class="d-flex ">
            <div class="input-group">
              <div class="form-floating d-flex mt-5">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                <label for="floatingInput">Email address</label>
                <span class="input-group-text" id="inputGroup-sizing-default">USD</span>
              </div>
            </div>
          </div>

          <p class="my-5">1 USD = 465 NGN</p>

          <div class="d-flex">
            <div class="input-group mb-3">
              <div class="form-floating d-flex mt-5">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                <label for="floatingInput">Email address</label>
                <span class="input-group-text" id="inputGroup-sizing-default">USD</span>
              </div>
            </div>
          </div>

          <div>
            <button>Request Money</button>
            <button>Request Money</button>
          </div>
        </div>
        <img
            src="@/assets/images/landing/dot-group.svg"
            alt="Thepeer Logo"
        />
      </form>
    </div>
  </section>
</template>
<script>
export default {
  name: 'LandingSendMoneySection'
};
</script>
