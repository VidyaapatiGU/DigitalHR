<style scoped>
::-webkit-scrollbar {
  width: 8px;
  background: #f4f6fa;
}
::-webkit-scrollbar-track {
  background: #e9ecef;
  border-radius: 8px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #4f8cff 0%, #0c1526 100%);
  border-radius: 8px;
}

.dashboard-header {
  font-size: 2rem;
  font-weight: 700;
  color: #22223b;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 8px rgba(79,140,255,0.08);
}

.dashboard-cards {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 2rem;
}
.dashboard-card {
  background: linear-gradient(135deg, #f4f6fa 0%, #e9ecef 100%);
  box-shadow: 0 4px 24px rgba(79,140,255,0.12);
  border-radius: 18px;
  min-width: 18rem;
  max-width: 18rem;
  min-height: 10rem;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  position: relative;
  transition: box-shadow 0.2s;
  overflow: visible;
  word-break: break-word;
}
.dashboard-card:hover {
  box-shadow: 0 8px 32px rgba(79,140,255,0.18);
}
.dashboard-card .card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #0c1526;
  margin-bottom: 0.5rem;
  max-width: 99%;
  text-align: center;
  word-break: break-word;
  white-space: normal;
}
.dashboard-card .card-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #4f8cff;
}
.dashboard-card .card-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #22223b;
  max-width: 99%;
  text-align: center;
  word-break: break-word;
  white-space: normal;
}
.dashboard-card .card-text {
  font-size: 0.95rem;
  color: #5e5e5e;
  max-width: 99%;
  text-align: center;
  word-break: break-word;
  white-space: normal;
  overflow-wrap: break-word;
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .dashboard-cards {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
  .dashboard-card {
    min-width: 100%;
    max-width: 100%;
    height: 8rem;
    padding: 1rem;
  }
}
</style>

<template>
  <div class="main source-400 pt-2 h-100">
    <div class="dashboard-header px-3">Dashboard</div>
    <div class="overflow-y-hidden pb-5 h-100">
      <div class="h-100 overflow-y-auto">
        <div class="container py-3">
          <div v-if="role == 'super_admin'" class="dashboard-cards">
            <div class="dashboard-card">
              <div class="card-icon">
                <i class="fas fa-building"></i>
              </div>
              <div class="card-title">Clients</div>
              <div class="card-value">{{ clients.length }}</div>
              <div class="card-text">Total Registered</div>
            </div>
            <div class="dashboard-card">
              <div class="card-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="card-title">Employees</div>
              <div class="card-value">{{ employees.length }}</div>
              <div class="card-text">Total Active</div>
            </div>
          </div>

          <div v-if="role == 'client'" class="dashboard-cards">
            <div class="dashboard-card">
              <div class="card-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="card-title">Employees</div>
              <div class="card-value">{{ employees.length }}</div>
              <div class="card-text">Your Workforce</div>
            </div>
          </div>

          <!--
          <div class="d-flex flex-column flex-md-row gap-1">
            <div
              class="left scroll border d-flex justify-content-center align-items-center rounded-4 px-4"
              id="bar_graph"
            >
              <BarGraph :propsChartData="graphData" />
            </div>
            <div
              class="right scroll border d-flex justify-content-center align-items-center pb-4 rounded-4"
              id="doughnut"
            >
              <DoughnutChart :propsChartData="pieData" />
            </div>
          </div>
          <div class="d-flex flex-column flex-md-row gap-1 mt-3">
            <div
              class="left scroll border d-flex justify-content-center align-items-center rounded-4 px-4"
              id="pie"
            >
              <PieChart :propsChartData="pieData" />
            </div>
            <div
              class="right scroll px-3 border d-flex justify-content-center align-items-center pb-4 rounded-4"
              id="line"
            >
              <LineChart :propsChartData="graphData" />
            </div>
          </div>
          -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axiosClient from '../axiosClient';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Font Awesome for icons
import '@fortawesome/fontawesome-free/css/all.min.css';

import BarGraph from '../components/BarGraph.vue';
import PieChart from '../components/PieChart.vue';
import DoughnutChart from '../components/DoughnutChart.vue';
import LineChart from '../components/LineChart.vue';
import 'chartjs-plugin-annotation';

export default {
  name: 'DashBoard',
  components: {
    PieChart,
    BarGraph,
    DoughnutChart,
    LineChart,
  },
  data() {
    return {
      user: {},
      role: '',
      employees: [],
      clients: [],
      graphData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ['rgba(255, 99, 132, 1)'],

            borderRadius: 5,
          },
          {
            label: 'Dataset 2',
            data: [5, 3, 12, 7, 19, 3],
            backgroundColor: ['rgba(0, 255, 64, 1)'],

            borderRadius: 5,
          },
          {
            label: 'Dataset 3',
            data: [7, 6, 10, 15, 14, 5],
            backgroundColor: ['rgba(100 , 0, 255, 1)'],

            borderRadius: 5,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      },
      pieData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(201, 203, 207, 1)',
            ],
            borderColor: 'white',
            borderWidth: 1,
          },
        ],
      },
    };
  },

  async created() {
    await this.getCurrent();

    if (this.role === 'super_admin') {
      try {
        const res = await axiosClient.get(`/api/v1/employee/getall`);

        this.employees = res.data.data;

        const clientRes = await axiosClient.get(`/api/v1/client/get/all/clients`);

        this.clients = clientRes.data.data;
      } catch (err) {
        console.log('error: ', err);
      }
    }

    if (this.role === 'client') {
      try {
        const res = await axiosClient.get(
          `/api/v1/employee/client/${this.user._id}`
        );

        this.employees = res.data.data;
      } catch (err) {
        console.log('error: ', err);
      }
    }
  },

  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.scroll', {
      opacity: 0.3,
      y: 50,
      duration: 1.2,
      scrollTrigger: {
        trigger: '#bar_graph, #doughnut, #pie, #line',
        delay: 0.2,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });
  },

  methods: {
    async getCurrent() {
      try {
        const token = await axiosClient.get(`api/v1/user/getCurrent/`);
        console.log('Token : ', token);
        this.user = token.data.user;
        if (token.data.user.industry_type) {
          this.role = 'client';
        } else if (token.data.user.designation) {
          this.role = 'employee';
        } else {
          this.role = this.user.roleType.name;
        }

        if (!token) {
          this.$router.push('/login');
        }
      } catch (err) {
        console.log('error: ', err);
        this.$router.push('/login');
      }
      return;
    },
  },
};
</script>
