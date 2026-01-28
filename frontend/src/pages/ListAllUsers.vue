<style scoped>
.main {
  margin-top: 0px;
}

.edit-button {
  margin-right: 2px;
}

.varify-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 11px rgba(0, 0, 0, 0.5);
  box-shadow: 0 -8px -11px rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px;
}

.profile-image {
  width: 20vw;
  height: 20vw;
  object-fit: cover;
}
@media (max-width: 1199px) {
  .profile-image {
    width: 30vw;
    height: 30vw;
    object-fit: cover;
  }
}

@media (max-width: 600px) {
  .profile-image {
    width: 40vw;
    height: 40vw;
    object-fit: cover;
  }
}

@media (max-width: 400px) {
  .profile-image {
    width: 60vw;
    height: 60vw;
    object-fit: cover;
  }
}
</style>

<template>
  <div v-auto-animate class="main">
    <div class="main2">
      <div class="container-xl px-4">
        <div v-auto-animate class="row" style="padding-top: 5rem">
          <div class="col-xl-4">
            <!-- Profile picture card-->
            <div v-auto-animate class="card mb-4 mb-xl-0">
              <div class="card-header">Profile Picture</div>
              <div v-auto-animate class="card-body text-center scroll">
                <!-- Profile picture image-->
                <img
                  v-if="profile"
                  class="img-account-profile profile-image rounded-circle mb-2"
                  :src="profile"
                  alt="Profile Picture"
                />
                <img
                  v-else
                  class="img-account-profile rounded-circle mb-2"
                  src="../assets/profile-circle.svg"
                  alt="Default Profile Picture"
                />

                <!-- Profile picture help block-->
                <div class="small font-italic text-muted mb-4">
                  <h5>{{ name }}</h5>
                </div>
                <!-- Profile picture upload button-->
              </div>
            </div>
          </div>
          <div class="col-xl-8">
            <!-- Account details card-->
            <div class="card mb-4 scroll">
              <div class="card-header">Account Details</div>
              <div class="card-body">
                <div v-auto-animate>
                  <!-- Form Group (username)-->
                  <div class="mb-3">
                    <label class="small mb-1" for="name">Name</label>
                    <input
                      :disabled="true"
                      class="form-control"
                      id="name"
                      type="text"
                      v-model="name"
                    />
                  </div>
                  <!-- Form Row        -->
                  <div class="row gx-3 mb3">
                    <div class="col-md-6">
                      <div class="mt-1">
                        <div v-auto-animate class="row">
                          <div class="col-2">
                            <label class="small mb-1" for="email">Email</label>
                          </div>

                          <div class="col-4"></div>
                        </div>
                        <input
                          :disabled="true"
                          class="form-control"
                          id="email"
                          type="text"
                          v-model="email"
                        />
                      </div>
                      <!-- Form Group (location)-->
                      <div class="mt-2">
                        <label class="small mb-1" for="mobile_no">Mobile Number</label>
                        <input
                          :disabled="true"
                          class="form-control"
                          id="mobile_no"
                          type="text"
                          v-model="mobile_no"
                        />
                      </div>
                    </div>

                    <!-- ///////////////////////////////// New colunn starts //////////////////////////////////// -->
                    <div class="col-md-6">
                      <div class="mt-2" v-if="whatsapp_status">
                        <label class="small mb-1" for="whatsapp_no">Whatsapp Number</label>
                        <input
                          :disabled="true"
                          class="form-control"
                          id="whatsapp_no"
                          type="text"
                          name="birthday"
                          v-model="whatsapp_no"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export default {
  name: 'view User',
  data() {
    return {
      id: '',
      name: 'xyz',
      mobile_no: '11111111',
      email: 'xyz@gmail.com',

      profile_url: '',

      token: '',
    };
  },

  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.scroll', {
      opacity: 0,
      y: 50,
      duration: 0.5,
      scrollTrigger: {
        trigger: '.scroll',
        delay: 0.5,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });
  },
};
</script>
