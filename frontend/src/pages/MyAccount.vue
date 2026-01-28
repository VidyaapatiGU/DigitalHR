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
  <div class="main min-vh-100">
    <div class="main2">
      <div class="container-xl px-4">
        <div class="row" style="padding-top: 5rem">
          <div class="col-xl-4">
            <!-- Profile picture card-->
            <div class="card mb-4 mb-xl-0">
              <div class="card-header">Profile Picture</div>
              <div class="card-body text-center scroll">
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
                <div>
                  <!-- Form Group (username)-->
                  <div class="mb-3">
                    <label class="small mb-1" for="name">Notame</label>
                    <input
                      :disabled="true"
                      class="form-control"
                      id="name"
                      type="text"
                      v-model="user.name"
                    />
                  </div>
                  <!-- Form Row        -->
                  <div class="row gx-3 mb3">
                    <div class="col-md-6">
                      <div class="mt-1">
                        <div class="row">
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
                          v-model="user.email"
                        />
                      </div>
                      <!-- Form Group (location)-->
                      <div class="mt-2">
                        <label class="small mb-1" for="mobile_no">Team</label>
                        <input
                          :disabled="true"
                          class="form-control"
                          id="mobile_no"
                          type="text"
                          v-model="user.team.name"
                        />
                      </div>
                      <div class="mt-2">
                        <label class="small mb-1" for="mobile_no">Role</label>
                        <input
                          :disabled="true"
                          class="form-control capitalize"
                          id="mobile_no"
                          type="text"
                          v-model="user.roleType.name"
                        />
                      </div>
                    </div>

                    <!-- ///////////////////////////////// New colunn starts //////////////////////////////////// -->
                    <div class="col-md-6">
                      <div class="mt-2">
                        <label class="small mb-1" for="mobile_no">Whats App Number</label>
                        <input
                          :disabled="true"
                          class="form-control"
                          id="mobile_no"
                          type="text"
                          v-model="user.whatsapp_no"
                        />
                      </div>
                      <div class="mt-2">
                        <label class="small mb-1" for="mobile_no">Team</label>
                        <input
                          :disabled="true"
                          class="form-control capitalize"
                          id="mobile_no"
                          type="text"
                          v-model="user.department.name"
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

import axiosClient from '../axiosClient';
export default {
  name: 'MyAccount',
  data() {
    return {
      user: {},
      id: '',
      name: 'xyz',
      mobile_no: '11111111',
      email: 'xyz@gmail.com',

      profile_url: '',

      token: '',
    };
  },

  created() {
    this.getCurrent();
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

  methods: {
    async getCurrent() {
      try {
        const token = await axiosClient.get(`api/v1/user/getCurrent/`);
        if (!token) {
          this.$router.push('/login');
        }
        this.user = token.data.user;
      } catch (err) {
        console.log('error: ', err);
        this.$router.push('/login');
      }

      return;
    },
  },
};
</script>
