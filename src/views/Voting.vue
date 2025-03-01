<template>
  <div class="d-flex flex-column h-100">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="Background-tab" data-bs-toggle="tab" href="#Background" role="tab" aria-controls="Background" aria-selected="true">{{$t('Voting.tab1.tab') }}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="Simulator-tab" data-bs-toggle="tab" href="#Simulator" role="tab" aria-controls="Simulator" aria-selected="false">{{$t('Voting.tab2.tab') }}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="Guide-tab" data-bs-toggle="tab" href="#Guide" role="tab" aria-controls="Guide" aria-selected="false">{{$t('Voting.tab3.tab') }}</a>
      </li>
    </ul>
    <div class="tab-content flex-grow-1" id="myTabContent">
      <div class="tab-pane fade show active p-4" id="Background" role="tabpanel" aria-labelledby="Background-tab">
        <p style="font-size: 18px;white-space: pre-wrap;">{{$t('Voting.tab1.description') }} </p>
      </div>
      <div class="tab-pane fade p-4" id="Guide" role="tabpanel" aria-labelledby="Guide-tab">
        <p style="font-size: 18px;white-space: pre-wrap;">{{$t('Voting.tab3.description') }} </p>
      </div>
      
      <div class="tab-pane fade p-4" id="Simulator" role="tabpanel" aria-labelledby="Simulator-tab">
        <div class="row">
          <div class="col-8">
            <div id="chart">
              <canvas ref="chartCanvas"></canvas>
            </div>
          </div>
          <div class="col-4">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">参数设置</h5>
              </div>
              <div class="card-body" style="max-height: 70vh; overflow-y: auto;">
                <div v-for="(learnerClass, index) in learnerClasses" :key="index" class="mb-3">
                  <!-- 分隔线 -->
                  <div v-if="index > 0" class="border-top my-2"></div>
                  <!-- 学习器类别标题和删除按钮 -->
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="mb-0">class {{ index + 1 }}</h6>
                    <button @click="removeClass(index)" class="btn btn-sm p-0 border" style="width: 24px; height: 24px;">×</button>
                  </div>
                  <div class="row g-2">
                    <div class="col-6">
                      <label class="small">accuracy</label>
                      <input type="number" v-model="learnerClass.accuracy" class="form-control form-control-sm" min="0" max="1" step="0.01">
                    </div>
                    <div class="col-6">
                      <label class="small">amount</label>
                      <input type="number" v-model="learnerClass.count" class="form-control form-control-sm" min="1">
                    </div>
                    <div class="col-6">
                      <label class="small">conformity rate</label>
                      <input type="number" v-model="learnerClass.conformity" class="form-control form-control-sm" min="0" max="1" step="0.01">
                    </div>
                    <div class="col-6">
                      <label class="small">weight</label>
                      <input type="number" v-model="learnerClass.weight" class="form-control form-control-sm" min="0" step="0.1">
                    </div>
                  </div>
                </div>
                <!-- 添加类别按钮 -->
                <button @click="addClass" class="btn btn-primary btn-sm w-100">+ 添加类别</button>
                <!-- 模拟按钮 -->
                <button @click="simulate" class="btn btn-success btn-sm mt-2 w-100">模拟</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </div>  
</template>

<script>
import Chart from 'chart.js/auto';
import { setI18nLanguage } from '/src/lang/i18n';
import { useLanguageStore } from '@/store/language';
import { computed, onMounted  } from 'vue'; 

export default {
  name: 'VotingApp',
  setup() {
      const languageStore = useLanguageStore();
      const currentLanguage = computed(() => languageStore.locale);
      console.log(currentLanguage.value);

      // 使用 onMounted 钩子
      onMounted(() => {
        setI18nLanguage(currentLanguage.value, 'Voting'); 
      });
      
      return {
        currentLanguage
      };
    },
  data() {
    return {
      learnerClasses: [
        { accuracy: 0.7, count: 10, conformity: 0, weight: 1 }
      ],
      chart: null,
      results: {
        majorityVoteAccuracy: 0,
        individualAccuracies: []
      }
    };
  },
  methods: {
    addClass() {
      this.learnerClasses.push({ accuracy: 0.7, count: 10, conformity: 0, weight: 1 });
    },
    removeClass(index) {
      this.learnerClasses.splice(index, 1);
    },
    simulate() {
      const numSimulations = 1000; // 设置模拟次数
      const individualAccuracies = Array(this.learnerClasses.length).fill(0);
      let totalMajorityVoteAccuracy = 0;
      const numIndividualSimulations = Array(this.learnerClasses.length).fill(0);

      for (let sim = 0; sim < numSimulations; sim++) {
        let totalWeight = 0;
        let totalCorrect = 0;

        // 重新模拟直到 totalCorrect 不等于 totalWeight 的一半
        do {
          totalWeight = 0;
          totalCorrect = 0;

          this.learnerClasses.forEach((learnerClass, index) => {
            const { accuracy, count, conformity, weight } = learnerClass;
            const classResults = this.generateClassResults(count, accuracy, conformity);
            const classCorrect = classResults.filter(result => result === 1).length;
            totalWeight += weight * count;
            totalCorrect += weight * classCorrect;
            individualAccuracies[index] += classCorrect / count;
            numIndividualSimulations[index] += 1;
          });
          
        } while (totalCorrect === totalWeight / 2);
        
        const majorityVoteAccuracy = totalCorrect > totalWeight / 2 ? 1 : 0;
        totalMajorityVoteAccuracy += majorityVoteAccuracy;
      }

      // 计算平均值
      this.results.majorityVoteAccuracy = totalMajorityVoteAccuracy / numSimulations;
      this.results.individualAccuracies = individualAccuracies.map((acc, index) => acc / numIndividualSimulations[index] );

      this.renderChart();
    },

    generateClassResults(count, accuracy, conformity) {
      const results = [];
      const Z = Math.random(); // 用于生成第一个结果
      const firstResult = Z < accuracy ? 1 : 0; // 第一个结果根据正确率生成

      for (let i = 0; i < count; i++) {
        if (Math.random() < conformity) {
          results.push(firstResult); // 按照conformity比例保持第一个结果
        } else {
          const U = Math.random();
          results.push(U < accuracy ? 1 : 0); // 其他结果根据正确率生成
        }
      }
      return results;
    },

    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['多数投票', ...this.learnerClasses.map((_, index) => `类别 ${index + 1}`)],
          datasets: [{
            label: '正确率',
            data: [this.results.majorityVoteAccuracy, ...this.results.individualAccuracies],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', ...this.learnerClasses.map(() => 'rgba(153, 102, 255, 0.2)')],
            borderColor: ['rgba(75, 192, 192, 1)', ...this.learnerClasses.map(() => 'rgba(153, 102, 255, 1)')],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 1
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
#chart {
  width: 100%;
  height: 400px;
}
</style>