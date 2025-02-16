<template>
  <div class="d-flex flex-column h-100">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="Background-tab" data-bs-toggle="tab" href="#Background" role="tab" aria-controls="Background" aria-selected="true">{{$t('GamblersAndDrunkards.tab1.tab') }}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="Simulator-tab" data-bs-toggle="tab" href="#Simulator" role="tab" aria-controls="Simulator" aria-selected="false">{{$t('GamblersAndDrunkards.tab2.tab') }}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="Guide-tab" data-bs-toggle="tab" href="#Guide" role="tab" aria-controls="Guide" aria-selected="false">{{$t('GamblersAndDrunkards.tab3.tab') }}</a>
      </li>
    </ul>
    <div class="tab-content flex-grow-1" id="myTabContent">
      <div class="tab-pane fade show active p-4" id="Background" role="tabpanel" aria-labelledby="Background-tab">
        <p style="font-size: 18px;white-space: pre-wrap;">{{$t('GamblersAndDrunkards.tab1.description') }} </p>
      </div>
      <div class="tab-pane fade h-100" id="Simulator" role="tabpanel" aria-labelledby="Simulator-tab">

        <div class="d-flex h-100">
          <!-- 左侧画布 -->
          <div class="bg-light d-flex flex-column" style="width: 80%">
            <p class="mb-0 p-3">Steps: {{ steps }}&nbsp;&nbsp;&nbsp;&nbsp;Position: ({{ position.x }}, {{ position.y }})</p>
            <canvas id="walk-canvas" class="h-100" ></canvas>
          </div>

          <!-- 右侧边栏 -->
          <div class="p-3 bg-white shadow-sm d-flex flex-column gap-2" style="width: 20%; height: 100%; overflow: auto;">
            <label for="initial-x" class="fw-bold">Initial Position X:</label>
            <input 
              id="initial-x" 
              type="number" 
              v-model.number="initialX" 
              class="form-control"
            />

            <label for="initial-y" class="fw-bold">Initial Position Y:</label>
            <input 
              id="initial-y" 
              type="number" 
              v-model.number="initialY" 
              class="form-control"
              :disabled="is1D"
            />

            <label for="max-position" class="fw-bold">Max Position:</label>
            <input 
              id="max-position" 
              type="number" 
              v-model.number="maxPosition" 
              class="form-control"
            />

            <label for="interval" class="fw-bold">interval(ms):</label>
            <input 
              id="interval" 
              type="number" 
              v-model.number="interval" 
              class="form-control"
            />

            <div>
              <!-- 复选框 -->
              <label>
                <input type="checkbox" v-model="is1D">
                1d random walk
              </label>

            </div>


            <button 
              @click="startRandomWalk" 
              :disabled="isStartButtonDisabled" 
              class="btn btn-primary"
            >
              Start
            </button>
            <button 
              @click="pauseRandomWalk" 
              :disabled="isPauseButtonDisabled" 
              class="btn btn-primary"
            >
              Pause
            </button>
          </div>
        </div>
      </div>
      <div class="tab-pane fade p-4" id="Guide" role="tabpanel" aria-labelledby="Guide-tab">
        <p style="font-size: 18px;white-space: pre-wrap;">{{$t('GamblersAndDrunkards.tab3.description') }} </p>
      </div>
    
  </div>
</div>
</template>

<script>
import { setI18nLanguage } from '/src/lang/i18n';
import { useLanguageStore } from '@/store/language';
import { computed, onMounted  } from 'vue'; 


export default {
  name: 'RandomWalk',
  data() {
    return {
      canvas: null,
      ctx: null,
      initialX: 0, // 用户输入的初始位置
      initialY: 0, // 用户输入的初始位置
      position: {x:0, y:0}, // 当前点的位置
      maxPosition: 100, // 数轴的最大范围
      ProbabilityToLeft: 0.5, // 向左移动的概率
      interval: 10, // 定时器间隔
      is1D: false,
      stepSize: 1, // 每一步的大小
      steps: 0, // 步数计数器
      intervalId: null, // 用于存储定时器ID
      isStartButtonDisabled: false,
      isPauseButtonDisabled: true
    };
  },

  setup() {
    const languageStore = useLanguageStore();
    const currentLanguage = computed(() => languageStore.locale);
    console.log(currentLanguage.value);

    // 使用 onMounted 钩子
    onMounted(() => {
      setI18nLanguage(currentLanguage.value, 'GamblersAndDrunkards'); 
    });
    
    return {
      currentLanguage
    };
  },
  
  mounted() {
    this.initCanvas();
    const canvasTab = document.getElementById('Simulator-tab');
    canvasTab.addEventListener('shown.bs.tab', () => {
      this.resizeCanvas();
      this.init();
    });
    
  },



  methods: {
    initCanvas() {
      this.canvas = document.getElementById('walk-canvas');
      this.ctx = this.canvas.getContext('2d');
    },

    switchToCanvasTab() {
      this.activeTab = 'Simulator';
      this.$nextTick(() => {
        this.resizeCanvas();
      });
    },
    resizeCanvas() {
      const parent = this.canvas.parentElement; // 获取父容器
      this.canvas.width = parent.clientWidth; // 设置 canvas 宽度为父容器的宽度
      this.canvas.height = parent.clientHeight - 56; // 设置 canvas 高度为父容器的高度
      console.log('resize', this.canvas.height, this.canvas.width );
    },

    drawAxis() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      console.log('draw', this.canvas.height, this.canvas.width );
      const midX = this.canvas.width / 2;
      const midY = this.canvas.height / 2;

      this.ctx.beginPath();
      this.ctx.moveTo(0, midY);
      this.ctx.lineTo(this.canvas.width, midY);
      console.log(midY );
      this.ctx.strokeStyle = '#333';
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(midX, 0);
      this.ctx.lineTo(midX, this.canvas.height);
      this.ctx.strokeStyle = '#333';
      this.ctx.stroke();

      // 绘制刻度
      const numTicks = this.maxPosition + 1; // 从 0 到 maxPosition
      const tickSpacing = this.canvas.width / numTicks;
      for (let i = -this.maxPosition; i <= this.maxPosition; i += Math.floor(this.maxPosition / 20)) {
        const x = midX + i * tickSpacing;
        this.ctx.beginPath();
        this.ctx.moveTo(x, midY - 5);
        this.ctx.lineTo(x, midY );
        this.ctx.stroke();
        const y = midY - i * tickSpacing;
        this.ctx.beginPath();
        this.ctx.moveTo(midX , y);
        this.ctx.lineTo(midX + 5, y);
        this.ctx.stroke();

        // 绘制刻度标签
        const label = i;
        this.ctx.font = '15px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(label, x, midY + 20);
        this.ctx.font = '15px Arial';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(label, midX - 10, y + 5);
      }


    },

    drawParticle() {
      const midY = this.canvas.height / 2;
      const midX = this.canvas.width / 2;
      const numTicks = this.maxPosition + 1; // 从 0 到 maxPosition
      const tickSpacing = this.canvas.width / numTicks;
      const x = this.position.x * tickSpacing + midX;
      const y = -this.position.y * tickSpacing + midY;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
      this.ctx.fillStyle = 'blue';
      this.ctx.fill();
    },

    randomWalk() {
      console.log('randomWalk called');
      if (this.position.x == 0 && this.position.y == 0) {
        if (this.steps > 0){
          clearInterval(this.intervalId);
          this.isStartButtonDisabled = false;
          this.isPauseButtonDisabled = true;
          console.log('randomWalk stopped');
          return; 
        }
        
      }

      // 随机选择向左或向右移动
      let directions;
      if (this.is1D) {
        directions = [
          { x: -1, y: 0 }, // 左
          { x: 1, y: 0 },  // 右
        ];
      }
      else {
        directions = [
          { x: -1, y: 0 }, // 左
          { x: 1, y: 0 },  // 右
          { x: 0, y: -1 }, // 上
          { x: 0, y: 1 }   // 下
        ];
      }
      const direction = directions[Math.floor(Math.random() * directions.length)];
      this.position.x += direction.x * this.stepSize;
      this.position.y += direction.y * this.stepSize;
      this.steps++;

      // 绘制数轴和粒子
      this.drawAxis();
      this.drawParticle();
      console.log(`Moved ${direction === -1 ? 'left' : 'right'}, new position: ${this.position}, steps: ${this.steps}`);
    },

    init() {
      console.log('Initializing...');

      this.ProbabilityToLeft = parseFloat(this.ProbabilityToLeft); // 重置向左移动的概率
      this.steps = 0; // 重置步数计数器
      this.position.x = parseInt(this.initialX, 10); // 重置位置为用户输入的初始值
      this.position.y = parseInt(this.initialY, 10); // 重置位置为用户输入的初始值
      if (this.is1D) {
        this.position.y = 0;
      }
      this.maxPosition = parseInt(this.maxPosition, 10); // 重置数轴最大范围
      this.drawAxis();
      this.drawParticle();
      clearInterval(this.intervalId); // 确保没有残留的定时器
      this.isStartButtonDisabled = false;
      this.isPauseButtonDisabled = true;
    },

    startRandomWalk() {
      console.log('Starting random walk...');
      this.init(); // 重置状态
      this.intervalId = setInterval(() => this.randomWalk(), this.interval); 
      this.isStartButtonDisabled = true;
      this.isPauseButtonDisabled = false;
    },

    pauseRandomWalk() {
      console.log('Pausing random walk...');
      clearInterval(this.intervalId);
      this.isStartButtonDisabled = false;
      this.isPauseButtonDisabled = true;
    }
  },
};
</script>

<style scoped>

</style>